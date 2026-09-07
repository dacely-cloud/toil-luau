/**
 * toil-luau example: a React app with CSS animations, mounted onto a Roblox
 * ScreenGui.
 *
 * A roblox-ts project. It uses toil-luau's React 19 runtime (the vendored
 * `@toil/react`, single-copy graph) for React + JSX, and toil-luau's Roblox UI
 * host (`mountReactRoot`) to render a styled card through the real React 19
 * reconciler. The stylesheet is plain CSS text: `parseCss` turns it into the
 * rule list the engine consumes, `@keyframes` included, and the host starts
 * every `animation` it finds at mount and advances it on RunService.Heartbeat.
 *
 * Build with `npm run build` (runs `roblox-ts -p .`). The emitted Luau lands
 * in `out/` for Rojo. The same UI ships as a ready-to-run LocalScript in the
 * parent's `scripts/studio-demo.client.luau` (see `npm run studio` there).
 *
 * Note: roblox-ts does not allow importing TypeScript modules that live
 * directly under node_modules, so the host is imported from its source
 * (`../src/host/index`) while React comes from the vendored `@toil/react`
 * package (which ships pre-tamed Luau and passes through verbatim).
 */

import * as React from "@toil/react";
import { mountReactRoot, parseCss } from "@toil-luau/core";

// Plain CSS. Keyframes drive opacity, rotation, width and colors; the host
// maps them onto BackgroundTransparency, Rotation, Size and BackgroundColor3.
const css = `
	@keyframes fade-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}
	@keyframes spin {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
	@keyframes pulse {
		0%   { width: 140px; background-color: #2563ff; }
		50%  { width: 200px; background-color: #7c3aed; }
		100% { width: 140px; background-color: #2563ff; }
	}
	@keyframes rainbow {
		0%   { background-color: #ff4d6d; }
		33%  { background-color: #4dff88; }
		66%  { background-color: #4d9bff; }
		100% { background-color: #ff4d6d; }
	}

	.card {
		position: absolute;
		top: 48px;
		left: 48px;
		width: 380px;
		height: 300px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		background-color: #141821;
		border-radius: 16px;
		animation: fade-in 1.2s ease-out;
	}
	.title  { width: 340px; height: 32px; color: #8ab4ff; font-size: 24px; font-weight: bold; }
	.status { width: 340px; height: 22px; color: #e6eefc; font-size: 16px; }
	.row    { width: 340px; height: 64px; display: flex; flex-direction: row; gap: 16px; align-items: center; }
	.spinner {
		width: 48px;
		height: 48px;
		background-color: #2563ff;
		border-radius: 10px;
		animation: spin 2s linear infinite;
	}
	.pulse {
		width: 140px;
		height: 44px;
		color: #ffffff;
		font-size: 15px;
		text-align: center;
		border-radius: 8px;
		animation: pulse 1.6s ease-in-out infinite;
	}
	.bar {
		width: 340px;
		height: 10px;
		border-radius: 5px;
		animation: rainbow 3s linear infinite;
	}
`;

/** The React tree we mount. `onClick` on a <button> is wired by the host. */
function App(): React.JSX.Element {
	const [clicks, setClicks] = React.useState<number>(0);
	return (
		<section id="card" className="card">
			<h1 id="title" className="title">
				toil-luau
			</h1>
			<span id="status" className="status">
				{"React 19 on Roblox.  Clicks: " + clicks}
			</span>
			<div id="row" className="row">
				<div id="spinner" className="spinner" />
				<button id="pulse" className="pulse" onClick={() => setClicks(clicks + 1)}>
					Click me
				</button>
			</div>
			<div id="bar" className="bar" />
		</section>
	);
}

// Mount. `undefined` container renders detached (the caller parents the
// returned gui). For a real game, pass the PlayerGui instance instead.
const handle = mountReactRoot(undefined, parseCss(css), React.createElement(App), undefined, undefined);

// Keep a reference so the tree is not collected; the caller can unmount via it.
export const example = { handle };
