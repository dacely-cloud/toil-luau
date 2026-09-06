/**
 * Pure CSS text loader for the Roblox host.
 *
 * Turns a CSS stylesheet as a string (inline `<style>` text, an external
 * `*.css` file read at load time, or a template literal) into the `StyleRule[]`
 * shape the cascade engine (src/css/engine.ts) already consumes. No Roblox
 * service access, no `game`, no `Instance`, no scheduler: it runs on the plain
 * Luau VM (Lest native backend) and on the Roblox runtime alike, exactly like
 * the pure engine beside it.
 *
 * What it parses:
 *   - normal rules:        `selector { prop: value; ... }` (incl. comma groups)
 *   - at-rules with blocks: `@media (max-width: 600px) { ... }` (nested rules)
 *   - at-rules with bodies: `@keyframes name { 0% {..} 100% {..} }` (frames)
 *   - at-rules with args:   `@import "url.css";`
 *   - comments:             `/* ... *\/` (including line comments `--`)
 *
 * String handling follows the house pattern in engine.ts (module-local
 * `string.match` / `string.sub` / `string.gmatch` helpers). roblox-ts keeps
 * `string` as the native Luau string type, so these emit as direct
 * `s:match(...)` / `s:sub(...)` calls and no runtime global is needed.
 */

import type { StyleRule } from "../host/engine-types";

// ------------------------------------------------------------------ string helpers
// Module-local mirrors of engine.ts's string helpers. Kept private to this
// module so the loader has zero runtime global dependencies (the Lest css
// spec requires it directly, outside the spike env that installs those
// globals). Behavior is identical to the engine's helpers.

function strTrim(s: string): string {
	const m = string.match(s, "^%s*(.-)%s*$");
	return (m[0] as unknown) as string;
}

/** Strip trailing whitespace. */
function rtrim(s: string): string {
	const m = string.match(s, "^(.-)%s*$");
	return (m[0] as unknown) as string;
}

/** Lowercase a string (Luau builtin, since noLib gives no String.prototype). */
function strLower(s: string): string {
	return (string.lower(s) as unknown) as string;
}

function slice(s: string, start: number, finish?: number): string {
	if (finish === undefined) return (string.sub(s, start) as unknown) as string;
	return (string.sub(s, start, finish) as unknown) as string;
}

function strFind(s: string, pattern: string, init: number, plain: boolean): number | undefined {
	const r = (string.find(s, pattern, init, plain) as unknown) as number | undefined;
	return r;
}

/** True if `s` has `prefix` at the start. */
function startsWith(s: string, prefix: string): boolean {
	return s.size() >= prefix.size() && slice(s, 1, prefix.size()) === prefix;
}

/**
 * Normalize a CSS selector or at-rule head that was rebuilt from tokens.
 * The token stream drops whitespace, so we join tokens with spaces and then
 * need to collapse artifacts:
 *   - "@ keyframes" -> "@keyframes" (at-sign + ident)
 *   - "a , b , c"   -> "a, b, c"   (comma selectors)
 *   - multiple spaces -> one
 */
function normalizeHead(s: string): string {
	let out = s;
	// Collapse "@ " (at-sign followed by space) into "@".
	out = (string.gsub(out, "@ (%S)", "@%1") as unknown) as string;
	// Collapse " ," into "," and ", " into ",".
	out = (string.gsub(out, " ,", ", ") as unknown) as string;
	out = (string.gsub(out, " %.", ".") as unknown) as string;
	// Collapse spaces around \": : ( )
	out = (string.gsub(out, " : ", ":") as unknown) as string;
	out = (string.gsub(out, " %( ", "(") as unknown) as string;
	out = (string.gsub(out, " %)", ")") as unknown) as string;
	// Collapse multiple spaces into one.
	out = (string.gsub(out, "%s%s+", " ") as unknown) as string;
	return strTrim(out);
}


/**
 * Collect the keys of a record table (pure Luau, no Roblox Object:keys).
 */
function tableKeys(rec: Record<string, string>): Array<string> {
	const keys: Array<string> = [];
	let k: unknown;
	while (true) {
		k = (next as unknown as (t: Record<string, string>, k: unknown) => unknown)(rec, k);
		if (k === undefined) break;
		keys.push(k as string);
	}
	return keys;
}
// ------------------------------------------------------------------ token stream

/**
 * A single token of the CSS source. The lexer reduces the stylesheet to a
 * flat list of these; the parser walks the list with an index.
 */
interface Token {
	kind: "ident" | "string" | "number" | "punct" | "comment" | "ws";
	text: string;
	/** 1-based 1-origin position in the source (for diagnostics). */
	pos: number;
}

/**
 * Lex a CSS source into tokens. The lexer is line-oriented: it walks the
 * source character by character, classifying each run. Comments are kept
 * (kind "comment") so the parser can decide whether to skip them at the
 * top level (they are whitespace-equivalent) or drop them inside a block
 * (they are also whitespace-equivalent there; we just skip them).
 *
 * Whitespace is collapsed to a single "ws" token per run.
 */
function lex(src: string): Array<Token> {
	const out: Array<Token> = [];
	let i = 1;
	const n = src.size();
	while (i <= n) {
		const c = slice(src, i, i);

		// Line comment: -- to end of line
		if (c === "-" && i + 1 <= n && slice(src, i + 1, i + 1) === "-") {
			let j = i + 2;
			while (j <= n && slice(src, j, j) !== "\n") j++;
			out.push({ kind: "comment", text: slice(src, i, j - 1), pos: i });
			i = j;
			continue;
		}
		// Block comment: /* to */
		if (c === "/" && i + 1 <= n && slice(src, i + 1, i + 1) === "*") {
			let j = i + 2;
			while (j + 1 <= n && !(slice(src, j, j) === "*" && slice(src, j + 1, j + 1) === "/")) j++;
			out.push({ kind: "comment", text: slice(src, i, j + 1), pos: i });
			i = j + 2;
			continue;
		}
		// Whitespace run
		if (c === " " || c === "\t" || c === "\n" || c === "\r" || c === "\f") {
			let j = i;
			while (j <= n) {
				const cj = slice(src, j, j);
				if (cj === " " || cj === "\t" || cj === "\n" || cj === "\r" || cj === "\f") j++;
				else break;
			}
			out.push({ kind: "ws", text: slice(src, i, j - 1), pos: i });
			i = j;
			continue;
		}
		// String: single or double quoted
		if (c === '"' || c === "'") {
			let j = i + 1;
			while (j <= n) {
				const cj = slice(src, j, j);
				if (cj === c) {
					j++;
					break;
				}
				// Escaped quote
				if (cj === "\\" && j + 1 <= n) {
					j += 2;
					continue;
				}
				j++;
			}
			out.push({ kind: "string", text: slice(src, i, j - 1), pos: i });
			i = j;
			continue;
		}
		// Punctuation: single characters
		if (c === "{" || c === "}" || c === ";" || c === ":" || c === "," || c === "(" || c === ")" || c === "@") {
			out.push({ kind: "punct", text: c, pos: i });
			i++;
			continue;
		}
		// Ident / number / at-rule keyword / any other run:
		//   read until whitespace, semicolon, or brace
		let j = i;
		while (j <= n) {
			const cj = slice(src, j, j);
			if (cj === " " || cj === "\t" || cj === "\n" || cj === "\r" || cj === "\f") break;
			if (cj === "{" || cj === "}" || cj === ";" || cj === ":" || cj === "," || cj === "(" || cj === ")") break;
			if (cj === "/" && j + 1 <= n && slice(src, j + 1, j + 1) === "*") break;
			if (cj === "-" && j + 1 <= n && slice(src, j + 1, j + 1) === "-") break;
			j++;
		}
		const text = slice(src, i, j - 1);
		out.push({ kind: "ident", text, pos: i });
		i = j;
	}
	return out;
}

// ------------------------------------------------------------------ skip / peek helpers

/**
 * Skip whitespace and comments. Returns the next token that is neither, or
 * undefined at end-of-input.
 */
function nextToken(tokens: Array<Token>, from: number): [Token | undefined, number] {
	let i = from;
	while (i < tokens.size()) {
		const t = tokens[i];
		if (t.kind === "ws" || t.kind === "comment") {
			i++;
			continue;
		}
		return [t, i];
	}
	return [undefined, i];
}

/**
 * Collect tokens up to (but not including) the first `}` at the current
 * brace depth, or up to end-of-input. The collected range is [start, stop)
 * where `stop` is the index of the closing `}` (or end). The caller is
 * responsible for consuming the closing brace.
 */
function collectUntilClose(tokens: Array<Token>, start: number): [Array<Token>, number] {
	const out: Array<Token> = [];
	let depth = 1;
	let i = start;
	while (i < tokens.size()) {
		const t = tokens[i];
		if (t.kind === "punct") {
			if (t.text === "{") depth++;
			if (t.text === "}") {
				depth--;
				if (depth === 0) break;
			}
		}
		out.push(t);
		i++;
	}
	return [out, i];
}

// ------------------------------------------------------------------ rule parsing

/**
 * Parse a declaration block body (the tokens between `{` and `}` of a normal
 * rule) into a `prop: value` record. Semicolons separate declarations; the
 * last declaration may omit the trailing semicolon.
 */
function parseDeclarations(tokens: Array<Token>): Record<string, string> {
	const out: Record<string, string> = {};
	let i = 0;
	while (i < tokens.size()) {
		const [propTok, afterProp] = nextToken(tokens, i);
		if (propTok === undefined) break;
		// Find the `:` that ends the property name.
		let colonIdx = afterProp + 1;
		let colon = "";
		while (colonIdx < tokens.size()) {
			const t = tokens[colonIdx];
			if (t.kind === "punct" && t.text === ":") {
				colon = ":";
				break;
			}
			// A semicolon without a colon: malformed; skip it
			if (t.kind === "punct" && t.text === ";") {
				break;
			}
			if (t.kind === "punct" && t.text === "{") {
				break;
			}
			colonIdx++;
		}
		if (colon !== ":") {
			// No colon found; skip to the next semicolon
			while (colonIdx < tokens.size() && !(tokens[colonIdx].kind === "punct" && tokens[colonIdx].text === ";")) {
				colonIdx++;
			}
			i = colonIdx + 1;
			continue;
		}
		// Property name: tokens from i (after propTok, we already have it) up to the colon.
		const propParts: Array<string> = [];
		for (let pi = i; pi < colonIdx; pi++) {
			const pt = tokens[pi];
			if (pt.kind === "ws") continue;
			if (pt.kind === "comment") continue;
			propParts.push(pt.text);
		}
		const prop = strLower(propParts.join(""));

		// Value: tokens after the colon up to `;` or end.
		const valueParts: Array<string> = [];
		let vi = colonIdx + 1;
		while (vi < tokens.size()) {
			const vt = tokens[vi];
			if (vt.kind === "punct" && vt.text === ";") break;
			if (vt.kind === "ws") {
				// collapse whitespace to a single space
				if (valueParts.size() > 0 && valueParts[valueParts.size() - 1] !== " ") {
					valueParts.push(" ");
				}
				vi++;
				continue;
			}
			if (vt.kind === "comment") {
				vi++;
				continue;
			}
			valueParts.push(vt.text);
			vi++;
		}
		const value = rtrim(valueParts.join(""));

		if (prop.size() > 0 && value.size() > 0) {
			out[prop] = value;
		}
		// Advance past the semicolon (or end).
		if (vi < tokens.size() && tokens[vi].kind === "punct" && tokens[vi].text === ";") {
			i = vi + 1;
		} else {
			i = vi;
		}
	}
	return out;
}

/**
 * Parse a keyframes block body (the tokens between `{` and `}` of an
 * `@keyframes name` block) into `offset -> "prop: value; prop: value; ..."`.
 * Each frame has an offset (`0%`, `50%`, `100%`, `from`, `to`) followed by a
 * `{ ... }` of declarations.
 */
function parseKeyframesBody(tokens: Array<Token>): Record<string, string> {
	const out: Record<string, string> = {};
	let i = 0;
	while (i < tokens.size()) {
		const [offsetTok, afterOffset] = nextToken(tokens, i);
		if (offsetTok === undefined) break;
		// Find the opening `{` of the frame.
		let braceIdx = afterOffset + 1;
		while (braceIdx < tokens.size()) {
			const t = tokens[braceIdx];
			if (t.kind === "punct" && t.text === "{") break;
			braceIdx++;
		}
		if (braceIdx >= tokens.size()) break;
		// Offset label: tokens from i to braceIdx (excluding the brace).
		const offsetParts: Array<string> = [];
		for (let oi = i; oi < braceIdx; oi++) {
			const ot = tokens[oi];
			if (ot.kind === "ws") continue;
			if (ot.kind === "comment") continue;
			offsetParts.push(ot.text);
		}
		const offset = strLower(offsetParts.join(""));

		// Frame body: collect until the matching `}`.
		const [body, stop] = collectUntilClose(tokens, braceIdx + 1);
		const decls = parseDeclarations(body);
		// Encode as "prop: value; prop: value" so the engine's
		// keyframesFromDeclarations can re-split on ";" and then on ":".
		const parts: Array<string> = [];
		const keys = tableKeys(decls);
		for (let ki = 0; ki < keys.size(); ki++) {
			const k = keys[ki];
			const v = decls[k];
			if (v !== undefined) {
				parts.push(k + ": " + v);
			}
		}
		const frame = parts.join("; ");
		if (offset.size() > 0 && frame.size() > 0) {
			out[offset] = frame;
		}
		i = stop + 1;
	}
	return out;
}

/**
 * Parse a top-level stylesheet into the `StyleRule[]` shape the cascade
 * engine consumes.
 *
 * - Normal rules: `{ selector, declarations }`.
 * - `@keyframes name`: `{ selector: "@keyframes name", keyframes: <frames> }`.
 * - `@media (...)`: nested rules are inlined; each nested rule carries the
 *   media query on its `media` field.
 * - `@import "url"`: `{ selector: "@import", importFrom: url }`.
 */
export function parseCss(source: string): Array<StyleRule> {
	const tokens = lex(source);
	const rules: Array<StyleRule> = [];
	let i = 0;

	// Parse a list of rules at the given level, carrying the active media
	// query down to nested rules.
	function parseRuleList(levelTokens: Array<Token>, mediaQuery: string | undefined): void {
		let li = 0;
		while (li < levelTokens.size()) {
			const [headTok, afterHead] = nextToken(levelTokens, li);
			if (headTok === undefined) break;

			// Find the next `{` or `;` from the head.
			let nextBrace = -1;
			let nextSemi = -1;
			let depth = 0;
			for (let bi = afterHead; bi < levelTokens.size(); bi++) {
				const bt = levelTokens[bi];
				if (bt.kind === "punct") {
					if (bt.text === "(") depth++;
					if (bt.text === ")") depth--;
					if (depth === 0) {
						if (bt.text === "{") {
							nextBrace = bi;
							break;
						}
						if (bt.text === ";") {
							nextSemi = bi;
							break;
						}
					}
				}
			}

			// Case 1: at-rule with a semicolon (no block): @import
			if (nextSemi >= 0 && (nextBrace < 0 || nextSemi < nextBrace)) {
				const atParts: Array<string> = [];
				for (let pi = li; pi < nextSemi; pi++) {
					const pt = levelTokens[pi];
					if (pt.kind === "ws") continue;
					if (pt.kind === "comment") continue;
					atParts.push(pt.text);
				}
				const atLine = atParts.join("");
				if (startsWith(atLine, "@import")) {
					// Extract the url (quoted or bare)
					const afterAt = slice(atLine, "@import".size() + 1);
					const qm = string.match(afterAt, '^%s*["\'](%S+)["\']');
					const q = (qm[0] as unknown) as string | undefined;
					let url: string;
					if (q !== undefined) {
						url = q;
					} else {
						// No quotes: take everything up to the first `;` (or the whole string).
						const semi = strFind(afterAt, ";", 1, true);
						url = semi === undefined ? strTrim(afterAt) : slice(afterAt, 1, semi - 1);
					}
					rules.push({ selector: "@import", importFrom: url });
				}
				li = nextSemi + 1;
				continue;
			}

			// Case 2: rule with a block (normal rule, @keyframes, @media)
			if (nextBrace >= 0) {
				const headParts: Array<string> = [];
				for (let pi = li; pi < nextBrace; pi++) {
					const pt = levelTokens[pi];
					if (pt.kind === "ws") continue;
					if (pt.kind === "comment") continue;
					headParts.push(pt.text);
				}
				const head = normalizeHead(headParts.join(" "));

				// Body: collect until the matching `}`.
				const [body, stop] = collectUntilClose(levelTokens, nextBrace + 1);

				if (startsWith(head, "@keyframes")) {
					const name = strTrim(slice(head, "@keyframes".size() + 1));
					const frames = parseKeyframesBody(body);
					rules.push({ selector: "@keyframes " + name, keyframes: "frames", declarations: frames });
				} else if (startsWith(head, "@media")) {
					const query = normalizeHead(slice(head, "@media".size() + 1));
					parseRuleList(body, query);
				} else {
					// Normal rule
					const decls = parseDeclarations(body);
					const rule: StyleRule = { selector: normalizeHead(head), declarations: decls };
					if (mediaQuery !== undefined) {
						rule.media = mediaQuery;
					}
					rules.push(rule);
				}
				li = stop + 1;
				continue;
			}

			// Case 3: neither `;` nor `{` found before end: trailing junk, skip.
			li = levelTokens.size();
		}
	}

	parseRuleList(tokens, undefined);
	return rules;
}

/**
 * Build a CSS engine from a stylesheet string. Convenience wrapper over
 * `parseCss` + `createEngine` so callers can do
 * `mountWithCss(cssText, element)` in one call.
 */
export function cssToRules(source: string): Array<StyleRule> {
	return parseCss(source);
}