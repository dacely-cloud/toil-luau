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
import { interpolateValue } from "../css/engine";

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
	pausedAt?: number;
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
		pausedAt: spec.playState === "paused" ? driver.clock.now() : undefined,
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
		if (anim.node.inst === undefined) { driver.animations.remove(i); continue; }
		const elapsed = (anim.pausedAt ?? now) - anim.startTime;
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
			// Remove from running list, then restore the lock for any animations
			// still running on this node (so their props stay driver-owned).
			driver.animations.remove(i);
			rebuildAnimatedProps(driver, anim.node);
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
		if (trans.node.inst === undefined) { driver.transitions.remove(i); continue; }
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
 * Rebuild a node's animated-prop lock from the animations still running on it.
 * Called when one animation finishes, so a node with several animations (e.g.
 * a card running both `mesh` and a one-shot `fade-in`) keeps the lock for the
 * survivors instead of dropping it entirely (which would let a re-render reset
 * the still-animating properties).
 */
function rebuildAnimatedProps(driver: AnimationDriver, node: HostNode): void {
	const ap: Record<string, boolean> = {};
	let any = false;
	for (let i = 0; i < driver.animations.size(); i++) {
		const a = driver.animations[i];
		if (a.node !== node) continue;
		for (let fi = 0; fi < a.keyframes.frames.size(); fi++) {
			const ks = keysOf(a.keyframes.frames[fi].styles);
			for (let ki = 0; ki < ks.size(); ki++) {
				ap[ks[ki]] = true;
				any = true;
			}
		}
	}
	node.styleState["animatedProps"] = any ? ap : undefined;
}

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
	return interpolateValue(from, to, t);
}

/** Keep animations and transitions synchronized with React commits, not just initial mount. */
export function syncAnimations(driver: AnimationDriver, node: HostNode, targetStyle: Record<string, string>): void {
	const previous = node.styleState["targetStyle"] as Record<string, string> | undefined;
	const declaration = targetStyle["animation"] ?? targetStyle["anim:"] ?? "";
	const oldDeclaration = previous !== undefined ? previous["animation"] ?? previous["anim:"] ?? "" : "";
	if (declaration !== oldDeclaration) {
		const specs = driver.engine.parseAnimation(declaration);
		for (let i = driver.animations.size() - 1; i >= 0; i--) {
			const running = driver.animations[i];
			if (running.node !== node) continue;
			let retained = false;
			for (let j = 0; j < specs.size(); j++) {
				const spec = specs[j];
				const old = running.spec;
				if (old.name === spec.name && old.duration === spec.duration && old.delay === spec.delay && old.iterationCount === spec.iterationCount && old.direction === spec.direction && old.fillMode === spec.fillMode && old.timingFunction === spec.timingFunction) {
					if (spec.playState === "paused" && running.pausedAt === undefined) running.pausedAt = driver.clock.now();
					if (spec.playState !== "paused" && running.pausedAt !== undefined) { running.startTime += driver.clock.now() - running.pausedAt; running.pausedAt = undefined; }
					running.spec = spec;
					retained = true;
					break;
				}
			}
			if (!retained) driver.animations.remove(i);
		}
		rebuildAnimatedProps(driver, node);
		for (let j = 0; j < specs.size(); j++) {
			const spec = specs[j];
			let exists = false;
			for (let i = 0; i < driver.animations.size(); i++) {
				if (driver.animations[i].node === node && driver.animations[i].spec.name === spec.name) exists = true;
			}
			if (!exists) {
				const keyframes = driver.engine.keyframes(spec.name);
				if (keyframes !== undefined) {
					const oldComputed = node.computed;
					node.computed = targetStyle;
					startAnimation(driver, node, spec, keyframes);
					node.computed = oldComputed;
				}
			}
		}
	}
	if (previous !== undefined && (targetStyle["transition"] ?? "") !== "") {
		const transitions = driver.engine.parseTransition(targetStyle["transition"] ?? "");
		for (let i = 0; i < transitions.size(); i++) {
			const spec = transitions[i];
			if (spec.duration <= 0) continue;
			const keys = spec.property === "all" ? keysOf(targetStyle) : [spec.property];
			for (let j = 0; j < keys.size(); j++) {
				const property = keys[j];
				if (property === "transition" || property === "animation") continue;
				if (previous[property] !== undefined && targetStyle[property] !== undefined && previous[property] !== targetStyle[property]) {
					startTransition(driver, node, property, node.computed[property] ?? previous[property], targetStyle[property], spec);
				}
			}
		}
	}
	const target: Record<string, string> = {};
	for (const [key, value] of pairs(targetStyle)) target[key as string] = value;
	node.styleState["targetStyle"] = target;
}

/** Remove all scheduled work for an unmounted subtree immediately. */
export function stopAnimations(driver: AnimationDriver, node: HostNode): void {
	for (let i = driver.animations.size() - 1; i >= 0; i--) if (driver.animations[i].node === node) driver.animations.remove(i);
	for (let i = driver.transitions.size() - 1; i >= 0; i--) if (driver.transitions[i].node === node) driver.transitions.remove(i);
	node.styleState["animatedProps"] = undefined;
	for (let i = 0; i < node.children.size(); i++) stopAnimations(driver, node.children[i]);
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
