/**
 * Roblox UI host for toil-roblox.
 *
 * A react-reconciler hostConfig that maps a React 19 element tree (styled by
 * the CSS engine) onto a real Roblox ScreenGui instance tree, plus the
 * engine-agnostic CSS-to-GUI mapper the commit phase runs against it.
 *
 * Testability (Lest native backend, no Roblox engine): every Roblox API
 * touch goes through a HostEnv interface (Instance.new, UDim2/UDim/Vector2/
 * Color3 constructors, Enum members, helper-child lookups). The default
 * `makeEngineEnv()` reads the engine globals; tests inject a fake env.
 * Everything else (TAG_TO_CLASS, length/color/transform parsing, placement
 * math, idempotent applyStyle) is pure and exported for direct unit tests.
 */

import type ReactReconciler from "@toil/react-reconciler";
import type { ElementIdentity, Engine, TransitionSpec } from "./engine-types";

/**
 * Build a host node's element identity from its props and node state.
 * Pure and exported so specs can unit-test the mapping.
 */
export function identityFromProps(
	node: HostNode,
	props: Record<string, unknown>
): ElementIdentity {
	const classList: Array<string> = [];
	const rawClass = props["class"];
	if (typeOfJS(rawClass) === "string") {
		const tokens = string.split(rawClass as string, "%s+");
		for (let i = 0; i < tokens.size(); i++) {
			if (tokens[i].size() > 0) {
				classList.push(tokens[i]);
			}
		}
	}
	const attributes: Record<string, string> = {};
	const keys = Object.keys(props) as Array<string>;
	for (let i = 0; i < keys.size(); i++) {
		const k = keys[i];
		if (k === "class" || k === "id" || k === "children" || k === "ref") {
			continue;
		}
		const v = props[k];
		if (typeOfJS(v) === "string") {
			attributes[k] = v as string;
		}
	}
	const states: Array<string> = [];
	if (node.classId.size() > 0) {
		states.push(node.classId);
	}
	return {
		tagName: node.nodeType,
		id: attributes["id"],
		classList,
		attributes,
		states,
	};
}

/**
 * Native-Luau string operations, module-local so no runtime global is
 * needed (Lest's VM never gets the spike helper globals).
 * roblox-ts keeps `string` as the native Luau string type, so these emit as
 * direct `s:match(...)` / `s:sub(...)` / `s:gsub(...)` / `s:lower()` calls.
 */

// ------------------------------------------------------------------ types

export type RobloxClassName =
	| "Frame"
	| "TextLabel"
	| "TextButton"
	| "TextBox"
	| "ImageLabel"
	| "ScreenGui"
	| "UICorner"
	| "UIPadding"
	| "UIListLayout"
	| "UIStroke";

/** A wrapped Roblox Instance. Never `any`: typed accessors below. */
export type RobloxInstance = {
	Name: string;
	Parent: unknown;
	ClassName: string;
} & Record<string, unknown>;

/** One host node of the rendered tree. */
export interface HostNode {
	kind: "host" | "text";
	/** The DOM tag this node was created for (e.g. "div", "span"). */
	nodeType: string;
	/** Wrapped Roblox Instance. Only present when kind === "host". */
	inst: RobloxInstance | undefined;
	/** Raw element text when kind === "text". */
	text: string;
	/** The last computed style table applied to this node. */
	computed: Record<string, string>;
	/** classId from the element ("" when none). */
	classId: string;
	/** Last known class list from props, for selector identity. */
	classes: string;
	/** Last props seen for this node, used to refresh identity on resolve. */
	pendingProps: Record<string, unknown>;
	/** The host node this node is a child of (undefined at root). */
	parent: HostNode | undefined;
	/** Sibling children in DOM order, for insertBefore ordering. */
	children: Array<HostNode>;
	/** Last LayoutOrder assigned to this node's instance. */
	layoutOrder: number;
	/**
	 * Per-node style state the mapper mutates so repeated applications are
	 * idempotent: records which helper children already exist and the last
	 * values written, so we never duplicate UIPadding/UICorner/UIListLayout
	 * and never rewrite properties that have not changed.
	 */
	styleState: Record<string, unknown>;
	/**
	 * The element identity the CSS engine resolves this node against. The
	 * parent tree supplies ancestors/sibling position when it is computed.
	 */
	identity: ElementIdentity;
}

/**
 * The narrow Roblox surface the host touches. A test env implements the same
 * interface over plain tables (specs/_host_env.luau).
 */
export interface HostEnv {
	newInstance: (className: RobloxClassName) => RobloxInstance;
	newUDim2: (xScale: number, xOffset: number, yScale: number, yOffset: number) => unknown;
	newUDim: (scale: number, offset: number) => unknown;
	newVector2: (x: number, y: number) => unknown;
	newColor3: (r: number, g: number, b: number) => unknown;
	/** Enum member access by fully-qualified name, e.g. "Font.GothamBold". */
	enumValue: (name: string) => unknown;
	/** Destroy an instance (helper cleanup on remount). */
	destroy: (inst: RobloxInstance) => void;
}

/**
 * A host node's identity, used to re-resolve the element's computed style.
 * The mounter (src/host/index.ts) wires this up; the reconciler's commit
 * calls receive it indirectly through the node.
 */
export interface StyleResolver {
	/**
	 * Recompute the element's full style from scratch given its identity and
	 * position in the tree. Called at commit time so the mapper always sees
	 * fresh values, not stale snapshots from a previous render.
	 */
	resolve: (node: HostNode) => Record<string, string>;
	/** The engine handle, for animation evaluation. */
	engine: Engine;
}


// --- string helpers.
// Native Luau string operations, module-local so no runtime global is
// needed (Lest's VM never gets the spike helper globals). roblox-ts keeps
// `string` as the native Luau string type, so these emit as direct
// `s:match(...)` / `s:sub(...)` / `s:find(...)` calls.

function strTrim(s: string): string {
	const m = string.match(s, "^%s*(.-)%s*$");
	return (m[0] as unknown) as string;
}

/**
 * Module-local parseFloat/isNaN/parseInt so the mapper does not depend on
 * the Roblox runtime globals being present in the test env. In Roblox these
 * shadow the builtins; in the fake env they provide the same behavior.
 */
function _parseFloat(v: unknown): number {
	if (typeOf(v) === "number") return v as number;
	const s = strTrim(v as string);
	const m = string.match(s, "^%s*(-?%d+%.?%d*)");
	const numStr = (m[0] as unknown) as string | undefined;
	if (numStr === undefined) return NaN;
	const n = (tonumber as unknown as (s: string) => number | undefined)(numStr);
	return n !== undefined ? n : NaN;
}
function _isNaN(v: number): boolean {
	return v !== v;
}

/** Module-local round (shadows the Roblox Math:round global). */
function _round(v: number): number {
	return (math.floor as unknown as (n: number) => number)(v + 0.5);
}
function _parseInt(v: unknown, base?: number): number {
	if (typeOf(v) === "number") return Math.floor(v as number);
	const s = strTrim(v as string);
	if (base === 16) {
		const n = (tonumber as unknown as (s: string, b: number) => number | undefined)(s, 16);
		return n !== undefined ? n : 0;
	}
	const m = string.match(s, "^%s*(-?%d+)");
	const numStr = (m[0] as unknown) as string | undefined;
	if (numStr === undefined) return 0;
	const n = (tonumber as unknown as (s: string) => number | undefined)(numStr);
	return n !== undefined ? Math.floor(n) : 0;
}

function slice(s: string, start: number, finish?: number): string {
	if (finish === undefined) return (string.sub(s, start) as unknown) as string;
	return (string.sub(s, start, finish) as unknown) as string;
}

function strFind(s: string, pattern: string, init: number, plain: boolean): number | undefined {
	return (string.find(s, pattern, init, plain) as unknown) as number | undefined;
}

/** True if s starts with prefix. */
function startsWith(s: string, prefix: string): boolean {
	return s.size() >= prefix.size() && slice(s, 1, prefix.size()) === prefix;
}

// ------------------------------------------------------------------ tag map

export const TAG_TO_CLASS: Record<string, RobloxClassName> = {
	div: "Frame",
	section: "Frame",
	article: "Frame",
	aside: "Frame",
	nav: "Frame",
	main: "Frame",
	footer: "Frame",
	header: "Frame",
	ul: "Frame",
	ol: "Frame",
	li: "Frame",
	svg: "Frame",
	span: "TextLabel",
	label: "TextLabel",
	p: "TextLabel",
	h1: "TextLabel",
	h2: "TextLabel",
	h3: "TextLabel",
	h4: "TextLabel",
	h5: "TextLabel",
	h6: "TextLabel",
	a: "TextButton",
	b: "TextLabel",
	strong: "TextLabel",
	i: "TextLabel",
	em: "TextLabel",
	small: "TextLabel",
	button: "TextButton",
	img: "ImageLabel",
	input: "TextBox",
};

/** Sanitize a DOM tag into a valid Instance.Name. */
export function tagNameToInstanceName(nodeType: string): string {
	if (nodeType === "#text") {
		return "Text";
	}
	// Keep alphanumerics; the engine would reject anything else.
	let out = "";
	for (let i = 0; i < nodeType.size(); i++) {
		const c = slice(nodeType, i + 1, i + 1);
		if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || (c >= "0" && c <= "9")) {
			out += c;
		}
	}
	return out === "" ? "Element" : out;
}

// ------------------------------------------------------------------ parsing

/**
 * Parse a canonical length string into scale (fraction of parent) and offset
 * (pixels). "auto" -> { scale: 0, offset: 0, auto: true }. Returns undefined
 * when the string is not a length.
 */
export interface ParsedLength {
	scale: number;
	offset: number;
	auto: boolean;
}

export function parseLength(value: string | undefined): ParsedLength | undefined {
	if (value === undefined) {
		return undefined;
	}
	const s = strTrim(value);
	if (s === "auto") {
		return { scale: 0, offset: 0, auto: true };
	}
	if (s.size() >= 2 && slice(s, s.size() - 1) === "%") {
		const n = _parseFloat(slice(s, 1, s.size() - 1));
		if (_isNaN(n)) {
			return undefined;
		}
		return { scale: n / 100, offset: 0, auto: false };
	}
	if (s.size() >= 2 && slice(s, s.size() - 1) === "px") {
		const n = _parseFloat(slice(s, 1, s.size() - 1));
		if (_isNaN(n)) {
			return undefined;
		}
		return { scale: 0, offset: n, auto: false };
	}
	// A bare number is treated as px.
	const n = _parseFloat(s);
	if (_isNaN(n)) {
		return undefined;
	}
	return { scale: 0, offset: n, auto: false };
}

export interface ParsedColor {
	r: number; // 0..255
	g: number;
	b: number;
	a: number; // 0..1
}


const NAMED_COLORS: Record<string, [number, number, number]> = {
	white: [255, 255, 255],
	black: [0, 0, 0],
	red: [255, 0, 0],
	green: [0, 128, 0],
	blue: [0, 0, 255],
};

export function parseColor(value: string | undefined): ParsedColor | undefined {
	if (value === undefined) {
		return undefined;
	}
	const s = string.lower(strTrim(value));
	if (s === "transparent") {
		return { r: 0, g: 0, b: 0, a: 0 };
	}
	// #rgb / #rrggbb
	if (slice(s, 1, 1) === "#" && (s.size() === 4 || s.size() === 7)) {
		let r = 0;
		let g = 0;
		let b = 0;
		if (s.size() === 4) {
			r = _parseInt(slice(s, 2, 2), 16) * 17;
			g = _parseInt(slice(s, 3, 3), 16) * 17;
			b = _parseInt(slice(s, 4, 4), 16) * 17;
			return { r, g, b, a: 1 };
		}
		r = _parseInt(slice(s, 2, 3), 16);
		g = _parseInt(slice(s, 4, 5), 16);
		b = _parseInt(slice(s, 6, 7), 16);
		return { r, g, b, a: 1 };
	}
	// rgb() / rgba()
	const rgbM = string.match(s, "^rgba?%(([^)]+)%)$");
	const rgb = (rgbM[0] as unknown) as string | undefined;
	if (rgb !== undefined) {
		const rawParts = (string.split(rgb, ",") as unknown) as Array<string>;
		const parts: Array<string> = [];
		for (let i = 0; i < rawParts.size(); i++) {
			parts.push(strTrim(rawParts[i]));
		}
		if (parts.size() >= 3) {
			const r = clamp255(_parseFloat(parts[0]));
			const g = clamp255(_parseFloat(parts[1]));
			const b = clamp255(_parseFloat(parts[2]));
			let a = 1;
			if (parts.size() >= 4) {
					const pa = _parseFloat(parts[3]);
				a = _isNaN(pa) ? 1 : clamp01(pa);
			}
			return { r, g, b, a };
		}
	}
	const named = NAMED_COLORS[s];
	if (named !== undefined) {
		return { r: named[0], g: named[1], b: named[2], a: 1 };
	}
	return undefined;
}

/**
 * Extract the first color token from a box-shadow value.
 * A box-shadow is "offset-x offset-y blur-radius [spread] color". We scan
 * for the first token that parseColor can resolve (a named color, #hex,
 * rgb()/rgba()).
 */
export function firstColor(value: string): string {
	// Tokenize on whitespace. rgb()/rgba() colors contain spaces, so rejoin
	// tokens that form an rgb(...)/rgba(...) expression before testing.
	const parts = string.split(value, " ") as unknown as Array<string>;
	for (let i = 0; i < parts.size(); i++) {
		let t = strTrim(parts[i]);
		if (t.size() === 0) continue;
		// If this token starts an rgb()/rgba() expression, gather until ')'.
		const isRgbStart = startsWith(t, "rgba(") || startsWith(t, "rgb(");
		const hasCloseParen = strFind(t, ")", 1, true) !== undefined;
		if (isRgbStart && !hasCloseParen) {
			let j = i + 1;
			while (j < parts.size()) {
				t = t + " " + strTrim(parts[j]);
				if (strFind(t, ")", 1, true) !== undefined) break;
				j++;
			}
			i = j;
		}
		if (parseColor(t) !== undefined) {
			return t;
		}
	}
	return "";
}

/**
 * Extract the first length token (the blur radius) from a box-shadow value.
 * We scan for the first token that parseLength can resolve to a positive
 * pixel offset, skipping the offset-x/offset-y/position tokens (which are
 * also lengths, but the blur is the 3rd length in the standard order).
 */
export function firstLength(value: string): string {
	const tokens = (string.split(value, " ") as unknown) as Array<string>;
	for (let i = 0; i < tokens.size(); i++) {
		const t = strTrim(tokens[i]);
		if (t.size() === 0) continue;
		const l = parseLength(t);
		if (l !== undefined && l.offset > 0 && !l.auto) {
			return t;
		}
	}
	return "";
}

function clamp255(n: number): number {
	if (_isNaN(n)) {
		return 0;
	}
	if (n < 0) {
		return 0;
	}
	if (n > 255) {
		return 255;
	}
	return n;
}

function clamp01(n: number): number {
	if (n < 0) {
		return 0;
	}
	if (n > 1) {
		return 1;
	}
	return n;
}

/** A parsed length component: scale fraction of the parent, plus px offset. */
export interface ParsedOffset {
	scale: number;
	offset: number;
}

/** Parse a single "xpx" or "x%"/"x" token. */
function parseOffset(v: string | undefined): ParsedOffset {
	if (v === undefined) {
		return { scale: 0, offset: 0 };
	}
	const s = strTrim(v);
	if (s.size() >= 1 && slice(s, s.size()) === "%") {
		const n = _parseFloat(slice(s, 1, s.size() - 1));
		return { scale: _isNaN(n) ? 0 : n / 100, offset: 0 };
	}
	const n = _parseFloat(s);
	return { scale: 0, offset: _isNaN(n) ? 0 : n };
}

/**
 * Compute AnchorPoint + Position (as UDim2 scale/offset) from the set of
 * positioned edges. Top-left default; right/bottom are negative offsets.
 * - top+left (or none): anchor (0,0)
 * - bottom+right: anchor (1,1)
 * - center (no edges, or "center"): anchor (0.5, 0.5)
 */
export function computePlacement(
	style: Record<string, string>,
	rootSizePx: [number, number]
): {
	anchorX: number;
	anchorY: number;
	posScaleX: number;
	posScaleY: number;
	posOffsetX: number;
	posOffsetY: number;
} {
	const position = strTrim(style["position"] ?? "");
	const isPos = position === "absolute" || position === "fixed";
	if (!isPos) {
		// Static flow: position is irrelevant; leave at 0,0 anchor 0,0.
		return {
			anchorX: 0,
			anchorY: 0,
			posScaleX: 0,
			posScaleY: 0,
			posOffsetX: 0,
			posOffsetY: 0,
		};
	}
	const top = parseOffset(style["top"]);
	const left = parseOffset(style["left"]);
	const right = parseOffset(style["right"]);
	const bottom = parseOffset(style["bottom"]);
	const hasTop = style["top"] !== undefined;
	const hasLeft = style["left"] !== undefined;
	const hasRight = style["right"] !== undefined;
	const hasBottom = style["bottom"] !== undefined;

	let anchorX: number;
	let anchorY: number;
	let posX: ParsedOffset;
	let posY: ParsedOffset;

	// Horizontal
	if (hasRight && hasLeft) {
		// Both: anchor centered horizontally, positioned by left.
		anchorX = 0;
		posX = left;
	} else if (hasRight) {
		anchorX = 1;
		posX = { scale: 0, offset: -right.offset };
	} else if (hasLeft) {
		anchorX = 0;
		posX = left;
	} else {
		anchorX = 0.5;
		posX = { scale: 0, offset: 0 };
	}

	// Vertical
	if (hasBottom && hasTop) {
		anchorY = 0;
		posY = top;
	} else if (hasBottom) {
		anchorY = 1;
		posY = { scale: 0, offset: -bottom.offset };
	} else if (hasTop) {
		anchorY = 0;
		posY = top;
	} else {
		anchorY = 0.5;
		posY = { scale: 0, offset: 0 };
	}

	return {
		anchorX,
		anchorY,
		posScaleX: posX.scale,
		posScaleY: posY.scale,
		posOffsetX: posX.offset,
		posOffsetY: posY.offset,
	};
}


// ------------------------------------------------------------------ applyStyle

/**
 * Apply a computed style table to a host node's Roblox Instance.
 * Idempotent: helper children are created only once; properties are
 * re-written every call (cheap on the engine side).
 */
export function applyStyle(node: HostNode, style: Record<string, string>, env: HostEnv): void {
	const inst = node.inst;
	if (inst === undefined) return;
	node.computed = style;

	// --- Size (width / height) ---
	const w = parseLength(style["width"]);
	const h = parseLength(style["height"]);
	if (w !== undefined && h !== undefined) {
		// UDim2.new(xScale, xOffset, yScale, yOffset)
		const size = env.newUDim2(w.scale, w.offset, h.scale, h.offset);
		(inst as Record<string, unknown>)["Size"] = size;
	}

	// --- Position (top / left / right / bottom + position) ---
	const placement = computePlacement(style, [100, 100]);
	const anchor = env.newVector2(placement.anchorX, placement.anchorY);
	const pos = env.newUDim2(
		placement.posScaleX,
		placement.posOffsetX,
		placement.posScaleY,
		placement.posOffsetY
	);
	(inst as Record<string, unknown>)["AnchorPoint"] = anchor;
	(inst as Record<string, unknown>)["Position"] = pos;

	// --- Background color ---
	const bg = parseColor(style["background-color"]);
	if (bg !== undefined) {
		(inst as Record<string, unknown>)["BackgroundColor3"] = env.newColor3(bg.r, bg.g, bg.b);
		if (bg.a < 1) {
			(inst as Record<string, unknown>)["BackgroundTransparency"] = 1 - bg.a;
		}
	}

	// --- Border ---
	const borderW = parseLength(style["border-width"]);
	const borderColor = parseColor(style["border-color"]);
	if (borderW !== undefined && borderW.offset > 0) {
		(inst as Record<string, unknown>)["BorderSizePixel"] = _round(borderW.offset);
		if (borderColor !== undefined) {
			(inst as Record<string, unknown>)["BorderColor3"] = env.newColor3(
				borderColor.r,
				borderColor.g,
				borderColor.b
			);
		}
		(inst as Record<string, unknown>)["BorderMode"] = env.enumValue("BorderMode.Inset");
	}

	// --- Border radius (UICorner child) ---
	const radius = parseLength(style["border-radius"]);
	if (radius !== undefined && radius.offset > 0) {
		ensureHelperChild(node, "ToilCorner", "UICorner", env);
		const corner = findHelper(node, "ToilCorner");
		if (corner !== undefined) {
			const r = env.newUDim(0, radius.offset);
			(corner as Record<string, unknown>)["CornerRadius"] = r;
		}
	}

	// --- Padding (UIPadding child) ---
	const padT = parseLength(style["padding-top"]);
	const padL = parseLength(style["padding-left"]);
	const padR = parseLength(style["padding-right"]);
	const padB = parseLength(style["padding-bottom"]);
	if (
		(padT !== undefined && padT.offset > 0) ||
		(padL !== undefined && padL.offset > 0) ||
		(padR !== undefined && padR.offset > 0) ||
		(padB !== undefined && padB.offset > 0)
	) {
		ensureHelperChild(node, "ToilPadding", "UIPadding", env);
		const pad = findHelper(node, "ToilPadding");
		if (pad !== undefined) {
			const p: Record<string, unknown> = pad as Record<string, unknown>;
			if (padT !== undefined) p["PaddingTop"] = env.newUDim(padT.scale, padT.offset);
			if (padL !== undefined) p["PaddingLeft"] = env.newUDim(padL.scale, padL.offset);
			if (padR !== undefined) p["PaddingRight"] = env.newUDim(padR.scale, padR.offset);
			if (padB !== undefined) p["PaddingBottom"] = env.newUDim(padB.scale, padB.offset);
		}
	}

	// --- Flex layout (UIListLayout child) ---
	const display = style["display"] ?? "";
	if (display === "flex" || display === "inline-flex") {
		const dir = style["flex-direction"] ?? "row";
		const isColumn = dir === "column" || dir === "column-reverse";
		ensureHelperChild(node, "ToilLayout", "UIListLayout", env);
		const layout = findHelper(node, "ToilLayout");
		if (layout !== undefined) {
			const l: Record<string, unknown> = layout as Record<string, unknown>;
			l["FillDirection"] = env.enumValue(
				isColumn ? "FillDirection.Vertical" : "FillDirection.Horizontal"
			);
			// gap
			const gap = parseLength(style["gap"]);
			if (gap !== undefined && gap.offset > 0) {
				l["Padding"] = env.newUDim(gap.scale, gap.offset);
			}
			// justify-content
			const jc = style["justify-content"] ?? "";
			if (jc === "center") {
				l["HorizontalAlignment"] = env.enumValue("HorizontalAlignment.Center");
				l["VerticalAlignment"] = env.enumValue("VerticalAlignment.Center");
			} else if (jc === "flex-end" || jc === "end") {
				l["HorizontalAlignment"] = env.enumValue("HorizontalAlignment.Right");
				l["VerticalAlignment"] = env.enumValue("VerticalAlignment.Bottom");
			} else if (jc === "flex-start" || jc === "start") {
				l["HorizontalAlignment"] = env.enumValue("HorizontalAlignment.Left");
				l["VerticalAlignment"] = env.enumValue("VerticalAlignment.Top");
			}
		}
	}

	// --- Text color ---
	const textColor = parseColor(style["color"]);
	if (textColor !== undefined) {
		(inst as Record<string, unknown>)["TextColor3"] = env.newColor3(
			textColor.r,
			textColor.g,
			textColor.b
		);
	}

	// --- Font size ---
	const fontSize = parseLength(style["font-size"]);
	if (fontSize !== undefined && fontSize.offset > 0) {
		(inst as Record<string, unknown>)["TextSize"] = _round(fontSize.offset);
	}

	// --- Font family (map to Enum.Font) ---
	const fontFamily = style["font-family"] ?? "";
	if (fontFamily.size() > 0) {
		const fontEnum = mapFontFamily(fontFamily, env);
		if (fontEnum !== undefined) {
			(inst as Record<string, unknown>)["Font"] = fontEnum;
		}
	}

	// --- Font weight ---
	const fontWeight = style["font-weight"] ?? "";
	if (fontWeight === "bold" || (fontWeight.size() >= 2 && _parseInt(fontWeight) >= 600)) {
		(inst as Record<string, unknown>)["Font"] = env.enumValue("Font.GothamBold");
	}

	// --- Text alignment ---
	const textAlign = style["text-align"] ?? "";
	if (textAlign === "center") {
		(inst as Record<string, unknown>)["TextXAlignment"] = env.enumValue(
			"TextXAlignment.Center"
		);
	} else if (textAlign === "right") {
		(inst as Record<string, unknown>)["TextXAlignment"] = env.enumValue(
			"TextXAlignment.Right"
		);
	} else if (textAlign === "left") {
		(inst as Record<string, unknown>)["TextXAlignment"] = env.enumValue(
			"TextXAlignment.Left"
		);
	}

	// --- Opacity ---
	const opacity = _parseFloat(style["opacity"] ?? "1");
	if (!_isNaN(opacity) && opacity < 1) {
		const trans = 1 - opacity;
		(inst as Record<string, unknown>)["BackgroundTransparency"] = trans;
		(inst as Record<string, unknown>)["TextTransparency"] = trans;
	}

	// --- Visibility / display ---
	const vis = style["visibility"] ?? "";
	const disp = style["display"] ?? "";
	if (vis === "hidden" || disp === "none") {
		(inst as Record<string, unknown>)["Visible"] = false;
	} else {
		(inst as Record<string, unknown>)["Visible"] = true;
	}

	// --- Overflow ---
	const overflow = style["overflow"] ?? "";
	if (overflow === "hidden" || overflow === "scroll") {
		(inst as Record<string, unknown>)["ClipsDescendants"] = true;
	}

	// --- Z-index ---
	const zIndexStr = style["z-index"] ?? "";
	if (zIndexStr.size() > 0) {
		const z = _parseInt(zIndexStr);
		if (!_isNaN(z)) {
			(inst as Record<string, unknown>)["ZIndex"] = z;
		}
	}

	// --- Rotation (from transform or direct) ---
	const rotation = parseRotation(style);
	if (rotation !== undefined) {
		(inst as Record<string, unknown>)["Rotation"] = rotation;
	}

	// --- Box shadow (approximated via UIStroke child) ---
	const boxShadow = style["box-shadow"] ?? "";
	if (boxShadow.size() > 0 && boxShadow !== "none") {
		ensureHelperChild(node, "ToilShadow", "UIStroke", env);
		const shadow = findHelper(node, "ToilShadow");
		if (shadow !== undefined) {
			const s: Record<string, unknown> = shadow as Record<string, unknown>;
			const shadowColor = parseColor(firstColor(boxShadow));
			if (shadowColor !== undefined) {
				s["Color"] = env.newColor3(shadowColor.r, shadowColor.g, shadowColor.b);
				s["Transparency"] = 1 - shadowColor.a;
			}
			const blur = parseLength(firstLength(boxShadow));
			if (blur !== undefined && blur.offset > 0) {
				s["Thickness"] = _round(blur.offset);
			}
			s["ApplyStrokeMode"] = env.enumValue("StrokeMode.Inset");
		}
	}

	// --- Gap (row-gap / column-gap) for UIListLayout ---
	const display2 = style["display"] ?? "";
	if (display2 === "flex" || display2 === "inline-flex") {
		const layout = findHelper(node, "ToilLayout");
		if (layout !== undefined) {
			const l: Record<string, unknown> = layout as Record<string, unknown>;
			const dir = style["flex-direction"] ?? "row";
			const isColumn = dir === "column" || dir === "column-reverse";
			const gap = parseLength(style["gap"]);
			const rowGap = parseLength(style["row-gap"]);
			const columnGap = parseLength(style["column-gap"]);
			if (isColumn) {
			const eff = rowGap ?? gap;
			if (eff !== undefined && eff.offset > 0) {
            l["Padding"] = env.newUDim(eff.scale, eff.offset);
			}
			} else {
			const eff = columnGap ?? gap;
			if (eff !== undefined && eff.offset > 0) {
            l["Padding"] = env.newUDim(eff.scale, eff.offset);
			}
			}
		}
	}

	// --- Align-items for UIListLayout ---
	const alignItems = style["align-items"] ?? "";
	if (alignItems.size() > 0) {
		const layout = findHelper(node, "ToilLayout");
		if (layout !== undefined) {
			const l: Record<string, unknown> = layout as Record<string, unknown>;
			const dir = style["flex-direction"] ?? "row";
			const isColumn = dir === "column" || dir === "column-reverse";
			if (isColumn) {
			if (alignItems === "center") {
            l["HorizontalAlignment"] = env.enumValue("HorizontalAlignment.Center");
			} else if (alignItems === "flex-end" || alignItems === "end") {
            l["HorizontalAlignment"] = env.enumValue("HorizontalAlignment.Right");
			} else if (alignItems === "flex-start" || alignItems === "start" || alignItems === "stretch") {
            l["HorizontalAlignment"] = env.enumValue("HorizontalAlignment.Left");
			}
			} else {
			if (alignItems === "center") {
            l["VerticalAlignment"] = env.enumValue("VerticalAlignment.Center");
			} else if (alignItems === "flex-end" || alignItems === "end") {
            l["VerticalAlignment"] = env.enumValue("VerticalAlignment.Bottom");
			} else if (alignItems === "flex-start" || alignItems === "start" || alignItems === "stretch") {
            l["VerticalAlignment"] = env.enumValue("VerticalAlignment.Top");
			}
			}
		}
	}

	// --- Letter-spacing (approximated, stored as a custom attribute) ---
	const letterSpacing = style["letter-spacing"] ?? "";
	if (letterSpacing.size() > 0) {
		(inst as Record<string, unknown>)["LetterSpacing"] = letterSpacing;
	}
}

function mapFontFamily(
	family: string,
	env: HostEnv
): unknown {
	const lower = string.lower(strTrim(family));
	if (lower === "sans-serif" || lower === "arial" || lower === "roboto" || lower === "verdana") {
		return env.enumValue("Font.Gotham");
	}
	if (lower === "serif" || lower === "georgia" || lower === "times new roman") {
		return env.enumValue("Font.Antique");
	}
	if (lower === "monospace" || lower === "courier new" || lower === "monaco") {
		return env.enumValue("Font.Code");
	}
	if (lower === "cursive" || lower === "comic sans ms") {
		return env.enumValue("Font.IndieFlower");
	}
	return undefined;
}

function parseRotation(style: Record<string, string>): number | undefined {
	// Check for a "transform" with rotate()
	const transform = style["transform"] ?? "";
	if (transform.size() > 0) {
		const m = (string.match(transform, "rotate%((%-(%d+%.*)deg)%)") as unknown) as string | undefined;
		if (m !== undefined) {
			return _parseFloat(m);
		}
	}
	// Direct rotation property
	const rot = style["rotation"] ?? "";
	if (rot.size() > 0) {
		const n = _parseFloat(rot);
		if (!_isNaN(n)) return n;
	}
	return undefined;
}

function ensureHelperChild(
	node: HostNode,
	name: string,
	className: RobloxClassName,
	env: HostEnv
): void {
	const existing = findHelper(node, name);
	if (existing === undefined) {
		const helper = env.newInstance(className);
		(helper as Record<string, unknown>)["Name"] = name;
		(helper as Record<string, unknown>)["Parent"] = node.inst;
		// Track in styleState
		if (node.styleState[name] === undefined) {
			node.styleState[name] = helper;
		}
	}
}

function findHelper(node: HostNode, name: string): RobloxInstance | undefined {
	const cached = node.styleState[name];
	if (cached !== undefined) {
		return cached as RobloxInstance;
	}
	return undefined;
}

// --- child tree helpers.
// Declared before buildHostConfig so hoisting is not load-bearing: the
// mutation callbacks below capture them in closures at factory time.

function detachChild(child: HostNode): void {
	const parent = child.parent;
	if (parent === undefined) return;
	const idx = parent.children.indexOf(child);
	if (idx >= 0) {
		parent.children.remove(idx);
	}
	child.parent = undefined;
	if (child.inst !== undefined) {
		(child.inst as Record<string, unknown>)["Parent"] = undefined;
	}
}

function insertChild(parent: HostNode, child: HostNode, before: HostNode | undefined): void {
	detachChild(child);
	let idx: number;
	if (before === undefined) {
		idx = parent.children.size();
	} else {
		const bi = parent.children.indexOf(before);
		idx = bi >= 0 ? bi : parent.children.size();
	}
	parent.children.insert(idx, child);
	child.parent = parent;
	if (child.inst !== undefined && parent.inst !== undefined) {
		(child.inst as Record<string, unknown>)["Parent"] = parent.inst;
		child.layoutOrder = idx;
		(child.inst as Record<string, unknown>)["LayoutOrder"] = idx;
	}
}

// ------------------------------------------------------------------ hostConfig factory

/**
 * Build the react-reconciler hostConfig for the Roblox GUI host.
 * `env` is the Roblox API adapter; `resolver` computes styles from the engine.
 */
export function buildHostConfig(
	env: HostEnv,
	resolver: StyleResolver
): ReactReconciler.HostConfig<
	string,
	Record<string, unknown>,
	HostNode,
	HostNode,
	HostNode, /* TextInstance */
	HostNode,
	HostNode,
	HostNode, /* FormInstance */
	HostNode, /* PublicInstance */
	unknown, /* HostContext */
	unknown, /* ChildSet */
	number, /* TimeoutHandle */
	number, /* NoTimeout */
	number /* TransitionStatus */
> {
	// --- Transition context (self-referential stub, same as spike) ---
	const transitionContext: ReactReconciler.ReactContext<number> = {
		$$typeof: 0,
		Consumer: undefined as unknown as ReactReconciler.ReactContext<number>,
		Provider: {
			$$typeof: 0,
			_context: undefined as unknown as ReactReconciler.ReactContext<number>,
		},
		_currentValue: 0,
		_currentValue2: 0,
		_threadCount: 0,
	};
	transitionContext.Consumer = transitionContext;
	(transitionContext.Provider as Record<string, unknown>)["_context"] = transitionContext;

	function createInstance(nodeType: string): HostNode {
		const className = TAG_TO_CLASS[nodeType] ?? "Frame";
		const inst = env.newInstance(className);
		(inst as Record<string, unknown>)["Name"] = tagNameToInstanceName(nodeType);
		return {
			kind: "host",
			nodeType,
			inst,
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
				tagName: nodeType,
				classList: [],
				attributes: {},
				states: [],
			},
		};
	}

	function updateIdentity(instance: HostNode, props: Record<string, unknown>): void {
		instance.pendingProps = props;
		instance.identity = identityFromProps(instance, props);
	}

	function createTextInstance(text: string): HostNode {
		return {
			kind: "text",
			nodeType: "#text",
			inst: undefined,
			text,
			computed: {},
			classId: "",
			classes: "",
			pendingProps: {},
			parent: undefined,
			children: [],
			layoutOrder: 0,
			styleState: {},
			identity: {
				tagName: "#text",
				classList: [],
				attributes: {},
				states: [],
			},
		};
	}

	function appendInitialChild(parent: HostNode, child: HostNode): void {
		insertChild(parent, child, undefined);
	}

	function appendChild(parent: HostNode, child: HostNode): void {
		insertChild(parent, child, undefined);
	}

	function insertBefore(parent: HostNode, child: HostNode, before: HostNode): void {
		insertChild(parent, child, before);
	}

	function appendChildToContainer(container: HostNode, child: HostNode): void {
		insertChild(container, child, undefined);
	}

	function insertInContainerBefore(container: HostNode, child: HostNode, before: HostNode): void {
		insertChild(container, child, before);
	}

	function removeChild(_parent: HostNode, child: HostNode): void {
		detachChild(child);
	}

	function removeChildFromContainer(_container: HostNode, child: HostNode): void {
		detachChild(child);
	}

	function finalizeInitialChildren(instance: HostNode, _type: string, props: Record<string, unknown>): boolean {
		updateIdentity(instance, props);
		// Compute and apply style now
		const computed = resolver.resolve(instance);
		applyStyle(instance, computed, env);
		return true; // so commitMount is called
	}

	function commitMount(instance: HostNode, _type: string, _props: Record<string, unknown>): void {
		// Style already applied in finalizeInitialChildren
	}

	function commitUpdate(instance: HostNode, _type: string, _prevProps: Record<string, unknown>, nextProps: Record<string, unknown>): void {
		updateIdentity(instance, nextProps);
		const computed = resolver.resolve(instance);
		applyStyle(instance, computed, env);
	}

	function commitTextUpdate(textInstance: HostNode, _oldText: string, newText: string): void {
		textInstance.text = newText;
		if (textInstance.inst !== undefined) {
			(textInstance.inst as Record<string, unknown>)["Text"] = newText;
		}
	}

	function resetTextContent(instance: HostNode): void {
		instance.text = "";
	}

	function shouldSetTextContent(nodeType: string, _props: Record<string, unknown>): boolean {
		return nodeType === "#text";
	}

	function getRootHostContext(_container: HostNode): unknown {
		return {};
	}

	function getChildHostContext(parentContext: unknown, _type: string, _instance: HostNode): unknown {
		return parentContext;
	}

	function getPublicInstance(instance: HostNode): HostNode {
		return instance;
	}

	function prepareForCommit(_container: HostNode): unknown {
		return undefined;
	}

	function resetAfterCommit(_container: HostNode, _newRootHostContext: unknown, _finishedWork: HostNode): void {}

	function preparePortalMount(_portalContainerNode: unknown): void {}

	function scheduleTimeout(fn: (delay?: number) => void, delay?: number): number {
		fn(delay);
		return 0;
	}

	function cancelTimeout(_handle: number): void {}

	function getInstanceFromNode(_node: unknown): HostNode | undefined {
		return undefined;
	}

	function beforeActiveInstanceBlur(): void {}

	function afterActiveInstanceBlur(): void {}

	function prepareScopeUpdate(_scopeInstance: unknown, _instance: HostNode): void {}

	function getInstanceFromScope(_scopeInstance: unknown): HostNode | undefined {
		return undefined;
	}

	function detachDeletedInstance(_node: HostNode): void {}

	function hideInstance(instance: HostNode): void {
		if (instance.inst !== undefined) {
			(instance.inst as Record<string, unknown>)["Visible"] = false;
		}
	}

	function unhideInstance(instance: HostNode): void {
		if (instance.inst !== undefined) {
			(instance.inst as Record<string, unknown>)["Visible"] = true;
		}
	}

	function clearContainer(container: HostNode): void {
		for (let i = container.children.size() - 1; i >= 0; i--) {
			detachChild(container.children[i]);
		}
	}

	function resetFormInstance(_form: HostNode): void {}

	function requestPostPaintCallback(_callback: (time: number) => void): void {}

	function shouldAttemptEagerTransition(): boolean {
		return false;
	}

	function trackSchedulerEvent(_event: unknown, _time: number): void {}

	function resolveEventType(_event: unknown): string | undefined {
		return undefined;
	}

	function resolveEventTimeStamp(_event: unknown, _eventType: unknown): number {
		return 0;
	}

	function setCurrentUpdatePriority(_newPriority: number): void {}

	function getCurrentUpdatePriority(): number {
		return 1;
	}

	function resolveUpdatePriority(): number {
		return 1;
	}

	function maySuspendCommit(_type: string, _props: Record<string, unknown>): boolean {
		return false;
	}

	function preloadInstance(_instance: unknown, _type: string, _props: Record<string, unknown>): boolean {
		return false;
	}

	function startSuspendingCommit(): void {}

	function suspendInstance(_instance: HostNode, _priority: number): void {}

	function waitForCommitToBeReady(): unknown {
		return undefined;
	}

	return {
		// --- modes ---
		supportsMutation: true,
		supportsPersistence: false,
		supportsHydration: false,
		isPrimaryRenderer: true,

		// --- core ---
		createInstance,
		createTextInstance,
		appendInitialChild,
		finalizeInitialChildren,
		shouldSetTextContent,
		getRootHostContext,
		getChildHostContext,
		getPublicInstance,
		prepareForCommit,
		resetAfterCommit,
		preparePortalMount,
		scheduleTimeout,
		cancelTimeout,
		noTimeout: -1,

		// --- refs / scopes ---
		getInstanceFromNode,
		beforeActiveInstanceBlur,
		afterActiveInstanceBlur,
		prepareScopeUpdate,
		getInstanceFromScope,
		detachDeletedInstance,

		// --- mutation ---
		appendChild,
		appendChildToContainer,
		insertBefore,
		insertInContainerBefore,
		removeChild,
		removeChildFromContainer,
		resetTextContent,
		commitTextUpdate,
		commitMount,
		commitUpdate,
		hideInstance,
		unhideInstance,
		clearContainer,

		// --- transitions / update priority / forms ---
		NotPendingTransition: undefined,
		HostTransitionContext: transitionContext,
		setCurrentUpdatePriority,
		getCurrentUpdatePriority,
		resolveUpdatePriority,
		resetFormInstance,
		requestPostPaintCallback,
		shouldAttemptEagerTransition,
		trackSchedulerEvent,
		resolveEventType,
		resolveEventTimeStamp,

		// --- suspense-commit ---
		maySuspendCommit,
		preloadInstance,
		startSuspendingCommit,
		suspendInstance,
		waitForCommitToBeReady,
	};
}

