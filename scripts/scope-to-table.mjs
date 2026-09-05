// scope-to-table pass: the Lest VM (like Roblox's Luau) caps a function at
// 200 live locals. The reconciler's dev build is one giant factory function
// with ~709 module-scope variables plus ~496 function declarations, so the
// factory is split: everything declared in its own scope moves onto a single
// ST table, leaving only the parameter and ST as locals.
//
// Usage: node scripts/scope-to-table.mjs <file>
// Reads and rewrites the tamed JS in place.
import fs from "node:fs";
import { createRequire } from "node:module";
import * as babelParser from "@babel/parser";
const cRequire = createRequire(process.cwd() + "/package.json");
const traverse = cRequire("@babel/traverse").default;
const t = cRequire("@babel/types");
const generate = cRequire("@babel/generator").default;

// --------------------------------------------------------------------------
// this -> __self pass (factory scope).
// The pipeline runs this-to-self-param.mjs BEFORE this pass, but it only sees
// the factory as one in-place FunctionExpression: nested function DECLARATIONS
// were invisible (roblox-ts never parses the tamed file, so their `this` would
// resolve to a global `self` = nil). After the split, every declaration is a
// FunctionExpression in our AST, so the same transform is applied here to the
// whole file. Mirrors scripts/this-to-self-param.mjs.
// --------------------------------------------------------------------------
const file = process.argv[2];
if (!file) {
	console.error("usage: scope-to-table.mjs <file>");
	process.exit(1);
}
let src = fs.readFileSync(file, "utf8");
const ast = babelParser.parse(src, { sourceType: "module", allowReturnOutsideFunction: true, plugins: ["jsx"] });

let selfPassCount = 0;
{
	const SELF_NAME = "__self";
	const isFunc = (n) =>
		n &&
		(n.type === "FunctionDeclaration" ||
			n.type === "FunctionExpression" ||
			n.type === "ArrowFunctionExpression" ||
			n.type === "ObjectMethod");
	// Walk without descending into nested non-arrow functions (their `this`
	// is their own); arrows inherit, so descend.
	function ownScopeWalk(node, cb) {
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
	function usesThis(node) {
		let hit = false;
		ownScopeWalk(node, (n) => {
			if (hit) return;
			if (n.type === "ThisExpression") hit = true;
		});
		return hit;
	}
	traverse(ast, {
		Function(p) {
			const node = p.node;
			if (node.type === "ArrowFunctionExpression") return;
			if (!usesThis(node.body)) return;
			p.traverse({
				ThisExpression(q) {
					let r = q.parentPath;
					while (r && r !== p) {
						if (r.isFunction() && !r.isArrowFunctionExpression()) return;
						r = r.parentPath;
					}
					q.replaceWith(t.identifier(SELF_NAME));
				},
			});
			const params = node.params;
			const selfIdx = params.findIndex((pr) => pr.type === "Identifier" && pr.name === "self");
			if (selfIdx >= 0) {
				params[selfIdx] = t.identifier(SELF_NAME);
			} else if (!params.some((pr) => pr.type === "Identifier" && pr.name === SELF_NAME)) {
				params.unshift(t.identifier(SELF_NAME));
			}
			selfPassCount++;
		},
	});
}


// The factory: the FunctionExpression assigned to __exports inside the
// NODE_ENV conditional. Pick the assigned function with the most bindings.
let factory = null;
traverse(ast, {
	Function(p) {
		const n = Object.keys(p.scope.bindings).length;
		const best = factory ? Object.keys(factory.scope.bindings).length : 0;
		if (n > best) factory = p;
	},
});
if (!factory || Object.keys(factory.scope.bindings).length < 100) {
	console.error("no factory function found in " + file);
	process.exit(1);
}

const scope = factory.scope;
const ST = "__ST";
if (scope.bindings[ST]) {
	console.error("name clash: " + ST);
	process.exit(1);
}
const body = factory.node.body.body;
// Inserted after the moved assignments below, so __ST exists first.
const stDecl = t.variableDeclaration("let", [t.variableDeclarator(t.identifier(ST), t.objectExpression([]))]);

const movedAssignments = [];

// 1) Variables: drop them from their declarations, point references at ST.
for (const [name, binding] of Object.entries(scope.bindings)) {
	if (name === ST || binding.kind === "param" || binding.kind === "hoisted") continue;
	// Writes arrive as AssignmentExpression/UpdateExpression violation paths;
	// the identifier to swap is their .left.
	const refList = binding.referencePaths.concat(binding.constantViolations || []);
	const seen = new Set();
	for (const r of refList) {
		if (!r || !r.node || r.parentPath === binding.path || seen.has(r)) continue;
		seen.add(r);
		let idPath = r;
		if (r.node.type === "AssignmentExpression" || r.node.type === "UpdateExpression") {
			idPath = r.get("left");
		}
		if (!idPath || !idPath.node || idPath.node.type !== "Identifier" || idPath.node.name !== name) continue;
		idPath.replaceWith(t.memberExpression(t.identifier(ST), t.identifier(name)));
	}
	// remove from declarations (binding.path is the VariableDeclarator)
	if (binding.kind === "block" || binding.kind === "let" || binding.kind === "const" || binding.kind === "var") {
		const declPath = binding.path.parentPath;
		if (declPath && declPath.isVariableDeclaration() && !declPath.removed) {
			declPath.node.declarations = declPath.node.declarations.filter((d) => d.id.name !== name);
			if (declPath.node.declarations.length === 0) declPath.remove();
		}
	}
}

// 2) Function declarations: become ST.<name> = function (...) at the top of
//    the body (preserving JS hoisting: every function is available before
//    any top-level statement runs).
for (const [name, binding] of Object.entries(scope.bindings)) {
	if (name === ST || binding.kind !== "hoisted") continue;
	const fnPath = binding.path;
	if (!fnPath || !fnPath.node || fnPath.removed) continue;
	// A reassignment of a declared function is a constantViolation whose
	// .left is the identifier to swap; reads come as reference paths.
	const fnRefList = binding.referencePaths.concat(binding.constantViolations || []);
	const fnSeen = new Set();
	for (const r of fnRefList) {
		if (!r || !r.node || r.parentPath === fnPath || fnSeen.has(r)) continue;
		fnSeen.add(r);
		let idPath = r;
		if (r.node.type === "AssignmentExpression" || r.node.type === "UpdateExpression") {
			idPath = r.get("left");
		}
		if (!idPath || !idPath.node || idPath.node.type !== "Identifier" || idPath.node.name !== name) continue;
		idPath.replaceWith(t.memberExpression(t.identifier(ST), t.identifier(name)));
	}
	const origFn = t.functionExpression(null, fnPath.node.params, fnPath.node.body, false, false);
	// roblox-ts emits member calls on an identifier receiver as colon calls
	// (`__ST:name(...)`), which injects the table as the first argument; the
	// emitted value is also reachable as a plain function. Accept both:
	// a leading __ST argument is stripped before forwarding.
	const wrapper = t.functionExpression(null, [t.restElement(t.identifier("__args"))],
		t.blockStatement([
			t.ifStatement(
				t.binaryExpression("===", t.memberExpression(t.identifier("__args"), t.numericLiteral(0), true), t.identifier(ST)),
				t.blockStatement([t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("__args"), t.identifier("shift")), []))]),
				null
			),
			t.returnStatement(t.callExpression(origFn, [t.spreadElement(t.identifier("__args"))])),
		]));
	const assign = t.expressionStatement(t.assignmentExpression("=", t.memberExpression(t.identifier(ST), t.identifier(name)), wrapper));
	movedAssignments.push(assign);
	fnPath.replaceWith(t.emptyStatement());
}
// Moved let bindings keep their original assignment statements as
// `__ST.name = value`. Route those through __spikeSetST so function
// values get the call-convention wrapper (the compiler emits colon calls
// on identifier receivers, which inject the ST table).
const letNames = Object.keys(scope.bindings).filter((n) => {
	const b = scope.bindings[n];
	return b.kind !== "param" && b.kind !== "hoisted";
});
traverse(ast, {
	AssignmentExpression(p) {
		const left = p.node.left;
		if (
			p.parentPath.isExpressionStatement() &&
			left.type === "MemberExpression" &&
			!left.computed &&
			left.object.type === "Identifier" &&
			left.object.name === ST &&
			left.property.type === "Identifier" &&
			letNames.includes(left.property.name)
		) {
			p.parentPath.replaceWith(
				t.expressionStatement(
					t.callExpression(t.identifier("__spikeSetST"), [
						t.identifier(ST),
						t.stringLiteral(left.property.name),
						p.node.right,
					])
				)
			);
		}
	},
});
for (const a of movedAssignments) {
	body.unshift(a);
}
body.unshift(stDecl);

// __new call-site fix: __new(fn, ...) builds the instance and calls
// fn(instance, ...rest). The constructors above got a leading __self param,
// so __new's instance must be passed as __self with a JS undefined first
// (roblox-ts elides an undefined call argument: it never reaches the
// function at runtime).
let newCallCount = 0;
for (const name of Object.keys(scope.bindings)) {
	const binding = scope.bindings[name];
	if (binding.kind !== "function" && binding.kind !== "hoisted") continue;
	const refList = binding.referencePaths.concat(binding.constantViolations || []);
	for (const r of refList) {
		if (!r || !r.node || r.parentPath === binding.path) continue;
		if (r.node.type !== "Identifier" || r.node.name !== name) continue;
		const parent = r.parentPath;
		if (!parent) continue;
		let callExpr = null;
		let callPath = null;
		let memberPath = null;
		if (parent.isMemberExpression() && parent.node.object === r.node) {
			const g = parent.parentPath;
			if (g && g.isCallExpression() && g.node.callee === parent.node) {
				callExpr = g.node;
				callPath = g;
				memberPath = parent;
			}
		}
		if (!callExpr) continue;
		// Only rewrite calls made through __new.
		const callee0 = callExpr.arguments[0];
		if (
			!callee0 ||
			callee0.type !== "Identifier" ||
			callee0.name !== "__new"
		) {
			continue;
		}
		// Skip if an undefined argument is already present.
		const first = callExpr.arguments[1];
		if (first && first.type === "Identifier" && first.name === "undefined") continue;
		callExpr.arguments.splice(1, 0, t.identifier("undefined"));
		newCallCount++;
	}
}

const out = generate(ast, { retainLines: false, compact: false }).code;
fs.writeFileSync(file, out);
console.log(
	`scope-to-table ${file}: ${Object.keys(scope.bindings).length} bindings moved to ${ST}, this-pass ${selfPassCount} fns, __new fixes ${newCallCount}`,
);