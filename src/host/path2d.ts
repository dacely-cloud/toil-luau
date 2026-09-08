import type * as React from "@toil/react";

/** Native Roblox Path2D. Coordinates and tangents are relative to its GUI parent. */
export interface Path2DProps {
	id?: string;
	className?: string;
	class?: string;
	key?: React.Key;
	ref?: React.Ref<Path2D>;
	/** Replace the complete curve declaratively. Omit to clear it. Maximum is engine-defined. */
	controlPoints?: ReadonlyArray<Path2DControlPoint>;
	closed?: boolean;
	color?: Color3 | string;
	thickness?: number;
	visible?: boolean;
	zIndex?: number;
	/** Supported path styles: stroke/color, stroke-width, visibility, display, z-index. */
	style?: Record<string, string>;
	onControlPointChanged?: (event: { type: "controlpointchanged"; target: Path2D }) => void;
}
