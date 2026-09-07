/**
 * Clock-based animation and transition driver for the Roblox UI host.
 *
 * Drives @keyframes animations and CSS transitions using a Clock abstraction
 * (no wall clock inside the module). The driver is started by the host's
 * commit phase and advanced by calling tick() each frame (in Roblox this is
 * RunService.Heartbeat; in tests the fake clock advances manually).
 */

import type {
	AnimationSpec,
	AnimationSample,
	Engine,
	KeyframeSet,
	TransitionSpec,
} from "./engine-types";
import type { HostEnv, HostNode } from "./roblox-host";
import { applyStyle, parseColor, parseLength, computePlacement } from "./roblox-host";

/**
 * Keys of a record via the Luau builtin pairs(): the host must not depend on
 * the JS `Object` global, which the native test runner does not expose to
 * every module.
 */
function keysOf(rec: Record<string, unknown>): Array<string> {
	const out: Array<string> = [];
	for (const [k] of pairs(rec)) {
		out.push(k as string);
	}
	return out;
}

// Module-local helper: Lest's VM never gets the spike helper globals,
// so string ops route through plain Luau builtins.
function charAt(s: string, i: number): string {
	return string.sub(s, i + 1, i + 1);
}

// ------------------------------------------------------------------ Clock

/**
 * A clock that returns the current time in seconds.
 * The real implementation wraps os.clock(); tests inject a fake.
 */
export interface Clock {
	now: () => number;
}

/** The real clock implementation for the Roblox runtime. */
export function makeRealClock(): Clock {
	const nowFn = (): number => {
		return os.clock();
	};
	return { now: nowFn };
}

/**
 * A fake clock for tests: the caller advances it by calling advance(delta).
 */
export function makeFakeClock(start: number): Clock & { advance: (delta: number) => void; value: () => number } {
	let t = start;
	const nowFn = (): number => t;
	const advanceFn = (delta: number): void => { t += delta; };
	const valueFn = (): number => t;
	return { now: nowFn, advance: advanceFn, value: valueFn };
}

// ------------------------------------------------------------------ Animation state

/**
 * A running keyframe animation on a specific node.
 */
export interface RunningAnimation {
	/** The node being animated. */
	node: HostNode;
	/** The animation spec (parsed from the style). */
	spec: AnimationSpec;
	/** The keyframe set to interpolate against. */
	keyframes: KeyframeSet;
	/** The node's computed style before the animation began (restored for fill-mode none). */
	base: Record<string, string>;
	/** The time (seconds) when the animation started. */
	startTime: number;
	/** The engine, for evaluateAnimation. */
	engine: Engine;
	/** The env, for applyStyle. */
	env: HostEnv;
}

/**
 * A running CSS transition on a specific node.
 */
export interface RunningTransition {
	/** The node being transitioned. */
	node: HostNode;
	/** The property being transitioned. */
	property: string;
	/** The from-value (canonical string). */
	from: string;
	/** The to-value (canonical string). */
	to: string;
	/** The transition spec. */
	spec: TransitionSpec;
	/** The time (seconds) when the transition started. */
	startTime: number;
	/** The engine, for sampleTiming. */
	engine: Engine;
	/** The env, for applyStyle. */
	env: HostEnv;
}

/**
 * The animation driver state. One driver per mounted root.
 */
export interface AnimationDriver {
	/** All running keyframe animations. */
	animations: Array<RunningAnimation>;
	/** All running CSS transitions. */
	transitions: Array<RunningTransition>;
	/** The clock. */
	clock: Clock;
	/** The engine. */
	engine: Engine;
	/** The env. */
	env: HostEnv;
}

// ------------------------------------------------------------------ Driver

/**
 * Create a new animation driver.
 */
export function createDriver(clock: Clock, engine: Engine, env: HostEnv): AnimationDriver {
	return {
		animations: [],
		transitions: [],
		clock,
		engine,
		env,
	};
}

/**
 * Start a keyframe animation on a node.
 * Called from the commit phase when a node's computed style includes
 * an "anim:" entry.
 */
export function startAnimation(
	driver: AnimationDriver,
	node: HostNode,
	spec: AnimationSpec,
	keyframes: KeyframeSet
): void {
	// Remove any existing animation on this node with the same name
	let existing = -1; for (let ii = 0; ii < driver.animations.size(); ii++) { if (driver.animations[ii].node === node && driver.animations[ii].spec.name === spec.name) { existing = ii; break; } }
	if (existing >= 0) {
		driver.animations.remove(existing);
	}
	const base: Record<string, string> = {};
	const baseKeys = keysOf(node.computed);
	for (let ki = 0; ki < baseKeys.size(); ki++) {
		base[baseKeys[ki]] = node.computed[baseKeys[ki]];
	}
	driver.animations.push({
		node,
		spec,
		keyframes,
		base,
		startTime: driver.clock.now(),
		engine: driver.engine,
		env: driver.env,
	});
	// Mark the properties this animation owns so a re-render's applyStyle
	// leaves them to the driver (see applyStyle's animated-prop guard).
	const ap: Record<string, boolean> = (node.styleState["animatedProps"] as Record<string, boolean>) ?? {};
	for (let fi = 0; fi < keyframes.frames.size(); fi++) {
		const ks = keysOf(keyframes.frames[fi].styles);
		for (let ki = 0; ki < ks.size(); ki++) {
			ap[ks[ki]] = true;
		}
	}
	node.styleState["animatedProps"] = ap;
}

/**
 * Start a CSS transition on a node for a specific property.
 * Called from the commit phase when a property value changes and the
 * style declares a transition for that property.
 */
export function startTransition(
	driver: AnimationDriver,
	node: HostNode,
	property: string,
	from: string,
	to: string,
	spec: TransitionSpec
): void {
	// Remove any existing transition on this node+property
	let existing = -1; for (let ii = 0; ii < driver.transitions.size(); ii++) { if (driver.transitions[ii].node === node && driver.transitions[ii].property === property) { existing = ii; break; } }
	if (existing >= 0) {
		driver.transitions.remove(existing);
	}
	driver.transitions.push({
		node,
		property,
		from,
		to,
		spec,
		startTime: driver.clock.now(),
		engine: driver.engine,
		env: driver.env,
	});
}

/**
 * Advance all running animations and transitions to the current clock time.
 * Call this once per frame (RunService.Heartbeat in Roblox, manually in tests).
 */
export function tick(driver: AnimationDriver): void {
	const now = driver.clock.now();

	// --- Keyframe animations ---
	for (let i = driver.animations.size() - 1; i >= 0; i--) {
		const anim = driver.animations[i];
		const elapsed = now - anim.startTime;
		const { spec, keyframes } = anim;

		// Check if finished (non-infinite)
		const totalDuration =
			spec.iterationCount === "infinite"
				? math.huge
				: spec.delay + spec.duration * (spec.iterationCount as number);

		if (elapsed >= totalDuration && spec.iterationCount !== "infinite") {
			// Animation finished: release the lock so the base/final write lands.
			anim.node.styleState["animatedProps"] = undefined;
			if (spec.fillMode === "forwards" || spec.fillMode === "both") {
				// Hold the final frame.
				const sample = driver.engine.evaluateAnimation(spec, keyframes, totalDuration);
				applyAnimatedValues(anim.node, sample.styles, driver.env);
			} else {
				// fill-mode none: the element returns to its base style.
				applyBaseStyle(anim.node, anim.base, driver.env);
			}
			// Remove from running list
			driver.animations.remove(i);
			continue;
		}

		// Evaluate at current time
		const sample = driver.engine.evaluateAnimation(spec, keyframes, elapsed);

		// Apply the interpolated values
		applyAnimatedValues(anim.node, sample.styles, driver.env);
	}

	// --- CSS transitions ---
	for (let i = driver.transitions.size() - 1; i >= 0; i--) {
		const trans = driver.transitions[i];
		const elapsed = now - trans.startTime;
		const { spec } = trans;

		// Account for delay
		const effectiveElapsed = elapsed - spec.delay;

		if (effectiveElapsed < 0) {
			// Still in delay; apply from-value
			applyTransitionValue(trans.node, trans.property, trans.from, driver.env);
			continue;
		}

		if (effectiveElapsed >= spec.duration) {
			// Transition finished: apply to-value
			applyTransitionValue(trans.node, trans.property, trans.to, driver.env);
			driver.transitions.remove(i);
			continue;
		}

		// In progress: interpolate
		const progress = effectiveElapsed / spec.duration;
		const timedProgress = driver.engine.sampleTiming(spec.timingFunction, progress);
		const value = interpolateString(trans.from, trans.to, timedProgress);
		applyTransitionValue(trans.node, trans.property, value, driver.env);
	}
}

// ------------------------------------------------------------------ Apply helpers

/**
 * Apply a set of interpolated style values to a node.
 * The values are canonical CSS strings; we merge them into the node's
 * computed style and re-run applyStyle.
 */
function applyAnimatedValues(
	node: HostNode,
	values: Record<string, string>,
	env: HostEnv
): void {
	// Merge into computed style
	const entries = keysOf(values);
	for (let ki = 0; ki < entries.size(); ki++) {
		const key = entries[ki];
		node.computed[key] = values[key];
	}
	// Re-apply the full style with the guard lifted: the driver is the writer
	// of the animated properties, so applyStyle must not skip them here.
	const saved = node.styleState["animatedProps"];
	node.styleState["animatedProps"] = undefined;
	applyStyle(node, node.computed, env);
	node.styleState["animatedProps"] = saved;
}

/** Restore a node to the style it had before an animation started. */
function applyBaseStyle(node: HostNode, base: Record<string, string>, env: HostEnv): void {
	const restored: Record<string, string> = {};
	const keys = keysOf(base);
	for (let ki = 0; ki < keys.size(); ki++) {
		restored[keys[ki]] = base[keys[ki]];
	}
	applyStyle(node, restored, env);
}

/**
 * Apply a single transitioned property value to a node.
 */
function applyTransitionValue(
	node: HostNode,
	property: string,
	value: string,
	env: HostEnv
): void {
	// Merge into computed style
	node.computed[property] = value;
	// Re-apply the full style
	applyStyle(node, node.computed, env);
}

/**
 * Interpolate between two canonical CSS strings at a given progress (0..1).
 * Handles numeric values (with optional unit suffix) and snaps non-numeric
 * values to the closer end.
 */
export function interpolateString(from: string, to: string, t: number): string {
	// Try to parse as numbers (possibly with a unit suffix)
	const fromNum = parseFloat(from);
	const toNum = parseFloat(to);
	if (!isNaN(fromNum) && !isNaN(toNum)) {
		const interp = fromNum + (toNum - fromNum) * t;
		// Preserve the unit suffix from `from`
		const suffix = extractSuffix(from);
		return String(interp) + suffix;
	}
	// Non-numeric: snap to closer value
	return t < 0.5 ? from : to;
}

function extractSuffix(s: string): string {
	// Find the first non-numeric character (after optional leading - or +)
	let i = 0;
	if (i < s.size() && (charAt(s, i) === "-" || charAt(s, i) === "+")) {
		i = 1;
	}
	while (i < s.size()) {
		const c = charAt(s, i);
		if ((c >= "0" && c <= "9") || c === ".") {
			i++;
		} else {
			break;
		}
	}
	return string.sub(s, i + 1);
}
