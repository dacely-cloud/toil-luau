/**
 * Augments React.JSX.IntrinsicElements (via the @toil/react type surface)
 * with the custom host elements used by the spike app.
 *
 * This file is a module (it has a top-level import), so the
 * `declare module "react"` block augments the real module instead of
 * creating a new ambient one.
 */
import "react";
import type { Path2DProps } from "../../src/host/path2d";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			/** Native Roblox curve; ref exposes the complete public Path2D API. */
			path2d: Path2DProps;
			scroll: Record<string, unknown>;
			/** Host panel: holds the counter UI. */
			panel: Record<string, unknown>;
			/** Static caption text. */
			caption: Record<string, unknown>;
			/** The clickable counter button. */
			counterButton: {
				label: string;
				onBump: (event: unknown) => void;
			};
		}
	}
}

export {};
