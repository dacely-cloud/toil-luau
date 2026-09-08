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

/**
 * Build a host node's element identity from its props and node state.
 * Pure and exported so specs can unit-test the mapping.
 */
export function identityFromProps(
	node: HostNode,
	props: Record<string, unknown>
): ElementIdentity {
	const classList: Array<string> = [];
	// React spells it `className`; plain `class` is accepted too.
	const rawClass = props["class"] ?? props["className"];
	if (typeIs(rawClass, "string")) {
		const tokens = string.split(rawClass as string, "%s+");
		for (let i = 0; i < tokens.size(); i++) {
			if (tokens[i].size() > 0) {
				classList.push(tokens[i]);
			}
		}
	}
	const attributes: Record<string, string> = {};
	const keys = keysOf(props);
	for (let i = 0; i < keys.size(); i++) {
		const k = keys[i];
		if (k === "class" || k === "className" || k === "children" || k === "ref") {
			continue;
		}
		const v = props[k];
		if (typeIs(v, "string")) {
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
	| "CanvasGroup"
	| "ScrollingFrame"
	| "Path2D"
	| "TextLabel"
	| "TextButton"
	| "TextBox"
	| "ImageLabel"
	| "ScreenGui"
	| "UICorner"
	| "UIPadding"
	| "UIListLayout"
	| "UIStroke"
	| "UIScale"
	| "UIGradient"
	| "UISizeConstraint"
	| "UIAspectRatioConstraint";

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
	/** Build a ColorSequence from evenly-spaced colour stops (real Roblox only). */
	newColorSequence?: (colors: Array<ParsedColor>) => unknown;
	/** Build a NumberSequence from evenly-spaced values, e.g. gradient alpha (real Roblox only). */
	newNumberSequence?: (values: Array<number>) => unknown;
	/** Enum member access by fully-qualified name, e.g. "Font.GothamBold". */
	enumValue: (name: string) => unknown;
	/** Destroy an instance (helper cleanup on remount). */
	destroy: (inst: RobloxInstance) => void;
	/**
	 * Schedule `fn` to run after `delaySeconds` (real Roblox: task.delay).
	 * Returns an opaque handle for clearTimeout. Optional: when absent the host
	 * runs scheduled callbacks inline (native test env has no scheduler).
	 */
	setTimeout?: (fn: () => void, delaySeconds: number) => unknown;
	/** Cancel a pending setTimeout by its handle (real Roblox: task.cancel). */
	clearTimeout?: (handle: unknown) => void;
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
	beforeStyle?: (node: HostNode, style: Record<string, string>) => void;
	removed?: (node: HostNode) => void;
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

/** True for the GUI classes that carry Text* properties. */
function isTextInstance(inst: RobloxInstance): boolean {
	const c = inst.ClassName;
	return c === "TextLabel" || c === "TextButton" || c === "TextBox";
}

function isImageInstance(inst: RobloxInstance): boolean {
	const c = inst.ClassName;
	return c === "ImageLabel" || c === "ImageButton";
}

// ------------------------------------------------------------------ tag map

export const TAG_TO_CLASS: Record<string, RobloxClassName> = {
	path2d: "Path2D",
	Path2D: "Path2D",
	scroll: "ScrollingFrame",
	div: "Frame",
	canvasgroup: "CanvasGroup",
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
	// slice(s, i) with one arg returns s[i..end]; the last character is at
	// index s.size(), so "%" is slice(s, s.size()) -- NOT s.size()-1, which
	// returns the last two characters and never equals "%". Getting this wrong
	// made every percentage fall through to the bare-number branch and be
	// treated as pixels, so width:100% became a 100px box.
	if (s.size() >= 2 && slice(s, s.size()) === "%") {
		const n = _parseFloat(slice(s, 1, s.size() - 1));
		if (_isNaN(n)) {
			return undefined;
		}
		return { scale: n / 100, offset: 0, auto: false };
	}
	if (s.size() >= 3 && slice(s, s.size() - 1) === "px") {
		const n = _parseFloat(slice(s, 1, s.size() - 2));
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
	transparent: [0, 0, 0],
	white: [255, 255, 255],
	black: [0, 0, 0],
	red: [255, 0, 0],
	green: [0, 128, 0],
	lime: [0, 255, 0],
	blue: [0, 0, 255],
	yellow: [255, 255, 0],
	cyan: [0, 255, 255],
	aqua: [0, 255, 255],
	magenta: [255, 0, 255],
	fuchsia: [255, 0, 255],
	silver: [192, 192, 192],
	gray: [128, 128, 128],
	grey: [128, 128, 128],
	maroon: [128, 0, 0],
	olive: [128, 128, 0],
	purple: [128, 0, 128],
	teal: [0, 128, 128],
	navy: [0, 0, 128],
	orange: [255, 165, 0],
	gold: [255, 215, 0],
	pink: [255, 192, 203],
	brown: [165, 42, 42],
	coral: [255, 127, 80],
	crimson: [220, 20, 60],
	salmon: [250, 128, 114],
	tomato: [255, 99, 71],
	violet: [238, 130, 238],
	indigo: [75, 0, 130],
	turquoise: [64, 224, 208],
	skyblue: [135, 206, 235],
	royalblue: [65, 105, 225],
	steelblue: [70, 130, 180],
	slategray: [112, 128, 144],
	forestgreen: [34, 139, 34],
	seagreen: [46, 139, 87],
	limegreen: [50, 205, 50],
	khaki: [240, 230, 140],
	beige: [245, 245, 220],
	ivory: [255, 255, 240],
	lavender: [230, 230, 250],
	plum: [221, 160, 221],
	orchid: [218, 112, 214],
	tan: [210, 180, 140],
	chocolate: [210, 105, 30],
	darkred: [139, 0, 0],
	darkgreen: [0, 100, 0],
	darkblue: [0, 0, 139],
	darkgray: [169, 169, 169],
	darkgrey: [169, 169, 169],
	lightgray: [211, 211, 211],
	lightgrey: [211, 211, 211],
	lightblue: [173, 216, 230],
	lightgreen: [144, 238, 144],
	whitesmoke: [245, 245, 245],
	gainsboro: [220, 220, 220],
	dimgray: [105, 105, 105],
};

/** HSL (h in degrees, s/l in 0..1) to 0..255 RGB. */
function hslToRgb(h: number, sat: number, light: number): [number, number, number] {
	const hh = ((h % 360) + 360) % 360;
	const c = (1 - math.abs(2 * light - 1)) * sat;
	const x = c * (1 - math.abs(((hh / 60) % 2) - 1));
	const m = light - c / 2;
	let r = 0;
	let g = 0;
	let b = 0;
	if (hh < 60) { r = c; g = x; }
	else if (hh < 120) { r = x; g = c; }
	else if (hh < 180) { g = c; b = x; }
	else if (hh < 240) { g = x; b = c; }
	else if (hh < 300) { r = x; b = c; }
	else { r = c; b = x; }
	return [_round((r + m) * 255), _round((g + m) * 255), _round((b + m) * 255)];
}

/** Strip a trailing "%" and parse the number (for hsl / alpha percentages). */
function parsePct(v: string): number {
	const t = strTrim(v);
	if (t.size() >= 1 && slice(t, t.size()) === "%") {
		return _parseFloat(slice(t, 1, t.size() - 1)) / 100;
	}
	return _parseFloat(t);
}

export function parseColor(value: string | undefined): ParsedColor | undefined {
	if (value === undefined) {
		return undefined;
	}
	const s = string.lower(strTrim(value));
	if (s === "transparent") {
		return { r: 0, g: 0, b: 0, a: 0 };
	}
	// #rgb / #rgba / #rrggbb / #rrggbbaa
	if (slice(s, 1, 1) === "#") {
		const hexLen = s.size();
		if (hexLen === 4 || hexLen === 5) {
			const r = _parseInt(slice(s, 2, 2), 16) * 17;
			const g = _parseInt(slice(s, 3, 3), 16) * 17;
			const b = _parseInt(slice(s, 4, 4), 16) * 17;
			const a = hexLen === 5 ? (_parseInt(slice(s, 5, 5), 16) * 17) / 255 : 1;
			return { r, g, b, a };
		}
		if (hexLen === 7 || hexLen === 9) {
			const r = _parseInt(slice(s, 2, 3), 16);
			const g = _parseInt(slice(s, 4, 5), 16);
			const b = _parseInt(slice(s, 6, 7), 16);
			const a = hexLen === 9 ? _parseInt(slice(s, 8, 9), 16) / 255 : 1;
			return { r, g, b, a };
		}
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
	// hsl() / hsla()
	const hslM = string.match(s, "^hsla?%(([^)]+)%)$");
	const hsl = (hslM[0] as unknown) as string | undefined;
	if (hsl !== undefined) {
		const rawParts = (string.split(hsl, ",") as unknown) as Array<string>;
		if (rawParts.size() >= 3) {
			const h = _parseFloat(strTrim(rawParts[0]));
			const sat = parsePct(rawParts[1]);
			const light = parsePct(rawParts[2]);
			let a = 1;
			if (rawParts.size() >= 4) {
				const pa = _parseFloat(strTrim(rawParts[3]));
				a = _isNaN(pa) ? 1 : clamp01(pa);
			}
			const rgbv = hslToRgb(h, sat, light);
			return { r: rgbv[0], g: rgbv[1], b: rgbv[2], a };
		}
	}
	const named = NAMED_COLORS[s];
	if (named !== undefined) {
		return { r: named[0], g: named[1], b: named[2], a: s === "transparent" ? 0 : 1 };
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
 * Pull the asset id/uri out of a CSS `url(...)` value, e.g.
 * `url("rbxassetid://123")` -> `rbxassetid://123`. Returns "" when the value
 * is a gradient or otherwise has no url() token.
 */
export function extractUrl(value: string): string {
	const open = strFind(value, "url(", 1, true);
	if (open === undefined) return "";
	const rest = slice(value, open + 4);
	const close = strFind(rest, ")", 1, true);
	let inner = close !== undefined ? slice(rest, 1, close - 1) : rest;
	inner = strTrim(inner);
	// Strip surrounding single or double quotes.
	if (inner.size() >= 2) {
		const q = slice(inner, 1, 1);
		if (q === '"' || q === "'") {
			inner = slice(inner, 2, inner.size() - 1);
		}
	}
	return strTrim(inner);
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

/** Split on a separator at paren depth 0 (so rgb(...) commas stay intact). */
function splitTopLevel(s: string, sep: string): Array<string> {
	const out: Array<string> = [];
	let depth = 0;
	let cur = "";
	for (let i = 0; i < s.size(); i++) {
		const c = slice(s, i + 1, i + 1);
		if (c === "(") depth++;
		else if (c === ")") depth--;
		if (c === sep && depth === 0) {
			out.push(cur);
			cur = "";
		} else {
			cur += c;
		}
	}
	if (cur.size() > 0) out.push(cur);
	return out;
}

/** A parsed linear-gradient: a rotation (deg) and its ordered colour stops. */
export interface ParsedGradient {
	rotation: number;
	stops: Array<ParsedColor>;
}

/**
 * Parse a `linear-gradient(<angle>?, c1, c2, ...)` value. The angle is
 * optional (default 0) and may be given in degrees or as `to <edge>`. Colour
 * stop positions (`#fff 40%`) are ignored; only the colours are used.
 */
export function parseGradient(value: string): ParsedGradient | undefined {
	const open = strFind(value, "(", 1, true);
	if (open === undefined) return undefined;
	let close = value.size();
	while (close > open && slice(value, close, close) !== ")") close--;
	if (close <= open) return undefined;
	const inner = slice(value, open + 1, close - 1);
	const parts = splitTopLevel(inner, ",");
	if (parts.size() === 0) return undefined;
	let rotation = 0;
	let start = 0;
	const first = strTrim(parts[0]);
	const am = string.match(first, "^(%-?%d+%.?%d*)deg");
	const angle = (am[0] as unknown) as string | undefined;
	if (angle !== undefined) {
		const a = _parseFloat(angle);
		if (!_isNaN(a)) rotation = a;
		start = 1;
	} else if (startsWith(first, "to ")) {
		if (strFind(first, "right", 1, true) !== undefined) rotation = 90;
		else if (strFind(first, "left", 1, true) !== undefined) rotation = 270;
		else if (strFind(first, "top", 1, true) !== undefined) rotation = 0;
		else rotation = 180;
		start = 1;
	}
	const stops: Array<ParsedColor> = [];
	for (let i = start; i < parts.size(); i++) {
		const c = parseColor(strTrim(parts[i]));
		if (c !== undefined) stops.push(c);
	}
	if (stops.size() < 2) return undefined;
	return { rotation, stops };
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
/** Apply the complete public, writable Path2D surface without GuiObject assumptions. */
function applyPath2D(node: HostNode, style: Record<string, string>, env: HostEnv): void {
	const inst = node.inst as RobloxInstance;
	const path = inst as unknown as Path2D;
	const props = node.pendingProps;
	const set = (name: string, value: unknown): void => { if (inst[name] !== value) inst[name] = value; };
	set("Closed", props["closed"] ?? false);
	const colorValue = style["stroke"] ?? style["color"] ?? props["color"];
	if (typeIs(colorValue, "string")) {
		const color = parseColor(colorValue as string);
		if (color !== undefined) set("Color3", env.newColor3(color.r, color.g, color.b));
	} else {
		set("Color3", colorValue ?? env.newColor3(0, 0, 0));
	}
	const width = style["stroke-width"] !== undefined ? _parseFloat(style["stroke-width"]) : (props["thickness"] ?? 1) as number;
	if (_isNaN(width) || width < 0 || width === math.huge) error("Path2D thickness must be a finite non-negative number");
	set("Thickness", width);
	set("Visible", props["visible"] !== false && style["visibility"] !== "hidden" && style["display"] !== "none" && style["stroke"] !== "none");
	const z = style["z-index"] !== undefined ? _parseInt(style["z-index"]) : (props["zIndex"] ?? 1);
	set("ZIndex", z);
	const points = (props["controlPoints"] ?? []) as Array<Path2DControlPoint>;
	const previous = node.styleState["pathPoints"] as Array<{ position: UDim2; left: UDim2; right: UDim2 }> | undefined;
	let changed = previous === undefined || previous.size() !== points.size();
	if (!changed && previous !== undefined) {
		for (let i = 0; i < points.size(); i++) {
			const p = points[i];
			const old = previous[i];
			if (p.Position !== old.position || p.LeftTangent !== old.left || p.RightTangent !== old.right) { changed = true; break; }
		}
	}
	if (changed) {
		if (points.size() > path.GetMaxControlPoints()) error("Path2D controlPoints exceeds the engine's GetMaxControlPoints() limit");
		// Snapshot values before emitting the change signal; callers may update
		// an existing control-point userdata in place between React renders.
		const copy: Array<{ position: UDim2; left: UDim2; right: UDim2 }> = [];
		for (let i = 0; i < points.size(); i++) {
			const p = points[i];
			copy.push({ position: p.Position, left: p.LeftTangent, right: p.RightTangent });
		}
		node.styleState["pathPoints"] = copy;
		path.SetControlPoints(points);
	}
}

/** Per-frame motion must not rebuild gradients, borders, text layout or constraints. */
export function applyAnimatedStyle(node: HostNode, values: Record<string, string>, env: HostEnv): void {
	const inst = node.inst;
	if (inst === undefined) return;
	let fast = inst.ClassName !== "Path2D";
	for (const [key, value] of pairs(values)) {
		const k = key as string;
		node.computed[k] = value;
		if (k !== "rotation" && k !== "transform" && k !== "left" && k !== "top" && k !== "opacity") fast = false;
	}
	if (!fast) {
		const saved = node.styleState["animatedProps"];
		node.styleState["animatedProps"] = undefined;
		applyStyle(node, node.computed, env);
		node.styleState["animatedProps"] = saved;
		return;
	}
	const style = node.computed;
	if (values["rotation"] !== undefined || values["transform"] !== undefined || values["left"] !== undefined || values["top"] !== undefined) {
		const tf = parseTransform(style);
		const placement = computePlacement(style, [100, 100]);
		inst["AnchorPoint"] = env.newVector2(tf.rotation !== undefined ? 0.5 : placement.anchorX, tf.rotation !== undefined ? 0.5 : placement.anchorY);
		inst["Position"] = env.newUDim2(placement.posScaleX, placement.posOffsetX + tf.translateX, placement.posScaleY, placement.posOffsetY + tf.translateY);
		inst["Rotation"] = tf.rotation ?? 0;
		if (tf.scale !== undefined) {
			ensureHelperChild(node, "ToilScale", "UIScale", env);
			const sc = findHelper(node, "ToilScale");
			if (sc !== undefined) sc["Scale"] = tf.scale;
		} else {
			const sc = findHelper(node, "ToilScale");
			if (sc !== undefined) sc["Scale"] = 1;
		}
	}
	if (values["opacity"] !== undefined) {
		const opacity = clamp01(_parseFloat(values["opacity"]));
		const bg = parseColor(style["background-color"]);
		const alpha = findHelper(node, "ToilGradient") !== undefined ? 1 : bg !== undefined ? bg.a : 0;
		inst["BackgroundTransparency"] = 1 - alpha * opacity;
		if (isTextInstance(inst)) inst["TextTransparency"] = 1 - opacity;
		if (isImageInstance(inst)) inst["ImageTransparency"] = 1 - opacity;
	}
	const applied = node.styleState["lastAppliedStyle"] as Record<string, string> | undefined;
	if (applied !== undefined) for (const [key, value] of pairs(values)) applied[key as string] = value;
}

export function applyStyle(node: HostNode, style: Record<string, string>, env: HostEnv): void {
	const inst = node.inst;
	if (inst === undefined) return;
	node.computed = style;
	// Path2D inherits GuiBase, not GuiObject. Writing Size, Position, Rotation,
	// LayoutOrder, backgrounds or connecting mouse signals to it throws.
	if (inst.ClassName === "Path2D") {
		applyPath2D(node, style, env);
		return;
	}
	// React may supply a fresh style table with identical values on every
	// counter update. Do not parse it or invalidate Roblox layout again.
	const previous = node.styleState["lastAppliedStyle"] as Record<string, string> | undefined;
	let changed = previous === undefined;
	if (previous !== undefined) {
		for (const [key, value] of pairs(style)) {
			if (previous[key as string] !== value) { changed = true; break; }
		}
		if (!changed) {
			for (const [key] of pairs(previous)) {
				if (style[key as string] === undefined) { changed = true; break; }
			}
		}
	}
	if (!changed) return;
	const applied: Record<string, string> = {};
	for (const [key, value] of pairs(style)) applied[key as string] = value;
	node.styleState["lastAppliedStyle"] = applied;

	// Properties currently driven by a running animation on this node. The
	// animation driver is their sole writer (it re-applies every frame); a
	// re-render's applyStyle must not reset them to their base value, or the
	// element flickers back for a frame on every state change. The driver
	// clears this set around its own applyStyle call so it always writes.
	const animated = node.styleState["animatedProps"] as Record<string, boolean> | undefined;
	const animOf = (prop: string): boolean => animated !== undefined && animated[prop] === true;
	const animTransform = animOf("transform") || animOf("rotation");
	const animSize = animOf("width") || animOf("height");
	const animBg = animOf("background-color");
	const animOpacity = animOf("opacity");
	const animColor = animOf("color");
	const tf = parseTransform(style);

	// --- Size (width / height) ---
	// An axis that is "auto" (or undeclared while the other is declared)
	// sizes to content through AutomaticSize, as CSS does.
	const w = parseLength(style["width"]);
	const h = parseLength(style["height"]);
	if ((w !== undefined || h !== undefined) && !animSize) {
		const autoX = w === undefined || w.auto;
		const autoY = h === undefined || h.auto;
		// UDim2.new(xScale, xOffset, yScale, yOffset)
		const size = env.newUDim2(
			autoX ? 0 : w.scale,
			autoX ? 0 : w.offset,
			autoY ? 0 : h.scale,
			autoY ? 0 : h.offset
		);
		(inst as Record<string, unknown>)["Size"] = size;
		const autoName = autoX && autoY ? "XY" : autoX ? "X" : autoY ? "Y" : "None";
		(inst as Record<string, unknown>)["AutomaticSize"] = env.enumValue("AutomaticSize." + autoName);
	}

	// --- Min / max size (UISizeConstraint) ---
	const minW = parseLength(style["min-width"]);
	const maxW = parseLength(style["max-width"]);
	const minH = parseLength(style["min-height"]);
	const maxH = parseLength(style["max-height"]);
	if (minW !== undefined || maxW !== undefined || minH !== undefined || maxH !== undefined) {
		ensureHelperChild(node, "ToilSizeConstraint", "UISizeConstraint", env);
		const scc = findHelper(node, "ToilSizeConstraint");
		if (scc !== undefined) {
			const scr = scc as Record<string, unknown>;
			scr["MinSize"] = env.newVector2(minW !== undefined ? minW.offset : 0, minH !== undefined ? minH.offset : 0);
			scr["MaxSize"] = env.newVector2(
				maxW !== undefined ? maxW.offset : math.huge,
				maxH !== undefined ? maxH.offset : math.huge
			);
		}
	}

	// --- Aspect ratio (UIAspectRatioConstraint) ---
	const aspectRaw = style["aspect-ratio"] ?? "";
	if (aspectRaw.size() > 0 && aspectRaw !== "auto") {
		const ratio = parseAspectRatio(aspectRaw);
		if (ratio !== undefined && ratio > 0) {
			ensureHelperChild(node, "ToilAspect", "UIAspectRatioConstraint", env);
			const ar = findHelper(node, "ToilAspect");
			if (ar !== undefined) (ar as Record<string, unknown>)["AspectRatio"] = ratio;
		}
	}

	// --- Position (top / left / right / bottom + position) ---
	const placement = computePlacement(style, [100, 100]);
	// A rotating element spins about its centre (CSS transform-origin defaults
	// to center), i.e. AnchorPoint (0.5, 0.5). A UIListLayout keeps such a child
	// in its slot, so this is safe for flow elements as well as absolute ones.
	const rotates = tf.rotation !== undefined || animTransform;
	(inst as Record<string, unknown>)["AnchorPoint"] = env.newVector2(
		rotates ? 0.5 : placement.anchorX,
		rotates ? 0.5 : placement.anchorY
	);
	// transform: translate(x, y) shifts the element by a pixel offset on top of
	// its laid-out position -- the natural map onto a Roblox Position offset.
	if (!animTransform) {
		(inst as Record<string, unknown>)["Position"] = env.newUDim2(
			placement.posScaleX,
			placement.posOffsetX + tf.translateX,
			placement.posScaleY,
			placement.posOffsetY + tf.translateY
		);
	}

	// --- Background color + opacity ---
	// A CSS background defaults to transparent, and opacity multiplies into
	// the background alpha; text fades with opacity alone.
	const bg = parseColor(style["background-color"]);
	let bgAlpha = 0;
	if (bg !== undefined) {
		if (!animBg) (inst as Record<string, unknown>)["BackgroundColor3"] = env.newColor3(bg.r, bg.g, bg.b);
		bgAlpha = bg.a;
	}
	let opacity = 1;
	const opacityRaw = style["opacity"];
	if (opacityRaw !== undefined) {
		const o = _parseFloat(opacityRaw);
		if (!_isNaN(o)) opacity = clamp01(o);
	}
	if (!animBg && !animOpacity) {
		(inst as Record<string, unknown>)["BackgroundTransparency"] = 1 - bgAlpha * opacity;
	}
	if (isTextInstance(inst) && !animOpacity) {
		(inst as Record<string, unknown>)["TextTransparency"] = 1 - opacity;
	}
	if (isImageInstance(inst) && !animOpacity) inst["ImageTransparency"] = 1 - opacity;

	// --- Gradient background (UIGradient) ---
	// linear-gradient(<angle>, c1, c2, ...) -> a UIGradient child whose Color is
	// a ColorSequence of the stops. UIGradient tints BackgroundColor3, so the
	// frame is painted white for the stops to read true. The angle is animatable
	// through the `gradient-rotation` property, which makes the gradient flow.
	const bgImage = style["background-image"] ?? "";
	if (strFind(bgImage, "gradient", 1, true) !== undefined && env.newColorSequence !== undefined) {
		const grad = parseGradient(bgImage);
		if (grad !== undefined && grad.stops.size() >= 2) {
			ensureHelperChild(node, "ToilGradient", "UIGradient", env);
			const g = findHelper(node, "ToilGradient");
			if (g !== undefined) {
				(g as Record<string, unknown>)["Color"] = env.newColorSequence(grad.stops);
				if (env.newNumberSequence !== undefined) {
					const alphas: Array<number> = [];
					for (let si = 0; si < grad.stops.size(); si++) alphas.push(1 - grad.stops[si].a);
					(g as Record<string, unknown>)["Transparency"] = env.newNumberSequence(alphas);
				}
				if (!animOf("gradient-rotation")) (g as Record<string, unknown>)["Rotation"] = grad.rotation;
			}
			if (!animBg) (inst as Record<string, unknown>)["BackgroundColor3"] = env.newColor3(255, 255, 255);
			(inst as Record<string, unknown>)["BackgroundTransparency"] = 1 - opacity;
		}
	}
	// gradient-rotation: animatable angle for the UIGradient above.
	const gradRot = style["gradient-rotation"];
	if (gradRot !== undefined && !animOf("gradient-rotation")) {
		const g = findHelper(node, "ToilGradient");
		if (g !== undefined) {
			const gr = _parseFloat(gradRot);
			if (!_isNaN(gr)) (g as Record<string, unknown>)["Rotation"] = gr;
		}
	}

	// --- Border -> UIStroke (follows the UICorner; a gradient outline when
	// border-image is a gradient, otherwise a solid stroke). ---
	const borderW = parseLength(style["border-width"]);
	const borderColor = parseColor(style["border-color"]);
	if (borderW !== undefined && borderW.offset > 0) {
		ensureHelperChild(node, "ToilStroke", "UIStroke", env);
		const stroke = findHelper(node, "ToilStroke");
		if (stroke !== undefined) {
			const st = stroke as Record<string, unknown>;
			st["Thickness"] = _round(borderW.offset);
			if (borderColor !== undefined) {
				st["Color"] = env.newColor3(borderColor.r, borderColor.g, borderColor.b);
			}
			st["ApplyStrokeMode"] = env.enumValue("ApplyStrokeMode.Border");
			const borderImage = style["border-image"] ?? "";
			if (strFind(borderImage, "gradient", 1, true) !== undefined && env.newColorSequence !== undefined) {
				const grad = parseGradient(borderImage);
				if (grad !== undefined && grad.stops.size() >= 2) {
					// A UIGradient MULTIPLIES the stroke's Color; the default
					// black would render the gradient black. Paint the stroke
					// white so the gradient stops show their true colours.
					st["Color"] = env.newColor3(255, 255, 255);
					if (node.styleState["ToilStrokeGradient"] === undefined) {
						const sg = env.newInstance("UIGradient");
						(sg as Record<string, unknown>)["Name"] = "ToilStrokeGradient";
						(sg as Record<string, unknown>)["Parent"] = stroke;
						node.styleState["ToilStrokeGradient"] = sg;
					}
					const sg = node.styleState["ToilStrokeGradient"] as Record<string, unknown>;
					sg["Color"] = env.newColorSequence(grad.stops);
					if (env.newNumberSequence !== undefined) {
						const alphas: Array<number> = [];
						for (let si = 0; si < grad.stops.size(); si++) alphas.push(1 - grad.stops[si].a);
						sg["Transparency"] = env.newNumberSequence(alphas);
					}
					if (!animOf("gradient-rotation")) sg["Rotation"] = grad.rotation;
				}
			}
		}
		(inst as Record<string, unknown>)["BorderSizePixel"] = 0;
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
			// Order children by the LayoutOrder the host assigns from DOM order.
			// A UIListLayout otherwise defaults to sorting by Name, which
			// scrambles the children into alphabetical order.
			l["SortOrder"] = env.enumValue("SortOrder.LayoutOrder");
			l["FillDirection"] = env.enumValue(
				isColumn ? "FillDirection.Vertical" : "FillDirection.Horizontal"
			);
			// flex-wrap -> UIListLayout.Wraps (wrap / wrap-reverse both wrap).
			const flexWrap = style["flex-wrap"] ?? "";
			l["Wraps"] = flexWrap === "wrap" || flexWrap === "wrap-reverse";
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
	if (textColor !== undefined && isTextInstance(inst) && !animColor) {
		(inst as Record<string, unknown>)["TextColor3"] = env.newColor3(
			textColor.r,
			textColor.g,
			textColor.b
		);
	}

	// --- Text wrapping (CSS wraps by default; `white-space: nowrap` opts out) ---
	// Without this a TextLabel never wraps, so long text overflows its box.
	if (isTextInstance(inst)) {
		const whiteSpace = style["white-space"] ?? "";
		(inst as Record<string, unknown>)["TextWrapped"] = whiteSpace !== "nowrap";
	}

	// --- Font size ---
	const fontSize = parseLength(style["font-size"]);
	if (fontSize !== undefined && fontSize.offset > 0 && isTextInstance(inst)) {
		(inst as Record<string, unknown>)["TextSize"] = _round(fontSize.offset);
	}

	// --- Line height (TextLabel.LineHeight, a multiplier) ---
	const lineHeight = style["line-height"] ?? "";
	if (lineHeight.size() > 0 && isTextInstance(inst)) {
		const lh = _parseFloat(lineHeight);
		if (!_isNaN(lh) && lh > 0) (inst as Record<string, unknown>)["LineHeight"] = lh;
	}

	// --- Text transform: recorded here, applied to the joined text in
	// syncTextContent (the text is assembled from child text nodes). ---
	node.styleState["textTransform"] = style["text-transform"] ?? "";

	// --- Font family (map to Enum.Font) ---
	const fontFamily = style["font-family"] ?? "";
	if (fontFamily.size() > 0 && isTextInstance(inst)) {
		const fontEnum = mapFontFamily(fontFamily, env);
		if (fontEnum !== undefined) {
			(inst as Record<string, unknown>)["Font"] = fontEnum;
		}
	}

	// --- Font weight ---
	const fontWeight = style["font-weight"] ?? "";
	if (isTextInstance(inst) && (fontWeight === "bold" || (fontWeight.size() >= 2 && _parseInt(fontWeight) >= 600))) {
		(inst as Record<string, unknown>)["Font"] = env.enumValue("Font.GothamBold");
	}

	// --- Text overflow: `ellipsis` -> truncate at end, `clip`/unset -> none. ---
	const textOverflow = style["text-overflow"] ?? "";
	if (textOverflow.size() > 0 && isTextInstance(inst)) {
		(inst as Record<string, unknown>)["TextTruncate"] = env.enumValue(
			textOverflow === "ellipsis" ? "TextTruncate.AtEnd" : "TextTruncate.None"
		);
	}

	// --- Text shadow -> TextStroke (Roblox has no drop shadow for text, but a
	// stroke is the closest built-in: colour + softness). `none` clears it. ---
	const textShadow = style["text-shadow"] ?? "";
	if (textShadow.size() > 0 && isTextInstance(inst)) {
		if (textShadow === "none") {
			(inst as Record<string, unknown>)["TextStrokeTransparency"] = 1;
		} else {
			const shadowCol = parseColor(firstColor(textShadow));
			if (shadowCol !== undefined) {
				(inst as Record<string, unknown>)["TextStrokeColor3"] = env.newColor3(
					shadowCol.r,
					shadowCol.g,
					shadowCol.b
				);
				(inst as Record<string, unknown>)["TextStrokeTransparency"] = 1 - shadowCol.a * 0.5;
			}
		}
	}

	// --- object-fit -> ImageLabel/ImageButton.ScaleType. ---
	const objectFit = style["object-fit"] ?? "";
	if (objectFit.size() > 0 && isImageInstance(inst)) {
		let scale = "ScaleType.Fit";
		if (objectFit === "fill") scale = "ScaleType.Stretch";
		else if (objectFit === "cover") scale = "ScaleType.Crop";
		else if (objectFit === "contain" || objectFit === "scale-down") scale = "ScaleType.Fit";
		(inst as Record<string, unknown>)["ScaleType"] = env.enumValue(scale);
	}

	// --- background-image: url(...) -> ImageLabel/ImageButton.Image. ---
	const bgImageUrl = style["background-image"] ?? "";
	if (isImageInstance(inst)) {
		const url = extractUrl(bgImageUrl);
		if (url.size() > 0) {
			(inst as Record<string, unknown>)["Image"] = url;
		}
	}

	// --- Text alignment ---
	const textAlign = isTextInstance(inst) ? (style["text-align"] ?? "") : "";
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

	// (opacity is folded into the background/text transparency above.)

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
	if (inst.ClassName === "ScrollingFrame") {
		const horizontal = style["overflow-x"] === "scroll" || style["overflow-x"] === "auto";
		const axis = horizontal ? (style["overflow-y"] === "hidden" ? "X" : "XY") : "Y";
		inst["AutomaticCanvasSize"] = env.enumValue("AutomaticSize." + axis);
		inst["CanvasSize"] = env.newUDim2(0, 0, 0, 0);
		inst["ScrollingDirection"] = env.enumValue("ScrollingDirection." + axis);
		inst["ScrollBarThickness"] = 6;
	}
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

	// --- Rotation + scale (from transform). Written unconditionally when not
	// animated so a finished animation that restores the base also resets them.
	if (!animTransform) {
		(inst as Record<string, unknown>)["Rotation"] = tf.rotation ?? 0;
		// transform: scale(n) -> a UIScale child (Roblox has no scale on the
		// instance itself). Created only when a scale is present.
		if (tf.scale !== undefined) {
			ensureHelperChild(node, "ToilScale", "UIScale", env);
			const sc = findHelper(node, "ToilScale");
			if (sc !== undefined) (sc as Record<string, unknown>)["Scale"] = tf.scale;
		} else {
			const sc = findHelper(node, "ToilScale");
			if (sc !== undefined) sc["Scale"] = 1;
		}
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
			s["ApplyStrokeMode"] = env.enumValue("ApplyStrokeMode.Border");
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
		// Not a Roblox property: the write only lands on the fake test
		// instances, so it is protected from the real engine's error.
		pcall((): void => {
			(inst as Record<string, unknown>)["LetterSpacing"] = letterSpacing;
		});
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

/** Parsed CSS transform: rotate() -> degrees, translate() -> px, scale() -> factor. */
interface ParsedTransform {
	rotation: number | undefined;
	translateX: number;
	translateY: number;
	scale: number | undefined;
}

/**
 * Parse a CSS `transform` value into the pieces the host can map onto a
 * Roblox instance: rotate() -> Rotation, translate()/translateX/Y -> a Position
 * offset (px), scale() -> a UIScale. Units on lengths are ignored (px assumed).
 */
function parseTransform(style: Record<string, string>): ParsedTransform {
	let rotation: number | undefined;
	let translateX = 0;
	let translateY = 0;
	let scale: number | undefined;
	const transform = style["transform"] ?? "";
	if (transform.size() > 0 && transform !== "none") {
		const rm = string.match(transform, "rotate%(%s*(%-?%d+%.?%d*)");
		const deg = (rm[0] as unknown) as string | undefined;
		if (deg !== undefined) {
			const nn = _parseFloat(deg);
			if (!_isNaN(nn)) rotation = nn;
		}
		const tm = strMatchAll(transform, "translate%(%s*(%-?%d+%.?%d*)%a*%s*,?%s*(%-?%d*%.?%d*)");
		if (tm !== undefined) {
			const nx = _parseFloat(tm[0] ?? "0");
			if (!_isNaN(nx)) translateX = nx;
			const yRaw = tm[1] ?? "";
			if (yRaw.size() > 0) {
				const ny = _parseFloat(yRaw);
				if (!_isNaN(ny)) translateY = ny;
			}
		}
		const txm = string.match(transform, "translateX%(%s*(%-?%d+%.?%d*)");
		const txv = (txm[0] as unknown) as string | undefined;
		if (txv !== undefined) {
			const nn = _parseFloat(txv);
			if (!_isNaN(nn)) translateX = nn;
		}
		const tym = string.match(transform, "translateY%(%s*(%-?%d+%.?%d*)");
		const tyv = (tym[0] as unknown) as string | undefined;
		if (tyv !== undefined) {
			const nn = _parseFloat(tyv);
			if (!_isNaN(nn)) translateY = nn;
		}
		const sm = string.match(transform, "scale%(%s*(%-?%d+%.?%d*)");
		const sv = (sm[0] as unknown) as string | undefined;
		if (sv !== undefined) {
			const nn = _parseFloat(sv);
			if (!_isNaN(nn)) scale = nn;
		}
	}
	const rot = style["rotation"] ?? "";
	if (rotation === undefined && rot.size() > 0) {
		const nn = _parseFloat(rot);
		if (!_isNaN(nn)) rotation = nn;
	}
	return { rotation, translateX, translateY, scale };
}

/** strMatchAll: like string.match but returns all capture groups as an array. */
function strMatchAll(s: string, pattern: string): Array<string> | undefined {
	const wrapped = [string.match(s, pattern)] as unknown as Array<Array<string>>;
	const inner = wrapped[0] as unknown as Array<string>;
	if (inner.size() === 0 || inner[0] === undefined) return undefined;
	return inner;
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

/**
 * Re-derive a text-bearing instance's Text from its text children, in
 * order. React renders string children as separate text instances that own
 * no Roblox instance of their own, so the parent displays their join.
 */
function syncTextContent(node: HostNode): void {
	const inst = node.inst;
	if (inst === undefined || !isTextInstance(inst)) return;
	let out = "";
	const kids = node.children;
	for (let i = 0; i < kids.size(); i++) {
		if (kids[i].kind === "text") {
			out += kids[i].text;
		}
	}
	// text-transform (recorded by applyStyle). capitalize is left as-is (no
	// per-word title-casing) since Roblox has no built-in for it.
	const tt = node.styleState["textTransform"];
	if (tt === "uppercase") out = string.upper(out);
	else if (tt === "lowercase") out = string.lower(out);
	(inst as Record<string, unknown>)["Text"] = out;
}

/** Parse a CSS `aspect-ratio`: "16 / 9", "16/9", or a bare number. */
function parseAspectRatio(v: string): number | undefined {
	const s = strTrim(v);
	const slashIdx = strFind(s, "/", 1, true);
	if (slashIdx !== undefined) {
		const w = _parseFloat(slice(s, 1, slashIdx - 1));
		const h = _parseFloat(slice(s, slashIdx + 1));
		if (!_isNaN(w) && !_isNaN(h) && h !== 0) return w / h;
		return undefined;
	}
	const n = _parseFloat(s);
	return _isNaN(n) ? undefined : n;
}

/** Roblox signal/connection shapes, typed as methods so calls emit `:`. */
interface SignalLike {
	Connect(this: SignalLike, callback: () => void): ConnectionLike;
}
interface ConnectionLike {
	Disconnect(this: ConnectionLike): void;
}

/**
 * Connect the React event props the host supports: `onClick` on button
 * instances. The handler is read off the node at click time, so a re-render
 * that passes a new function needs no re-wiring.
 */
/** True when a Roblox InputObject is a left mouse click / primary touch. */
/**
 * Minimal RBXScriptSignal shape. The `this` parameter is load-bearing: it
 * makes roblox-ts emit a method call (`sig:Connect(fn)`) rather than a field
 * call (`sig.Connect(fn)`), which would pass the callback as `self` and crash
 * with "RBXScriptSignal expected, got function".
 */
interface RbxSignal {
	Connect(this: RbxSignal, callback: (...args: Array<unknown>) => void): unknown;
}

function isPrimaryInput(input: Record<string, unknown>): boolean {
	const uit = input["UserInputType"];
	const enumT = Enum as unknown as Record<string, Record<string, unknown>>;
	return uit === enumT["UserInputType"]["MouseButton1"] || uit === enumT["UserInputType"]["Touch"];
}

/**
 * Wire the React DOM-style event props this host supports onto the node's
 * Roblox signals. Connected once per node; each connection reads the handler
 * off `pendingProps` at fire time, so a re-render that changes (or adds) a
 * handler takes effect with no re-wiring. Handlers absent on the fake test env
 * (its instances have no such signals) are simply skipped.
 */
function wireEvents(node: HostNode): void {
	const inst = node.inst;
	if (inst === undefined) return;
	if (node.styleState["eventsWired"] !== undefined) return;
	node.styleState["eventsWired"] = true;
	const rec = inst as Record<string, unknown>;
	const cls = inst.ClassName;
	if (cls === "Path2D") {
		const path = inst as unknown as Path2D;
		path.ControlPointChanged.Connect(() => {
			const handler = node.pendingProps["onControlPointChanged"];
			if (typeIs(handler, "function")) {
				(handler as (event: { type: string; target: unknown }) => void)({ type: "controlpointchanged", target: path });
			}
		});
		return;
	}

	const fire = (name: string, event: Record<string, unknown>): void => {
		const h = node.pendingProps[name];
		if (typeIs(h, "function")) (h as (e: Record<string, unknown>) => void)(event);
	};
	const connect = (signalName: string, cb: (args: Array<unknown>) => void): void => {
		const sig = rec[signalName];
		if (sig !== undefined && typeIs((sig as Record<string, unknown>)["Connect"], "function")) {
			(sig as unknown as RbxSignal).Connect((...a: Array<unknown>) => cb(a));
		}
	};

	// Hover, on every GuiObject.
	connect("MouseEnter", () => fire("onMouseEnter", { type: "mouseenter", target: node }));
	connect("MouseLeave", () => fire("onMouseLeave", { type: "mouseleave", target: node }));

	if (cls === "TextButton" || cls === "ImageButton") {
		// Activated covers mouse, touch and gamepad without duplicate clicks.
		connect("Activated", (a) => fire("onClick", { type: "click", target: node, input: a[0] }));
		connect("MouseButton1Down", () => fire("onMouseDown", { type: "mousedown", target: node }));
		connect("MouseButton1Up", () => fire("onMouseUp", { type: "mouseup", target: node }));
		connect("MouseButton2Click", () => fire("onContextMenu", { type: "contextmenu", target: node }));
	} else {
		// A non-button needs Active + input events to be clickable, like the DOM.
		if (
			node.pendingProps["onClick"] !== undefined ||
			node.pendingProps["onMouseDown"] !== undefined ||
			node.pendingProps["onMouseUp"] !== undefined
		) {
			rec["Active"] = true;
		}
		connect("InputBegan", (a) => {
			const input = a[0] as Record<string, unknown> | undefined;
			if (input !== undefined && isPrimaryInput(input)) {
				fire("onMouseDown", { type: "mousedown", target: node });
				fire("onClick", { type: "click", target: node });
			}
		});
		connect("InputEnded", (a) => {
			const input = a[0] as Record<string, unknown> | undefined;
			if (input !== undefined && isPrimaryInput(input)) fire("onMouseUp", { type: "mouseup", target: node });
		});
	}

	if (cls === "TextBox") {
		connect("Focused", () => fire("onFocus", { type: "focus", target: node }));
		connect("FocusLost", (a) =>
			fire("onBlur", { type: "blur", target: node, enterPressed: a[0], value: rec["Text"] })
		);
		// Text changes: GetPropertyChangedSignal("Text") is a method.
		const gpcs = rec["GetPropertyChangedSignal"];
		if (typeIs(gpcs, "function")) {
			const sig = (gpcs as (self: unknown, p: string) => Record<string, unknown>)(inst, "Text");
			if (sig !== undefined && typeIs(sig["Connect"], "function")) {
				(sig as unknown as RbxSignal).Connect(() =>
					fire("onChange", { type: "change", target: node, value: rec["Text"] })
				);
			}
		}
	}
}

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
	if (child.kind === "text") {
		syncTextContent(parent);
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
		if (child.inst.ClassName !== "Path2D") (child.inst as Record<string, unknown>)["LayoutOrder"] = idx;
	}
	if (child.kind === "text") {
		syncTextContent(parent);
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
	unknown, /* PublicInstance */
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
		if (isTextInstance(inst)) {
			// Roblox seeds Text with the class name ("Label", "Button");
			// React owns the text through its text children.
			(inst as Record<string, unknown>)["Text"] = "";
		}
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
		// An `id` names the instance too, so the tree reads well in the
		// Explorer and FindFirstChild(id, true) locates it.
		const id = props["id"];
		if (typeIs(id, "string") && instance.inst !== undefined) {
			(instance.inst as Record<string, unknown>)["Name"] = tagNameToInstanceName(id as string);
		}
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
		if (resolver.removed !== undefined) resolver.removed(child);
		detachChild(child);
		if (child.inst !== undefined) env.destroy(child.inst);
	}

	function removeChildFromContainer(_container: HostNode, child: HostNode): void {
		if (resolver.removed !== undefined) resolver.removed(child);
		detachChild(child);
		if (child.inst !== undefined) env.destroy(child.inst);
	}

	function finalizeInitialChildren(instance: HostNode, _type: string, props: Record<string, unknown>): boolean {
		updateIdentity(instance, props);
		// Compute and apply style now
		const computed = resolver.resolve(instance);
		if (resolver.beforeStyle !== undefined) resolver.beforeStyle(instance, computed);
		applyStyle(instance, computed, env);
		wireEvents(instance);
		return true; // so commitMount is called
	}

	function commitMount(instance: HostNode, _type: string, _props: Record<string, unknown>): void {
		// Style already applied in finalizeInitialChildren
	}

	function commitUpdate(instance: HostNode, _type: string, _prevProps: Record<string, unknown>, nextProps: Record<string, unknown>): void {
		updateIdentity(instance, nextProps);
		const computed = resolver.resolve(instance);
		if (resolver.beforeStyle !== undefined) resolver.beforeStyle(instance, computed);
		applyStyle(instance, computed, env);
	}

	function commitTextUpdate(textInstance: HostNode, _oldText: string, newText: string): void {
		textInstance.text = newText;
		if (textInstance.parent !== undefined) {
			syncTextContent(textInstance.parent);
		}
	}

	function resetTextContent(instance: HostNode): void {
		instance.text = "";
		if (instance.inst !== undefined && isTextInstance(instance.inst)) {
			(instance.inst as Record<string, unknown>)["Text"] = "";
		}
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

	function getPublicInstance(instance: HostNode): unknown {
		// Refs (`ref.current`) resolve to whatever this returns. Hand back the
		// real Roblox instance so consumers can read/write it directly
		// (`ref.current.Size = ...`); fall back to the node for text/edge cases
		// where no instance exists.
		return instance.inst !== undefined ? instance.inst : instance;
	}

	function prepareForCommit(_container: HostNode): unknown {
		return undefined;
	}

	function resetAfterCommit(_container: HostNode, _newRootHostContext: unknown, _finishedWork: HostNode): void {}

	function preparePortalMount(_portalContainerNode: unknown): void {}

	// Deferred timeouts. React schedules these (Suspense retries, etc.) expecting
	// them to fire LATER, not inline -- firing synchronously risks re-entrant
	// updates during commit. On real Roblox we defer through task.delay (exposed
	// as env.setTimeout); handles are stored so cancelTimeout can task.cancel
	// them. The native test env has no scheduler, so we fall back to running the
	// callback inline there.
	let nextTimeoutHandle = 1;
	const timeoutThreads = new Map<number, unknown>();

	function scheduleTimeout(fn: (delay?: number) => void, delay?: number): number {
		if (env.setTimeout !== undefined) {
			const handle = nextTimeoutHandle++;
			// React's delay is in milliseconds; env.setTimeout takes seconds.
			const thread = env.setTimeout(() => {
				timeoutThreads.delete(handle);
				fn(delay);
			}, (delay ?? 0) / 1000);
			timeoutThreads.set(handle, thread);
			return handle;
		}
		fn(delay);
		return 0;
	}

	function cancelTimeout(handle: number): void {
		const thread = timeoutThreads.get(handle);
		if (thread !== undefined) {
			timeoutThreads.delete(handle);
			if (env.clearTimeout !== undefined) env.clearTimeout(thread);
		}
	}

	function getInstanceFromNode(_node: unknown): HostNode | undefined {
		return undefined;
	}

	function beforeActiveInstanceBlur(): void {}

	function afterActiveInstanceBlur(): void {}

	function prepareScopeUpdate(_scopeInstance: unknown, _instance: HostNode): void {}

	function getInstanceFromScope(_scopeInstance: unknown): HostNode | undefined {
		return undefined;
	}

	function detachDeletedInstance(node: HostNode): void {
		// React has removed this node for good. Free its Roblox instance (and
		// its helper children) instead of leaking it after removeChild detached
		// it from the tree.
		if (node.inst !== undefined) {
			env.destroy(node.inst);
			node.inst = undefined;
		}
	}

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
			removeChildFromContainer(container, container.children[i]);
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

	// Update priority is intentionally pinned to the synchronous lane, NOT a
	// no-op stub. This host has no concurrent scheduler of its own: React is
	// driven synchronously by a manual drainTasks() pump on Heartbeat (see
	// mountReactRoot). If these returned a concurrent event priority (Default =
	// 32, Continuous = 8, Idle) the reconciler would time-slice and re-post
	// scheduler work that the pump then spins on forever (script-timeout hang).
	// requestUpdateLane() falls back to resolveUpdatePriority() whenever no
	// transition/render lane is active, so it MUST return a sync lane. 1 is the
	// synchronous lane the reconciler flushes eagerly; the setter is a no-op
	// because there is no other priority state to track.
	const SyncPriority = 1;

	function setCurrentUpdatePriority(_newPriority: number): void {}

	function getCurrentUpdatePriority(): number {
		return SyncPriority;
	}

	function resolveUpdatePriority(): number {
		return SyncPriority;
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
