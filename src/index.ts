/**
 * Public entry point for toil-luau.
 *
 * toil-luau runs the real React 19 reconciler (vendored as @toil/*) on Roblox
 * Luau. This module re-exports the public surface so a consumer can do:
 *
 *   import { mountReactRoot, React } from "toil-luau";
 *   mountReactRoot(playerGui, cssRules, <MyApp />, undefined, envOverride?);
 *
 * - `mountReactRoot` and friends live in ./host (the Roblox UI host).
 * - `React` re-exports the vendored React 19 runtime (hooks, createElement,
 *   JSX).
 * - The CSS engine, animation driver, and host config are re-exported for
 *   advanced consumers.
 */

export {
	mountReactRoot,
	makeEngineEnv,
	makeDefaultEngine,
	applyStyle,
	buildHostConfig,
	tick,
	createDriver,
	startAnimation,
	startTransition,
	makeRealClock,
	makeFakeClock,
} from "./host/index";

export type {
	MountHandle,
	HostEnv,
	HostNode,
	RobloxInstance,
	Clock,
	AnimationDriver,
	StyleRule,
	Engine,
	ElementIdentity,
	AnimationSpec,
	KeyframeSet,
	TransitionSpec,
} from "./host/index";

export { drainTasks, log, taskLog } from "./polyfills";

// The vendored React 19 runtime (single-copy graph). The vendor entry is a
// CommonJS module (`export = React`), so import it as a namespace and
// re-export it. Consumers write `React.useState`, `React.createContext`, etc.
import * as React from "@toil/react";
export { React };