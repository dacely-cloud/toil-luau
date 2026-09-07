/**
 * Public entry point for the Roblox UI host.
 *
 * `mountReactRoot` creates a ScreenGui, builds the hostConfig, and mounts a
 * React 19 element tree onto it. Returns a handle with `unmount()`,
 * `tick(now)`, and the root `gui` instance.
 */

import * as React from "@toil/react";
import ReactReconciler from "@toil/react-reconciler";
import { drainTasks } from "../polyfills";import {
	type HostEnv,
	type HostNode,
	type RobloxInstance,
	type RobloxClassName,
	TAG_TO_CLASS,
	tagNameToInstanceName,
	applyStyle,
	buildHostConfig,
	identityFromProps,
} from "./roblox-host";
import {
	type Clock,
	type AnimationDriver,
	makeRealClock,
	createDriver,
	tick,
	startAnimation,
	startTransition,
} from "./animations";
import { createEngine as createRealEngine } from "../css/engine";
import type {
	StyleRule,
	Engine,
	ElementIdentity,
	AnimationSpec,
	KeyframeSet,
	TransitionSpec,
} from "./engine-types";

/** Roblox signal/connection shapes, typed as methods so calls emit `:`. */
interface SignalLike {
	Connect(this: SignalLike, callback: (dt: number) => void): ConnectionLike;
}
interface ConnectionLike {
	Disconnect(this: ConnectionLike): void;
}

// ------------------------------------------------------------------ Engine env

/**
 * Build the default HostEnv that reads the real Roblox engine globals.
 * In tests, a fake env is injected instead.
 */
export function makeEngineEnv(): HostEnv {
	function newInstance(className: RobloxClassName): RobloxInstance {
		const inst = (Instance as unknown as { new: (c: string) => Instance }).new(className);
		(inst as unknown as Record<string, unknown>)["Parent"] = undefined;
		return inst as unknown as RobloxInstance;
	}

	function newUDim2(xScale: number, xOffset: number, yScale: number, yOffset: number): unknown {
		return (UDim2 as unknown as { new: (a: number, b: number, c: number, d: number) => UDim2 }).new(xScale, xOffset, yScale, yOffset);
	}

	function newUDim(scale: number, offset: number): unknown {
		return (UDim as unknown as { new: (a: number, b: number) => UDim }).new(scale, offset);
	}

	function newVector2(x: number, y: number): unknown {
		return (Vector2 as unknown as { new: (a: number, b: number) => Vector2 }).new(x, y);
	}

	function newColor3(r: number, g: number, b: number): unknown {
		// parseColor yields 0-255 components. Color3.new expects 0-1 (and
		// clamps at render, so Color3.new(20, 24, 33) would paint pure white);
		// Color3.fromRGB is the 0-255 constructor.
		return (Color3 as unknown as { fromRGB: (r: number, g: number, b: number) => Color3 }).fromRGB(r, g, b);
	}

	function newColorSequence(colors: Array<{ r: number; g: number; b: number; a: number }>): unknown {
		const kpCtor = ColorSequenceKeypoint as unknown as { new: (t: number, c: unknown) => unknown };
		const c3 = Color3 as unknown as { fromRGB: (r: number, g: number, b: number) => unknown };
		const count = colors.size();
		const kps: Array<unknown> = [];
		for (let i = 0; i < count; i++) {
			const t = count <= 1 ? 0 : i / (count - 1);
			const col = colors[i];
			kps.push(kpCtor.new(t, c3.fromRGB(col.r, col.g, col.b)));
		}
		return (ColorSequence as unknown as { new: (k: Array<unknown>) => unknown }).new(kps);
	}

	function newNumberSequence(values: Array<number>): unknown {
		const kpCtor = NumberSequenceKeypoint as unknown as { new: (t: number, v: number) => unknown };
		const count = values.size();
		const kps: Array<unknown> = [];
		for (let i = 0; i < count; i++) {
			const t = count <= 1 ? 0 : i / (count - 1);
			kps.push(kpCtor.new(t, values[i]));
		}
		return (NumberSequence as unknown as { new: (k: Array<unknown>) => unknown }).new(kps);
	}

	function enumValue(name: string): unknown {
		// name is "EnumType.Member" e.g. "Font.GothamBold". Roblox raises on
		// an unknown enum or member, so the lookup is protected.
		const parts = name.split(".");
		if (parts.size() !== 2) return undefined;
		const [ok, value] = pcall((): unknown => {
			const enumTable = (Enum as unknown as Record<string, Record<string, unknown>>)[parts[0]];
			if (enumTable === undefined) return undefined;
			return enumTable[parts[1]];
		});
		return ok ? value : undefined;
	}

	function destroy(inst: RobloxInstance): void {
		(inst as unknown as Instance).Destroy();
	}

	return {
		newInstance,
		newUDim2,
		newUDim,
		newVector2,
		newColor3,
		newColorSequence,
		newNumberSequence,
		enumValue,
		destroy,
	};
}

/**
 * Default engine: the real CSS engine built from `rules`.
 * While src/css/engine.ts is being brought up to the Engine contract,
 * mountReactRoot accepts an explicit engine to override this.
 */
export function makeDefaultEngine(rules: Array<StyleRule>): Engine {
	return createRealEngine(rules) as unknown as Engine;
}

// ------------------------------------------------------------------ Mount handle

/**
 * The handle returned by mountReactRoot.
 */
export interface MountHandle {
	/** The ScreenGui instance that hosts the rendered tree. */
	gui: RobloxInstance;
	/** Unmount the React tree and destroy the GUI. */
	unmount: () => void;
	/** Advance all animations/transitions to the given clock time (seconds). */
	tick: (now: number) => void;
}

// ------------------------------------------------------------------ mountReactRoot

/**
 * Mount a React element tree onto a Roblox ScreenGui.
 *
 * @param container - An existing instance to parent the ScreenGui to (e.g. PlayerGui).
 *                    If undefined, the ScreenGui is not parented (caller must do so).
 * @param rules - The CSS rules to build the engine from.
 * @param element - The React element to render.
 * @param engine - The CSS engine (built from `rules`).
 * @param env - The Roblox API adapter. Defaults to the real engine globals.
 * @param clock - The clock for animation timing. Defaults to a real clock.
 * @returns A MountHandle with gui, unmount(), and tick(now).
 */
export function mountReactRoot(
	container: RobloxInstance | undefined,
	rules: Array<StyleRule>,
	element: unknown,
	engine: Engine | undefined,
	envOverride?: HostEnv
): MountHandle {
	const e = envOverride ?? makeEngineEnv();
	const eng = engine ?? makeDefaultEngine(rules);

	// The animation clock counts seconds since mount, so handle.tick(now) can
	// pin it to an absolute time (tests drive animations deterministically);
	// the Heartbeat path leaves the override unset and reads the real clock.
	const realClock = makeRealClock();
	const mountedAt = realClock.now();
	let clockOverride: number | undefined;
	const c: Clock = {
		now: (): number => {
			if (clockOverride !== undefined) return clockOverride;
			return realClock.now() - mountedAt;
		},
	};

	// Create the ScreenGui
	const gui = e.newInstance("ScreenGui");
	(gui as Record<string, unknown>)["Name"] = "ToilRoot";
	(gui as Record<string, unknown>)["ResetOnSpawn"] = false;
	(gui as Record<string, unknown>)["ZIndexBehavior"] = e.enumValue("ZIndexBehavior.Sibling");
	if (container !== undefined) {
		(gui as Record<string, unknown>)["Parent"] = container;
	}

	// Build the HostNode wrapper for the ScreenGui
	const guiNode: HostNode = {
		kind: "host",
		nodeType: "gui",
		inst: gui,
		text: "",
		computed: {},
		classId: "",
		classes: "",
		pendingProps: {},
		parent: undefined,
		children: [],
		layoutOrder: 0,
		styleState: {},
		identity: {
			tagName: "gui",
			classList: [],
			attributes: {},
			states: [],
		},
	};

	// Build the style resolver
	// A function property, not a method: StyleResolver.resolve is called with
	// a dot (resolver.resolve(node)), so a method form would bind the node to
	// `self` and leave `node` nil.
	const resolver = {
		resolve: (node: HostNode): Record<string, string> => {
			// Keep the identity fresh from the node's last props, so selectors
			// re-match even when commitUpdate does not fire.
			node.identity = identityFromProps(node, node.pendingProps);
			// Build the ancestor chain from the node's parent chain
			let ancestors: Array<ElementIdentity> = [];
			let parent = node.parent;
			while (parent !== undefined) {
				ancestors.push(parent.identity);
				parent = parent.parent;
			}
			// Reverse so outermost is first
			// reverse in place
			const rev: Array<ElementIdentity> = [];
			for (let ri = ancestors.size() - 1; ri >= 0; ri--) { rev.push(ancestors[ri]); }
			ancestors = rev;
			// Compute sibling index
			let siblingIndex = 0;
			let siblingCount = 0;
			if (node.parent !== undefined) {
				siblingCount = node.parent.children.size();
				for (let i = 0; i < siblingCount; i++) {
					if (node.parent.children[i] === node) {
						siblingIndex = i;
						break;
					}
				}
			}
			return eng.computedStyle(
				node.identity,
				ancestors,
				siblingIndex,
				siblingCount,
				node.pendingProps["style"] as Record<string, string> | undefined
			);
		},
		engine,
	};

	// Build the host config
	const hostConfig = buildHostConfig(e, resolver);

	// Create the reconciler
	const reconciler = ReactReconciler(hostConfig);

	// Create the container (10 args, matching src/main.tsx)
	const root = reconciler.createContainer(
		guiNode,
		0, // tag: HostRoot
		undefined, // hydrationCallbacks
		false, // isStrictMode
		undefined, // concurrentUpdatesByDefaultOverride
		"", // identifierPrefix
		(errorValue: unknown, _info: unknown): void => {
			// A render error must not vanish: React swallows it and commits an
			// empty tree, which is far harder to diagnose than a printed error.
			print("[toil] uncaught render error:", tostring(errorValue));
		},
		(errorValue: unknown, _info: unknown): void => {
			print("[toil] caught render error:", tostring(errorValue));
		},
		(errorValue: unknown, _info: unknown): void => {
			print("[toil] recoverable render error:", tostring(errorValue));
		},
		(): void => {
			// console.log("default-indicator");
		}
	);

	// Render the element
	reconciler.updateContainer(element as unknown as React.ReactNode, root, undefined, undefined);
	drainTasks();

	// Create the animation driver
	const driver = createDriver(c, eng, e);

	// Start animations found in the initial computed styles
	// (This would be done in commitUpdate/finalizeInitialChildren in a full
	// implementation; for the spike we scan the tree once after mount.)
	// Animations declared in the initial styles start at exactly t = 0 on the
	// mount clock, so handle.tick(now) samples them deterministically.
	clockOverride = 0;
	scanAndStartAnimations(guiNode, eng, driver);
	clockOverride = undefined;

	// In real Roblox, RunService.Heartbeat flushes React's task queue (so a
	// setState from an event handler renders on the next frame) and advances
	// the animations. Roblox members are method calls, so the signal goes
	// through the SignalLike shape (emits `:Connect`); the Lest native
	// backend fakes `game` with an empty Heartbeat table, which the probe
	// skips.
	let heartbeatConnection: ConnectionLike | undefined;
	const runService = game.GetService("RunService") as unknown as Record<string, unknown> | undefined;
	const heartbeat = runService !== undefined ? runService["Heartbeat"] : undefined;
	if (heartbeat !== undefined && typeIs((heartbeat as Record<string, unknown>)["Connect"], "function")) {
		heartbeatConnection = (heartbeat as unknown as SignalLike).Connect((_dt: number): void => {
			drainTasks();
			tick(driver);
		});
	}

	// Build the handle
	function doUnmount(): void {
		if (heartbeatConnection !== undefined) {
			heartbeatConnection.Disconnect();
		}
		// Clear the container
		for (let i = guiNode.children.size() - 1; i >= 0; i--) {
			const child = guiNode.children[i];
			if (child.inst !== undefined) {
				e.destroy(child.inst);
			}
		}
		e.destroy(gui);
	}

	function doTick(now: number): void {
		clockOverride = now;
		tick(driver);
		clockOverride = undefined;
	}

	return {
		gui,
		unmount: doUnmount,
		tick: doTick,
	};
}

/**
 * Scan a mounted tree and start any animations found in computed styles.
 */
function scanAndStartAnimations(
	node: HostNode,
	engine: Engine,
	driver: AnimationDriver
): void {
	if (node.inst === undefined) return;
	const computed = node.computed;
	const animValue = computed["animation"] ?? "";
	if (animValue.size() > 0) {
		const specs = engine.parseAnimation(animValue);
		for (let i = 0; i < specs.size(); i++) {
			const spec = specs[i];
			const kf = engine.keyframes(spec.name);
			if (kf !== undefined) {
				startAnimation(driver, node, spec, kf);
			}
		}
	}
	// Recurse into children
	for (let i = 0; i < node.children.size(); i++) {
		scanAndStartAnimations(node.children[i], engine, driver);
	}
}

// Re-export for consumers
export { applyStyle, buildHostConfig } from "./roblox-host";
export { parseCss, cssToRules } from "../css/loader";
export { tick, createDriver, startAnimation, startTransition, makeRealClock } from "./animations";
export { makeFakeClock } from "./animations";
export type { HostEnv, HostNode, RobloxInstance } from "./roblox-host";
export type { Clock, AnimationDriver } from "./animations";
export type { StyleRule, Engine, ElementIdentity, AnimationSpec, KeyframeSet, TransitionSpec } from "./engine-types";
