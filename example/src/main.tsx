/**
 * toil-luau example: a small React app mounted onto a Roblox ScreenGui.
 *
 * A roblox-ts project. It uses toil-luau's React 19 runtime (the vendored
 * `@toil/react`, single-copy graph) for React + JSX, and toil-luau's Roblox UI
 * host (`mountReactRoot`) to render a styled panel with a clickable counter
 * through the real React 19 reconciler.
 *
 * Build with `npm run build` (runs `roblox-ts -p .`). The emitted Luau lands
 * in `out/` for Rojo.
 *
 * Note: roblox-ts does not allow importing TypeScript modules that live
 * directly under node_modules, so the host is imported from its source
 * (`../src/host/index`) while React comes from the vendored `@toil/react`
 * package (which ships pre-tamed Luau and passes through verbatim).
 */

import * as React from "@toil/react";
import { mountReactRoot } from "@toil-luau/core";
import type { StyleRule } from "@toil-luau/core";

// CSS rules fed to the engine. `declarations` are plain CSS property -> value.
const cssRules: Array<StyleRule> = [
	{
		selector: "section",
		declarations: {
			background: "rgba(20, 24, 33, 0.92)",
			padding: "16px",
			borderRadius: "12px",
		},
	},
	{
		selector: "h1",
		declarations: {
			color: "#8ab4ff",
			fontSize: "22px",
		},
	},
	{
		selector: "span",
		declarations: {
			color: "#e6eefc",
			fontSize: "16px",
		},
	},
	{
		selector: "button",
		declarations: {
			background: "#2563ff",
			color: "#ffffff",
			fontSize: "15px",
			padding: "8px 14px",
		},
	},
];

/** The React tree we mount. */
function App(): React.JSX.Element {
	const [count, setCount] = React.useState<number>(0);
	return (
		<section>
			<h1>toil-luau</h1>
			<span>{"React 19 on Roblox Luau. Clicks: " + count}</span>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</section>
	);
}

// Mount. `undefined` container renders detached (the caller parents the
// returned gui). For a real game, pass the PlayerGui instance instead.
const handle = mountReactRoot(undefined, cssRules, React.createElement(App), undefined, undefined);

// Keep a reference so the tree is not collected; the caller can unmount via it.
export const example = { handle };