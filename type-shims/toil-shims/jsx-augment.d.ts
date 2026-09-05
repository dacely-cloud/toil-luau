/**
 * Augments React.JSX.IntrinsicElements (via the @toil/react type surface)
 * with the custom host elements used by the spike app.
 *
 * This file is a module (it has a top-level import), so the
 * `declare module "react"` block augments the real module instead of
 * creating a new ambient one.
 */
import "react";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
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