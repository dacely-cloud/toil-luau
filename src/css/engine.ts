/**
 * Pure CSS engine for the Roblox host.
 *
 * No Roblox service access, no `game`, no `Instance`: it runs on the plain Luau
 * VM (Lest native backend) and on the Roblox runtime alike.
 *
 * The public contract is the `Engine` interface from engine-types.ts:
 * computedStyle, keyframes, parseAnimation, evaluateAnimation, parseTransition,
 * sampleTiming.  This module re-exports those types so consumers can import
 * everything from one place.
 */

import type {
	StyleRule,
	KeyframeFrame,
	KeyframeSet,
	AnimationSpec,
	AnimationSample,
	TransitionSpec,
	ElementIdentity,
	Engine,
} from "../host/engine-types";

// ------------------------------------------------------------------ string helpers
// Module-local so no runtime global is needed (Lest's VM never gets the
// spike helper globals).  roblox-ts keeps `string` as the native Luau
// string type, so these emit as direct `s:match(...)` / `s:sub(...)` etc.

function strTrim(s: string): string {
	const m = string.match(s, "^%s*(.-)%s*$");
	return (m[0] as unknown) as string;
}

function slice(s: string, start: number, finish?: number): string {
	if (finish === undefined) return (string.sub(s, start) as unknown) as string;
	return (string.sub(s, start, finish) as unknown) as string;
}

function strMatch(s: string, pattern: string): string | undefined {
	return (string.match(s, pattern) as unknown) as string | undefined;
}

/**
 * Like strMatch but returns ALL capture groups as an array. Needed where the
 * pattern has 2+ captures (parseValue, parseAnB, parseHexColor) — string.match
 * returns multiple values that a single-variable binding would drop.
 */
function strMatchAll(s: string, pattern: string): Array<string> | undefined {
	// string.match returns its capture groups as multiple values. Wrapping in an
	// array literal makes roblox-ts emit `local r = { { string.match(...) } }`
	// (an outer array holding an inner table of the captures). We unwrap that
	// inner table and return it as a flat array (0-indexed in TS / 1 in Luau).
	const wrapped = [string.match(s, pattern)] as unknown as Array<Array<string>>;
	const inner = wrapped[0] as unknown as Array<string>;
	if (inner.size() === 0 || inner[0] === undefined) return undefined;
	return inner;
}

function strSplit(s: string, sep: string): Array<string> {
	return (string.split(s, sep) as unknown) as Array<string>;
}

/** Split on whitespace (pattern), since string.split is plain-only. */
function strSplitWs(s: string): Array<string> {
	const out: Array<string> = [];
	const iter = string.gmatch(s, "%S+");
	let m: string | undefined;
	while (true) {
		m = (iter() as unknown) as string | undefined;
		if (m === undefined) break;
		out.push(m);
	}
	return out;
}

function strFind(s: string, pattern: string, init: number, plain: boolean): number | undefined {
	// string.find returns (start, end, ...). roblox-ts may emit this as a plain
	// first-return number OR wrap the multi-return in a table, depending on how
	// the result is typed/used. Handle both: if the binding is a table, take the
	// first element; if it is already a number, use it directly.
	const r = (string.find(s, pattern, init, plain) as unknown) as Array<number> | number;
	if (r === undefined) return undefined;
	if (jsTypeOfJS(r) === "number") return r as number;
	return (r as Array<number>)[0];
}

function strGsub(s: string, pattern: string, repl: string): string {
	return (s.gsub(pattern, repl) as unknown) as string;
}

function strStartsWith(s: string, prefix: string): boolean {
	return s.size() >= prefix.size() && slice(s, 1, prefix.size()) === prefix;
}

function strEndsWith(s: string, suffix: string): boolean {
	return s.size() >= suffix.size() && slice(s, s.size() - suffix.size() + 1) === suffix;
}

// ------------------------------------------------------------------ number/JS helpers
// Module-local mirrors of the JS runtime globals the engine used to rely on
// (parseFloat, parseInt, isNaN, typeOfJS, Math). Local so the pure engine runs
// in any env chain (the Lest css spec requires it directly, outside the spike
// env that installs those globals). Behavior matches the spike RT shims.

function jsParseFloat(s: string): number {
	const m = strMatch(tostring(s), "^%s*([%+%-]?%d*%.?%d+[eE][%+%-]?%d+)") ?? strMatch(tostring(s), "^%s*([%+%-]?%d*%.?%d+)");
	const n = m !== undefined ? tonumber(m) : undefined;
	return n !== undefined ? n : math.huge - math.huge;
}

function jsParseInt(s: string, radix?: number): number {
	if (radix === 16) {
		const n = tonumber(strTrim(s), 16);
		return n === undefined ? math.huge - math.huge : n;
	}
	const m = strMatch(tostring(s), "^%s*([%+%-]?%d+)");
	const n = m !== undefined ? tonumber(m) : undefined;
	return n !== undefined ? n : math.huge - math.huge;
}

function jsIsNaN(n: number): boolean {
	return n !== n;
}

function jsTypeOfJS(v: unknown): string {
	const t = type(v);
	if (t === "table") return "object";
	if (t === "string") return "string";
	if (t === "number") return "number";
	if (t === "boolean") return "boolean";
	if (t === "function") return "function";
	return "undefined";
}

function jsRound(n: number): number {
	return math.floor(n + 0.5);
}

function jsFloor(n: number): number {
	return math.floor(n);
}

function jsAbs(n: number): number {
	return n < 0 ? -n : n;
}

/**
 * Collect the string keys of a record, in undefined order. Local because the
 * spike helper globals (and the JS `Object` global) are not present in the
 * env chain the pure engine runs in under Lest (the spec requires it directly,
 * outside the spike env that installs `Object`). Iterates with the Luau
 * builtin `next`, which is always present and needs no global.
 */
function keysOf(rec: Record<string, string> | undefined): Array<string> {
	const out: Array<string> = [];
	if (rec === undefined) return out;
	let k: string = undefined as unknown as string;
	while (true) {
		// Luau `next` returns (key, value); roblox-ts wraps the multi-return into a
		// table when the result is indexed, so r[0] is the key and r[1] the value.
		const r = next(rec, k === undefined ? undefined : k);
		const key = (r as unknown as Array<string>)[0];
		if (key === undefined) break;
		out.push(key);
		k = key;
	}
	return out;
}

// ------------------------------------------------------------------ declarations

/** camelCase (React style objects) -> kebab-case CSS property names. */
function toKebab(key: string): string {
	return string.lower(strGsub(key, "(%u)", "-%1"));
}

/** Expand a 1..4 value box shorthand (padding / margin) into its sides. */
function expandSides(prefix: string, value: string, out: Record<string, string>): void {
	const t = strSplitWs(value);
	const n = t.size();
	if (n === 0) return;
	const top = t[0];
	const right = n >= 2 ? t[1] : t[0];
	const bottom = n >= 3 ? t[2] : t[0];
	const left = n >= 4 ? t[3] : right;
	out[prefix + "-top"] = top;
	out[prefix + "-right"] = right;
	out[prefix + "-bottom"] = bottom;
	out[prefix + "-left"] = left;
}

/**
 * Canonicalize one declaration block: kebab-case keys, trimmed values, and
 * the shorthands the host reads by their longhand names (`padding`,
 * `margin`, `background`, `border`) expanded.
 */
/** Expand `inset` (1..4 values) into top / right / bottom / left. */
function expandInset(value: string, out: Record<string, string>): void {
	const t = strSplitWs(value);
	const n = t.size();
	if (n === 0) return;
	const top = t[0];
	const right = n >= 2 ? t[1] : t[0];
	const bottom = n >= 3 ? t[2] : t[0];
	const left = n >= 4 ? t[3] : right;
	out["top"] = top;
	out["right"] = right;
	out["bottom"] = bottom;
	out["left"] = left;
}

/** Expand the `font` shorthand into font-size / font-family / font-weight / font-style. */
function expandFont(value: string, out: Record<string, string>): void {
	const t = strSplitWs(value);
	const family: Array<string> = [];
	let sawSize = false;
	for (let i = 0; i < t.size(); i++) {
		const tok = t[i];
		if (!sawSize && (strEndsWith(tok, "px") || strMatch(tok, "^%d") !== undefined)) {
			// A <size> or <size>/<line-height> token: everything after is the family.
			const slashIdx = strFind(tok, "/", 1, true);
			if (slashIdx !== undefined) {
				out["font-size"] = slice(tok, 1, slashIdx - 1);
				out["line-height"] = slice(tok, slashIdx + 1);
			} else {
				out["font-size"] = tok;
			}
			sawSize = true;
		} else if (sawSize) {
			family.push(tok);
		} else if (tok === "bold" || tok === "bolder" || tok === "lighter" || strMatch(tok, "^%d%d%d$") !== undefined) {
			out["font-weight"] = tok;
		} else if (tok === "italic" || tok === "oblique") {
			out["font-style"] = tok;
		}
	}
	if (family.size() > 0) out["font-family"] = family.join(" ");
}

function normalizeDeclarations(decls: Record<string, string> | undefined): Record<string, string> {
	const out: Record<string, string> = {};
	if (decls === undefined) return out;
	const keys = keysOf(decls);
	for (let ki = 0; ki < keys.size(); ki++) {
		const rawKey = keys[ki];
		const value = strTrim(tostring(decls[rawKey]));
		const key = toKebab(strTrim(rawKey));
		if (key === "padding" || key === "margin") {
			expandSides(key, value, out);
		} else if (key === "background") {
			// A gradient maps to background-image (-> UIGradient); a plain
			// colour maps to background-color.
			if (strFind(value, "gradient", 1, true) !== undefined) {
				out["background-image"] = value;
			} else {
				out["background-color"] = value;
			}
		} else if (key === "border") {
			const parts = strSplitWs(value);
			for (let pi = 0; pi < parts.size(); pi++) {
				const p = parts[pi];
				if (strEndsWith(p, "px") || strMatch(p, "^%d") !== undefined) {
					out["border-width"] = p;
				} else if (p === "solid" || p === "dashed" || p === "dotted" || p === "none") {
					out["border-style"] = p;
				} else {
					out["border-color"] = p;
				}
			}
		} else if (key === "inset") {
			expandInset(value, out);
		} else if (key === "font") {
			expandFont(value, out);
		} else if (key === "place-items") {
			const t = strSplitWs(value);
			if (t.size() > 0) {
				out["align-items"] = t[0];
				out["justify-items"] = t.size() >= 2 ? t[1] : t[0];
			}
		} else if (key === "place-content") {
			const t = strSplitWs(value);
			if (t.size() > 0) {
				out["align-content"] = t[0];
				out["justify-content"] = t.size() >= 2 ? t[1] : t[0];
			}
		} else if (key === "overflow") {
			out["overflow"] = value;
			out["overflow-x"] = value;
			out["overflow-y"] = value;
		} else {
			out[key] = value;
		}
	}
	return out;
}

// ------------------------------------------------------------------ types

interface SimpleSelector {
	kind: "universal" | "type" | "class" | "id" | "pseudo" | "attr";
	name: string;
	attrOp?: string;
	matches: (el: ElementIdentity) => boolean;
	specificity: [number, number, number];
}

interface Compound {
	parts: Array<SimpleSelector>;
	specificity: [number, number, number];
}

interface Selector {
	chain: Array<Compound>;
	combinators: Array<string>;
	specificity: [number, number, number];
}

interface CompiledRule {
	selector: Selector;
	declarations: Record<string, string>;
	specificity: [number, number, number];
}

interface KeyframeSetInternal {
	name: string;
	frames: Array<KeyframeFrame>;
}

// ------------------------------------------------------------------ parseAnB

function parseAnB(expr: string): [number, number] | undefined {
	const e = strGsub(expr, "%s+", "");
	if (e === "odd") return [2, 1];
	if (e === "even") return [2, 0];
	// an+b: optional sign + optional digits + "n" + optional signed integer.
	// Also handle a bare number (a=0) and a bare "n" (a=1, b=0).
	const caps = strMatchAll(e, "^(%-?%d*)n([%+%-]?%d+)$");
	if (caps !== undefined) {
		const aRaw = caps[0] ?? "";
		let a: number;
		if (aRaw.size() === 0 || aRaw === "-") a = aRaw === "-" ? -1 : 1;
		else a = jsParseInt(aRaw, 10);
		const bRaw = caps[1] ?? "";
		// The b capture may include a leading + or -; jsParseInt handles - but
		// not +, so strip a leading + (a + means positive, value is unchanged).
		const b = jsParseInt(bRaw.size() > 0 && bRaw.sub(1, 1) === "+" ? bRaw.sub(2) : bRaw, 10);
		return [a, b];
	}
	// bare integer: a=0, b=that number
	const plain = strMatch(e, "^(%-?%d+)$");
	if (plain !== undefined) return [0, jsParseInt(plain, 10)];
	return undefined;
}

// ------------------------------------------------------------------ number helpers

function toNum(v: string | number): number {
	if (jsTypeOfJS(v) === "number") return v as number;
	const n = jsParseFloat(v as string);
	return jsIsNaN(n) ? 0 : n;
}

function clampN(v: number, lo: number, hi: number): number {
	return v < lo ? lo : v > hi ? hi : v;
}

function fmt(n: number): string {
	if (jsAbs(n - jsRound(n)) < 1e-6) return tostring(jsRound(n));
	return tostring(n);
}

function specGreater(a: [number, number, number], b: [number, number, number]): boolean {
	if (a[0] !== b[0]) return a[0] > b[0];
	if (a[1] !== b[1]) return a[1] > b[1];
	return a[2] > b[2];
}

// ------------------------------------------------------------------ selector parsing

/**
 * Parse a single compound selector (e.g. ".btn.primary", "#app .nav li:first-child").
 * Returns the compound and advances `pos` past the last character consumed.
 */
function parseCompound(s: string, pos: number): [Compound, number] | undefined {
	const parts: Array<SimpleSelector> = [];
	let p = pos;

	while (p <= s.size()) {
		const c = slice(s, p, p);
		if (c === " " || c === ">" || c === "+" || c === "~" || c === ",") break;

		let part: SimpleSelector | undefined;

		if (c === "*") {
			part = {
				kind: "universal",
				name: "*",
				matches: (_el: ElementIdentity) => true,
				specificity: [0, 0, 0],
			};
			p++;
		} else if (c === ".") {
			// class
			let name = "";
			p++;
			while (p <= s.size()) {
				const ch = slice(s, p, p);
				if (ch === "." || ch === "#" || ch === ":" || ch === "[" || ch === " " || ch === ">" || ch === "+" || ch === "~" || ch === ",") break;
				name += ch;
				p++;
			}
			if (name.size() === 0) return undefined;
			const cls = name;
			part = {
				kind: "class",
				name: cls,
				matches: (el: ElementIdentity) => el.classList.includes(cls),
				specificity: [0, 1, 0],
			};
		} else if (c === "#") {
			// id
			let name = "";
			p++;
			while (p <= s.size()) {
				const ch = slice(s, p, p);
				if (ch === "." || ch === "#" || ch === ":" || ch === "[" || ch === " " || ch === ">" || ch === "+" || ch === "~" || ch === ",") break;
				name += ch;
				p++;
			}
			if (name.size() === 0) return undefined;
			const id = name;
			part = {
				kind: "id",
				name: id,
				matches: (el: ElementIdentity) => el.id === id,
				specificity: [1, 0, 0],
			};
		} else if (c === ":") {
			// pseudo-class
			let name = "";
			p++;
			while (p <= s.size()) {
				const ch = slice(s, p, p);
				if (ch === "(" || ch === "." || ch === "#" || ch === ":" || ch === "[" || ch === " " || ch === ">" || ch === "+" || ch === "~" || ch === ",") break;
				name += ch;
				p++;
			}
			if (name.size() === 0) return undefined;

			if (name === "nth-child" || name === "nth-last-child") {
				// expect (an+b)
				if (p <= s.size() && slice(s, p, p) === "(") {
					let close = p + 1;
					while (close <= s.size() && slice(s, close, close) !== ")") close++;
					const arg = slice(s, p + 1, close - 1);
					const ab = parseAnB(arg);
					if (ab === undefined) return undefined;
					const [a, b] = ab;
					const isLast = name === "nth-last-child";
					part = {
						kind: "pseudo",
						// Store the ORIGINAL an+b arg so the matcher can re-parse it
						// with parseAnB (storing the parsed "a,b" would not re-parse).
						name: name + "(" + arg + ")",
						matches: (_el: ElementIdentity) => true,
						specificity: [0, 1, 0],
					};
					p = close + 1;
				} else {
					return undefined;
				}
			} else if (name === "first-child") {
				part = {
					kind: "pseudo",
					name: "first-child",
					matches: () => true,
					specificity: [0, 1, 0],
				};
			} else if (name === "last-child") {
				part = {
					kind: "pseudo",
					name: "last-child",
					matches: () => true,
					specificity: [0, 1, 0],
				};
			} else {
				// hover / active / focus / other state pseudos
				const st = name;
				part = {
					kind: "pseudo",
					name: st,
					matches: (el: ElementIdentity) => el.states.includes(st),
					specificity: [0, 1, 0],
				};
			}
		} else if (c === "[") {
			// attribute selector
			let name = "";
			p++;
			while (p <= s.size()) {
				const ch = slice(s, p, p);
				if (ch === "=" || ch === "]" || ch === " ") break;
				name += ch;
				p++;
			}
			if (name.size() === 0) return undefined;
			let op: string | undefined;
			let val: string | undefined;
			if (p <= s.size() && slice(s, p, p) === "=") {
				op = "=";
				p++;
				let v = "";
				const q1 = slice(s, p, p);
				if (q1 === '"' || q1 === "'") {
					p++;
					while (p <= s.size() && slice(s, p, p) !== q1) {
						v += slice(s, p, p);
						p++;
					}
					p++;
				} else {
					while (p <= s.size()) {
						const ch = slice(s, p, p);
						if (ch === "]") break;
						v += ch;
						p++;
					}
				}
				val = v;
			}
			if (p <= s.size() && slice(s, p, p) === "]") p++;
			const aname = name;
			const aop = op;
			const aval = val;
			part = {
				kind: "attr",
				name: aname,
				attrOp: aop,
				matches: (el: ElementIdentity) => {
					const v = el.attributes[aname];
					if (aop === undefined) return v !== undefined;
					return v !== undefined && v === aval;
				},
				specificity: [0, 1, 0],
			};
		} else {
			// type selector
			let name = "";
			while (p <= s.size()) {
				const ch = slice(s, p, p);
				if (ch === "." || ch === "#" || ch === ":" || ch === "[" || ch === " " || ch === ">" || ch === "+" || ch === "~" || ch === "," || ch === "*") break;
				name += ch;
				p++;
			}
			if (name.size() === 0) return undefined;
			const tn = name;
			part = {
				kind: "type",
				name: tn,
				matches: (el: ElementIdentity) => el.tagName === tn,
				specificity: [0, 0, 1],
			};
		}

		parts.push(part);
	}

	if (parts.size() === 0) return undefined;

	// compute compound specificity
	let sa = 0, sb = 0, sc = 0;
	for (let i = 0; i < parts.size(); i++) {
		sa += parts[i].specificity[0];
		sb += parts[i].specificity[1];
		sc += parts[i].specificity[2];
	}

	return [{ parts, specificity: [sa, sb, sc] }, p];
}

/**
 * Parse a full selector string (may contain comma-separated groups).
 * Returns an array of Selector objects.
 */
function parseSelectors(input: string): Array<Selector> {
	// split on commas (respecting parentheses depth for :nth-child)
	const groups: Array<string> = [];
	let depth = 0;
	let cur = "";
	for (let i = 0; i < input.size(); i++) {
		const c = slice(input, i + 1, i + 1);
		if (c === "(") depth++;
		if (c === ")") depth--;
		if (c === "," && depth === 0) {
			groups.push(cur);
			cur = "";
		} else {
			cur += c;
		}
	}
	if (cur.size() > 0) groups.push(cur);

	const result: Array<Selector> = [];
	for (let gi = 0; gi < groups.size(); gi++) {
		const group = strTrim(groups[gi]);
		if (group.size() === 0) continue;

		// tokenize the group into compound selectors and combinators
		const chain: Array<Compound> = [];
		const combinators: Array<string> = [];
		let pos = 1;

		while (pos <= group.size()) {
			// skip whitespace
			while (pos <= group.size() && slice(group, pos, pos) === " ") pos++;
			if (pos > group.size()) break;

			// check for combinator
			const c = slice(group, pos, pos);
			if (c === ">" || c === "+" || c === "~") {
				combinators.push(c);
				pos++;
				continue;
			}

			// parse compound
			const parsed = parseCompound(group, pos);
			if (parsed === undefined) break;
			const [compound, newPos] = parsed;
			chain.push(compound);
			pos = newPos;
		}

		if (chain.size() > 0) {
			// compute selector specificity
			let sa = 0, sb = 0, sc = 0;
			for (let i = 0; i < chain.size(); i++) {
				sa += chain[i].specificity[0];
				sb += chain[i].specificity[1];
				sc += chain[i].specificity[2];
			}
			result.push({ chain, combinators, specificity: [sa, sb, sc] });
		}
	}

	return result;
}

// ------------------------------------------------------------------ matching

/**
 * Check whether a compound selector matches an element, given sibling
 * context for :first-child / :last-child / :nth-child.
 */
function matchCompound(
	compound: Compound,
	el: ElementIdentity,
	siblingIndex: number,
	siblingCount: number
): boolean {
	for (let i = 0; i < compound.parts.size(); i++) {
		const part = compound.parts[i];
		if (part.kind === "pseudo") {
			if (part.name === "first-child") {
				if (siblingIndex !== 0) return false;
				continue;
			}
			if (part.name === "last-child") {
				if (siblingIndex !== siblingCount - 1) return false;
				continue;
			}
			if (strStartsWith(part.name, "nth-child(") || strStartsWith(part.name, "nth-last-child(")) {
				// name is "nth-child(a,b)" or "nth-last-child(a,b)"
				const lastOpen = strFind(part.name, "(", 1, true);
				const arg = slice(part.name, (lastOpen ?? 1) + 1, part.name.size() - 1);
				const ab = parseAnB(arg);
				if (ab === undefined) return false;
				const [a, b] = ab;
				const isLast = strStartsWith(part.name, "nth-last-child");
				const n = isLast ? (siblingCount - 1 - siblingIndex) : siblingIndex;
				const target = n + 1;
				if (a === 0) {
					if (target !== b) return false;
				} else {
					const diff = target - b;
					if (diff % a !== 0) return false;
					const k = diff / a;
					if (k < 0) return false;
				}
				continue;
			}
		}
		if (!part.matches(el)) return false;
	}
	return true;
}

/**
 * Match a full selector against an element, walking up the ancestor chain.
 * `ancestors` is ordered outermost-first.
 */
function matchSelector(
	sel: Selector,
	el: ElementIdentity,
	ancestors: Array<ElementIdentity>,
	siblingIndex: number,
	siblingCount: number
): boolean {
	const chain = sel.chain;
	if (chain.size() === 0) return false;

	// The last compound must match the element itself
	const lastIdx = chain.size() - 1;
	const lastCompound = chain[lastIdx];
	if (!matchCompound(lastCompound, el, siblingIndex, siblingCount)) return false;

	// Walk backwards through the chain, matching ancestors
	let ancestorPtr = ancestors.size() - 1; // innermost ancestor

	for (let ci = lastIdx - 1; ci >= 0; ci--) {
		const compound = chain[ci];
		const combinator = ci < sel.combinators.size() ? sel.combinators[ci] : " ";

		if (combinator === ">") {
			// direct parent: the next ancestor must match
			if (ancestorPtr < 0) return false;
			if (!matchCompound(compound, ancestors[ancestorPtr], siblingIndex, siblingCount)) return false;
			ancestorPtr--;
		} else if (combinator === "+" || combinator === "~") {
			// sibling combinator: for the spike, treat like descendant
			let found = false;
			for (let ai = ancestorPtr; ai >= 0; ai--) {
				if (matchCompound(compound, ancestors[ai], siblingIndex, siblingCount)) {
					found = true;
					break;
				}
			}
			if (!found) return false;
		} else {
			// descendant: any ancestor must match
			let found = false;
			for (let ai = ancestorPtr; ai >= 0; ai--) {
				if (matchCompound(compound, ancestors[ai], siblingIndex, siblingCount)) {
					found = true;
					ancestorPtr = ai - 1;
					break;
				}
			}
			if (!found) return false;
		}
	}

	return true;
}

// ------------------------------------------------------------------ cascade

function computedStyle(
	compiledRules: Array<CompiledRule>,
	identity: ElementIdentity,
	ancestors: Array<ElementIdentity>,
	siblingIndex: number,
	siblingCount: number,
	inline: Record<string, string> | undefined
): Record<string, string> {
	// Collect matching rules with their specificity and source order
	const matched: Array<{ spec: [number, number, number]; order: number; decls: Record<string, string> }> = [];
	for (let i = 0; i < compiledRules.size(); i++) {
		const rule = compiledRules[i];
		if (matchSelector(rule.selector, identity, ancestors, siblingIndex, siblingCount)) {
			matched.push({ spec: rule.specificity, order: i, decls: rule.declarations });
		}
	}

	// Sort by specificity (ascending), then source order (ascending)
	matched.sort((a: { spec: [number, number, number]; order: number; decls: Record<string, string> }, b: { spec: [number, number, number]; order: number; decls: Record<string, string> }): boolean => {
		if (a.spec[0] !== b.spec[0]) return a.spec[0] < b.spec[0];
		if (a.spec[1] !== b.spec[1]) return a.spec[1] < b.spec[1];
		if (a.spec[2] !== b.spec[2]) return a.spec[2] < b.spec[2];
		return a.order < b.order;
	});

	// Apply in order: later entries override earlier ones
	const result: Record<string, string> = {};
	for (let i = 0; i < matched.size(); i++) {
		const decls = matched[i].decls;
		const keys = keysOf(decls);
		for (let ki = 0; ki < keys.size(); ki++) {
			result[keys[ki]] = decls[keys[ki]];
		}
	}

	// Inline style wins last
	if (inline !== undefined) {
		const norm = normalizeDeclarations(inline);
		const ikeys = keysOf(norm);
		for (let ki = 0; ki < ikeys.size(); ki++) {
			result[ikeys[ki]] = norm[ikeys[ki]];
		}
	}

	return result;
}

// ------------------------------------------------------------------ keyframes

function parseKeyframesFromRules(rules: Array<StyleRule>): Record<string, KeyframeSetInternal> {
	const sets: Record<string, KeyframeSetInternal> = {};
	for (let i = 0; i < rules.size(); i++) {
		const rule = rules[i];
		if (rule.keyframes !== undefined) {
						let name = strTrim(rule.selector);
			const prefix = "@keyframes";
			if (name.sub(1, prefix.size()) === prefix) {
			name = strTrim(name.sub(prefix.size() + 1));
			}
			const frames: Array<KeyframeFrame> = [];
			if (jsTypeOfJS(rule.keyframes) === "string") {
			keyframesFromDeclarations(rule.declarations, frames);
			} else {
			keyframesFromFrames(rule.keyframes as Array<KeyframeFrame>, frames);
			}
frames.sort((a: KeyframeFrame, b: KeyframeFrame): boolean => a.offset < b.offset);
			sets[name] = { name, frames };
		}
	}
	return sets;
}
function keyframesFromFrames(frames: Array<KeyframeFrame>, out: Array<KeyframeFrame>): void {
	for (let i = 0; i < frames.size(); i++) {
		out.push({ offset: frames[i].offset, styles: normalizeDeclarations(frames[i].styles) });
	}
}

/**
 * A keyframe selector as a 0..1 offset: `from` / `to`, a percentage, or a
 * bare fraction (a bare number above 1 is read as a percentage).
 */
function parseOffset(label: string): number {
	const s = string.lower(strTrim(label));
	if (s === "from") return 0;
	if (s === "to") return 1;
	const n = jsParseFloat(s);
	if (jsIsNaN(n)) return 0;
	if (strEndsWith(s, "%") || n > 1) return clampN(n / 100, 0, 1);
	return clampN(n, 0, 1);
}

function keyframesFromDeclarations(decls: Record<string, string> | undefined, out: Array<KeyframeFrame>): void {
	if (decls === undefined) return;
	const keys = keysOf(decls);
	for (let ki = 0; ki < keys.size(); ki++) {
		const offsetStr = keys[ki];
		const valueStr = decls[offsetStr];
		const styles: Record<string, string> = {};
		const parts = strSplit(valueStr, ";");
		for (let pi = 0; pi < parts.size(); pi++) {
			const part = strTrim(parts[pi]);
			if (part.size() === 0) continue;
			const colonIdx = strFind(part, ":", 1, true);
			if (colonIdx !== undefined) {
				const prop = strTrim(slice(part, 1, colonIdx - 1));
				const val = strTrim(slice(part, colonIdx + 1));
				if (prop.size() > 0) {
				styles[prop] = val;
				}
			}
		}
		out.push({ offset: parseOffset(offsetStr), styles: normalizeDeclarations(styles) });
	}
}


// ------------------------------------------------------------------ animation parsing

function parseAnimation(value: string): Array<AnimationSpec> {
	const parts = strSplit(value, ",");
	const specs: Array<AnimationSpec> = [];
	for (let i = 0; i < parts.size(); i++) {
		const part = strTrim(parts[i]);
		if (part.size() === 0) continue;

		const tokens = strSplitWs(part);
		let name = "";
		let duration = 0;
		let timingFunction = "ease";
		let delay = 0;
		let timeSeen = 0;
		let iterationCount: number | string = 1;
		let direction = "normal";
		let fillMode = "none";
		let playState = "running";

		for (let ti = 0; ti < tokens.size(); ti++) {
			const t = strTrim(tokens[ti]);
			if (t.size() === 0) continue;
			// CSS animation shorthand: the first <time> is the duration, the
			// second is the delay (check "ms" before "s" since "ms" ends in "s").
			if (strEndsWith(t, "ms")) {
				const n = jsParseFloat(t);
				if (!jsIsNaN(n)) {
					if (timeSeen === 0) duration = n / 1000;
					else if (timeSeen === 1) delay = n / 1000;
					timeSeen++;
					continue;
				}
			}
			if (strEndsWith(t, "s")) {
				const n = jsParseFloat(t);
				if (!jsIsNaN(n)) {
					if (timeSeen === 0) duration = n;
					else if (timeSeen === 1) delay = n;
					timeSeen++;
					continue;
				}
			}
			if (t === "ease" || t === "linear" || t === "ease-in" || t === "ease-out" || t === "ease-in-out") {
				timingFunction = t;
				continue;
			}
			if (t === "infinite") {
				iterationCount = "infinite";
				continue;
			}
			if (t === "normal" || t === "reverse" || t === "alternate" || t === "alternate-reverse") {
				direction = t;
				continue;
			}
			if (t === "none" || t === "forwards" || t === "backwards" || t === "both") {
				fillMode = t;
				continue;
			}
			if (t === "running" || t === "paused") {
				playState = t;
				continue;
			}
			const n = jsParseFloat(t);
			if (!jsIsNaN(n) && tostring(n) === t) {
				iterationCount = n;
				continue;
			}
			if (name.size() === 0) {
				name = t;
			}
		}

		if (name.size() > 0) {
			specs.push({
				name,
				duration,
				timingFunction,
				delay,
				iterationCount,
				direction,
				fillMode,
				playState,
			});
		}
	}
	return specs;
}

// ------------------------------------------------------------------ transition parsing

function parseTransition(value: string): Array<TransitionSpec> {
	const parts = strSplit(value, ",");
	const specs: Array<TransitionSpec> = [];
	for (let i = 0; i < parts.size(); i++) {
		const part = strTrim(parts[i]);
		if (part.size() === 0) continue;

		const tokens = strSplitWs(part);
		let property = "all";
		let duration = 0.3;
		let timingFunction = "ease";
		let delay = 0;
		let timeSeen = 0;

		for (let ti = 0; ti < tokens.size(); ti++) {
			const t = strTrim(tokens[ti]);
			if (t.size() === 0) continue;
			if (strEndsWith(t, "s") && !strEndsWith(t, "ms")) {
				const n = jsParseFloat(t);
				if (!jsIsNaN(n)) {
					if (timeSeen === 0) duration = n;
					else delay = n;
					timeSeen++;
					continue;
				}
			}
			if (strEndsWith(t, "ms")) {
				const n = jsParseFloat(t);
				if (!jsIsNaN(n)) {
					if (timeSeen === 0) duration = n / 1000;
					else delay = n / 1000;
					timeSeen++;
					continue;
				}
			}
			if (t === "ease" || t === "linear" || t === "ease-in" || t === "ease-out" || t === "ease-in-out") {
				timingFunction = t;
				continue;
			}
			if (timeSeen === 0) property = t;
		}

		specs.push({ property, duration, timingFunction, delay });
	}
	return specs;
}

// ------------------------------------------------------------------ timing functions

function sampleTiming(fn: string, p: number): number {
	const pp = clampN(p, 0, 1);
	switch (fn) {
		case "linear":
			return pp;
		case "ease":
			return easeBezier(pp);
		case "ease-in":
			return pp * pp;
		case "ease-out":
			return pp * (2 - pp);
		case "ease-in-out":
			if (pp < 0.5) return 2 * pp * pp;
			return -1 + (4 - 2 * pp) * pp;
		default:
			return pp;
	}
}

function easeBezier(t: number): number {
	const t2 = t * t;
	const t3 = t2 * t;
	return 0.25 * t + 0.3 * t2 * (1 - t) + 0.75 * t2 * (1 - t) + t3;
}

// ------------------------------------------------------------------ animation evaluation

function parseValue(v: string): [number, string] | undefined {
	const caps = strMatchAll(strTrim(v), "^([%-%d%.]+)([%a%%]*)$");
	if (caps !== undefined) {
		const n = jsParseFloat(caps[0]);
		const unit = caps[1] ?? "";
		if (!jsIsNaN(n)) return [n, unit];
	}
	return undefined;
}

export function interpolateValue(from: string, to: string, t: number): string {
	const fa = parseValue(from);
	const tb = parseValue(to);
	if (fa !== undefined && tb !== undefined) {
		if (fa[1] === tb[1]) {
			const result = fa[0] + (tb[0] - fa[0]) * t;
			return fmt(result) + fa[1];
		}
	}
	const fc = parseHexColor(from);
	const tc = parseHexColor(to);
	if (fc !== undefined && tc !== undefined) {
		const r = jsRound(fc[0] + (tc[0] - fc[0]) * t);
		const g = jsRound(fc[1] + (tc[1] - fc[1]) * t);
		const b = jsRound(fc[2] + (tc[2] - fc[2]) * t);
		return "#" + toHex(r) + toHex(g) + toHex(b);
	}
	// Function forms (rotate(90deg), scale(1.2), rgb(...)): interpolate the
	// argument lists pairwise when both sides use the same function.
	const ff = strMatchAll(strTrim(from), "^([%a][%w%-]*)%((.*)%)$");
	const tf = strMatchAll(strTrim(to), "^([%a][%w%-]*)%((.*)%)$");
	if (ff !== undefined && tf !== undefined && ff[0] === tf[0]) {
		const fargs = strSplit(ff[1] ?? "", ",");
		const targs = strSplit(tf[1] ?? "", ",");
		if (fargs.size() === targs.size()) {
			const parts: Array<string> = [];
			for (let ai = 0; ai < fargs.size(); ai++) {
				parts.push(interpolateValue(strTrim(fargs[ai]), strTrim(targs[ai]), t));
			}
			return ff[0] + "(" + parts.join(", ") + ")";
		}
	}
	return t < 0.5 ? from : to;
}

function toHex(n: number): string {
	const v = jsFloor(clampN(n, 0, 255));
	const hi = jsFloor(v / 16);
	const lo = v % 16;
	return HEX_DIGITS[hi] + HEX_DIGITS[lo];
}

const HEX_DIGITS: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

function parseHexColor(s: string): [number, number, number] | undefined {
	const caps = strMatchAll(strTrim(s), "^#(%x%x)(%x%x)(%x%x)$");
	if (caps !== undefined) {
		return [
			jsParseInt(caps[0] ?? "0", 16),
			jsParseInt(caps[1] ?? "0", 16),
			jsParseInt(caps[2] ?? "0", 16),
		];
	}
	return undefined;
}

function evaluateAnimation(
	anim: AnimationSpec,
	kf: KeyframeSet,
	t: number
): AnimationSample {
	const frames = kf.frames;
	if (frames.size() === 0) return { styles: {} };

	// Map absolute time onto one iteration: delay, iteration count, direction
	// (alternate flips odd iterations) and the timing function.
	const duration = anim.duration > 0 ? anim.duration : 1;
	const localTime = t - anim.delay < 0 ? 0 : t - anim.delay;
	const count = anim.iterationCount === "infinite" ? math.huge : toNum(anim.iterationCount as number | string);
	let iter = localTime / duration;
	if (iter > count) iter = count;
	let idx = jsFloor(iter);
	let frac = iter - idx;
	if (frac === 0 && idx > 0 && idx >= count) {
		// Exactly at the end: hold the final frame of the last iteration.
		idx -= 1;
		frac = 1;
	}
	const dir = anim.direction;
	let reversed = dir === "reverse";
	if (dir === "alternate") reversed = idx % 2 === 1;
	else if (dir === "alternate-reverse") reversed = idx % 2 === 0;
	const raw = reversed ? 1 - frac : frac;
	const progress = clampN(sampleTiming(anim.timingFunction, raw), 0, 1);

	let i = 0;
	for (let fi = 0; fi < frames.size(); fi++) {
		if (frames[fi].offset <= progress) {
			i = fi;
		} else {
			break;
		}
	}

	if (i >= frames.size() - 1) {
		const last = frames[frames.size() - 1];
		const result: Record<string, string> = {};
		const lkeys = keysOf(last.styles);
		for (let ki = 0; ki < lkeys.size(); ki++) {
			result[lkeys[ki]] = last.styles[lkeys[ki]];
		}
		return { styles: result };
	}

	const f0 = frames[i];
	const f1 = frames[i + 1];
	const span = f1.offset - f0.offset;
	const localT = span > 0 ? (progress - f0.offset) / span : 1;

	const props: Record<string, string> = {};
	const keys0 = keysOf(f0.styles);
	const keys1 = keysOf(f1.styles);
	const allProps: Array<string> = [];
	for (let ki = 0; ki < keys0.size(); ki++) {
		if (!allProps.includes(keys0[ki])) allProps.push(keys0[ki]);
	}
	for (let ki = 0; ki < keys1.size(); ki++) {
		if (!allProps.includes(keys1[ki])) allProps.push(keys1[ki]);
	}

	for (let pi = 0; pi < allProps.size(); pi++) {
		const prop = allProps[pi];
		const v0 = f0.styles[prop];
		const v1 = f1.styles[prop];
		if (v0 !== undefined && v1 !== undefined) {
			props[prop] = interpolateValue(v0, v1, localT);
		} else if (v0 !== undefined) {
			props[prop] = v0;
		} else if (v1 !== undefined) {
			props[prop] = v1;
		}
	}

	return { styles: props };
}

// ------------------------------------------------------------------ createEngine

export function createEngine(rules: Array<StyleRule>): Engine {
	const compiledRules: Array<CompiledRule> = [];
	for (let i = 0; i < rules.size(); i++) {
		const rule = rules[i];
		if (rule.keyframes !== undefined) continue;
		const selectors = parseSelectors(rule.selector);
		const declarations = normalizeDeclarations(rule.declarations);
		for (let si = 0; si < selectors.size(); si++) {
			compiledRules.push({
				selector: selectors[si],
				declarations,
				specificity: selectors[si].specificity,
			});
		}
	}

	const keyframeSets = parseKeyframesFromRules(rules);

	const engine: Engine = {
		computedStyle: (
			identity: ElementIdentity,
			ancestors?: Array<ElementIdentity>,
			siblingIndex?: number,
			siblingCount?: number,
			inline?: Record<string, string>
		): Record<string, string> => {
			const anc = ancestors === undefined ? [] : ancestors;
			const si = siblingIndex === undefined ? 0 : siblingIndex;
			const sc = siblingCount === undefined ? 1 : siblingCount;
			return computedStyle(compiledRules, identity, anc, si, sc, inline);
		},

		keyframes: (name: string): KeyframeSet | undefined => {
			const set = keyframeSets[name];
			if (set === undefined) return undefined;
			return { name: set.name, frames: set.frames };
		},

		parseAnimation: (value: string): Array<AnimationSpec> => {
			return parseAnimation(value);
		},

		evaluateAnimation: (
			anim: AnimationSpec,
			kf: KeyframeSet,
			t: number
		): AnimationSample => {
			return evaluateAnimation(anim, kf, t);
		},

		parseTransition: (value: string): Array<TransitionSpec> => {
			return parseTransition(value);
		},

		sampleTiming: (fn: string, p: number): number => {
			return sampleTiming(fn, p);
		},
	};

	return engine;
}
