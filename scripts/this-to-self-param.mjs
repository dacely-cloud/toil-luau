// this-to-self-param pass, v2.
// In untyped JS, roblox-ts renames `this` to `self` but only injects the
// `self` parameter for typed-this or method positions; a plain function
// declaration ends up referencing a global `self` (nil). roblox-ts also
// reserves the identifier `self` for its own injection, so an explicit
// `self` parameter in a declaration is a compile error.
//
// Deterministic fix, done here instead: rename every `this` in the body of
// a function that uses `this` to the identifier `__self`, and give the
// function a leading `__self` parameter (reusing a previously added `self`
// parameter when present). Arrows inherit `this` from their parent, so they
// are left alone.
import fs from "node:fs";
import { createRequire } from "node:module";
import * as babelParser from "@babel/parser";
const cRequire = createRequire(process.cwd() + "/package.json");
const traverse = cRequire("@babel/traverse").default;
const generate = cRequire("@babel/generator").default;
const t = cRequire("@babel/types");

const SELF_NAME = "__self";

const files = process.argv.slice(2);
for (const file of files) {
	if (file.endsWith(".d.ts")) continue;
	let src = fs.readFileSync(file, "utf8");
	const isTS = file.endsWith(".ts") || file.endsWith(".tsx");
	const plugins = isTS ? ["typescript", "jsx"] : ["jsx"];
	const ast = babelParser.parse(src, { sourceType: "module", allowReturnOutsideFunction: true, plugins });

	const isFunc = (n) =>
		n &&
		(n.type === "FunctionDeclaration" ||
			n.type === "FunctionExpression" ||
			n.type === "ArrowFunctionExpression" ||
			n.type === "ObjectMethod");

	function walk(node, cb) {
		if (!node || typeof node !== "object") return;
		if (Array.isArray(node)) {
			for (const c of node) walk(c, cb);
			return;
		}
		cb(node);
		for (const k of Object.keys(node)) {
			if (k === "type" || k === "loc" || k === "start" || k === "end" || k === "extra") continue;
			walk(node[k], cb);
		}
	}
	function ownScopeWalk(node, cb) {
		// Walk a function's body without descending into nested non-arrow
		// functions (their `this` is their own); arrows inherit, so descend.
		if (!node || typeof node !== "object") return;
		if (Array.isArray(node)) {
			for (const c of node) ownScopeWalk(c, cb);
			return;
		}
		cb(node);
		for (const k of Object.keys(node)) {
			if (k === "type" || k === "loc" || k === "start" || k === "end" || k === "extra") continue;
			const v = node[k];
			if (v && typeof v === "object") {
				if (Array.isArray(v)) {
					for (const c of v) {
						if (isFunc(c) && c.type !== "ArrowFunctionExpression") continue;
						ownScopeWalk(c, cb);
					}
				} else if (v.type) {
					if (isFunc(v) && v.type !== "ArrowFunctionExpression") continue;
					ownScopeWalk(v, cb);
				}
			}
		}
	}
	function hasSelfRef(node) {
		let hit = false;
		ownScopeWalk(node, (n) => {
			if (hit) return;
			if (n.type === "Identifier" && n.name === SELF_NAME) hit = true;
		});
		return hit;
	}
	function usesThis(node) {
		let hit = false;
		ownScopeWalk(node, (n) => {
			if (n.type === "ThisExpression") hit = true;
		});
		return hit;
	}
	function renameThis(fnPath) {
		fnPath.traverse({
			ThisExpression(p) {
				let q = p.parentPath;
				while (q && q !== fnPath) {
					if (q.isFunction() && !q.isArrowFunctionExpression()) return;
					q = q.parentPath;
				}
				p.replaceWith(t.identifier(SELF_NAME));
			},
		});
	}
let n = 0;
traverse(ast, {
	Function(p) {
		const node = p.node;
		if (node.type === "ArrowFunctionExpression") return;
		const hasThis = usesThis(node.body);
		if (hasThis) renameThis(p);
		const outerHas = p.scope.hasBinding(SELF_NAME);
		const bodyRefsSelf = !outerHas && hasSelfRef(node.body);
		if (!hasThis && !bodyRefsSelf) return;
		const params = node.params;
		let changed = false;
		const selfIdx = params.findIndex((pr) => pr.type === "Identifier" && pr.name === "self");
		if (selfIdx >= 0) {
			params[selfIdx] = t.identifier(SELF_NAME);
			changed = true;
		} else if (!params.some((pr) => pr.type === "Identifier" && pr.name === SELF_NAME)) {
			params.unshift(t.identifier(SELF_NAME));
			changed = true;
		}
		if (changed || hasThis) {
			n++;
		}
	},
});
if (n > 0) {
	fs.writeFileSync(file, generate(ast, { retainLines: false }).code);
}
console.log(`this-pass ${file}: ${n} functions adjusted`);
}
