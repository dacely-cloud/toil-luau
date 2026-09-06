#!/usr/bin/env node
/**
 * tame-vendor.mjs — rewrite the vendored React 19 CJS builds into the
 * Luau-friendly subset that roblox-ts can compile and the polyfill globals in
 * src/polyfills.ts can execute.
 *
 * Run:  node scripts/tame-vendor.mjs            (on PRISTINE vendor)
 * Restore first: ./restore-vendor.sh
 *
 * The rewrite is Babel-AST based (not regex) so minified line layout does not
 * matter. Phases, in order:
 *
 *   1. rename-reserved  — local bindings named after a Luau-reserved identifier
 *      (type, error, next, table, ...) become __<name> so roblox-ts does not
 *      reject them as "reserved for compiler internal usage".
 *   2. cjs-to-es        — turn each CJS module into an ES module:
 *        const X = require("pkg")  ->  import X from "pkg"
 *        exports.foo = v           ->  __exports.foo = v
 *        module.exports = v        ->  __exports = v
 *        (top)                     +  let __exports = {}
 *        (bottom)                  +  export default __exports
 *      roblox-ts compiles `export default __exports` to `return {default=...}`
 *      and `import X from` to `TS.import(...).default`, so the CJS exports
 *      object survives the round trip intact.
 *   2.5. desugar-labels — roblox-ts rejects every LabeledStatement ("labels
 *      are not supported!") and every labeled break/continue. Closure emits
 *      49 of them in the React 19 builds. Each labeled statement is wrapped
 *      in a flag-guarded loop so that a labeled jump from any depth unwinds
 *      correctly (verified for this vendor: every labeled jump stays within
 *      the same function as its label, so a `let` flag closure is sound):
 *        L: { S }                    L: for (i; c; u) { S }
 *        -> while (!F) { S' ; break } -> while (!F) { C = false;
 *                                          while (c) { S' ; u }
 *                                          if (C) { C = false; u; continue }
 *                                          break }
 *      where `break L` -> { F = true; break } and `continue L` ->
 *      { C = true; break }, and `if (F || C) break;` is inserted after every
 *      statement that sits after a nested loop the jump may have escaped.
 *      For loop labels the desugared form is semantics-identical to an
 *      unlabeled loop plus the flag unwinding; for non-loop labels `continue
 *      L` degrades to `break L` (sloppy-mode semantics).
 *   3. var-to-let       — roblox-ts has no `var` keyword.
 *   4. syntax rewrites  — the Luau-unfriendly constructs (typeof, null, `+`,
 *      `in`, .length, .prototype, regex literals, `new X`, .call/.apply/.bind,
 *      array/string methods, `arguments`) are routed to the declared `__*`
 *      helpers / JS-semantic globals.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import * as babelParser from "@babel/parser";
import * as t from "@babel/types";

const cRequire = createRequire(import.meta.url);
const traverse = cRequire("@babel/traverse").default;
const generate = cRequire("@babel/generator").default;

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const vendorDir = path.join(root, "src", "vendor");

/**
 * Identifiers that refer to the polyfill-installed globals. Method calls on
 * these are plain table calls at runtime, so they are NOT rewritten to __*
 * helpers (except the specific statics handled below).
 */
const GLOBAL_NAMES = new Set([
	"Object", "Math", "JSON", "Date", "console", "Symbol", "Error", "String",
	"Number", "Boolean", "Function", "process", "module", "globalThis",
	"queueMicrotask", "setTimeout", "clearTimeout", "setImmediate",
	"clearImmediate", "performance", "Promise", "Array", "Map", "Set",
	"MessageChannel", "AbortController", "AggregateError", "reportError",
	"IS_REACT_ACT_ENVIRONMENT", "undefined", "null", "Proxy", "self",
	"document", "BigInt", "WeakRef", "Atomics", "SharedArrayBuffer",
]);

/**
 * Luau-reserved identifiers (from @roblox-ts/luau-ast globals). A LOCAL binding
 * (parameter or var/let/const) with one of these names must be renamed, or
 * roblox-ts emits "reserved for compiler internal usage". The CJS globals
 * `require` and `exports` are handled by cjs-to-es instead.
 */
const RESERVED_LOCALS = new Set([
	"_G", "TS", "assert", "bit32", "coroutine", "error", "getmetatable",
	"ipairs", "next", "pairs", "pcall", "script", "select", "self",
	"setmetatable", "string", "super", "table", "utf8", "math", "tostring",
	"type", "typeof", "unpack", "game",
]);

/**
 * Methods that do not exist on plain Luau tables/strings and are rewritten to
 * the polymorphic __<name>(x, ...) helpers.
 */
const POLY_METHODS = new Set([
	"push", "pop", "shift", "unshift", "splice", "slice", "concat",
	"indexOf", "includes", "join", "map", "filter", "forEach", "sort",
	"reverse", "fill", "flat", "flatMap", "find", "findIndex", "every",
	"some", "at", "split", "replace", "trim", "toLowerCase", "toUpperCase",
	"match", "charAt", "charCodeAt", "startsWith", "endsWith", "repeat",
	"substring", "search",
]);

function callExpr(name, args) {
	return t.callExpression(t.identifier(name), args);
}
function isGlobalReceiver(node) {
	return t.isIdentifier(node) && GLOBAL_NAMES.has(node.name);
}

// --------------------------------------------------------------------------
// Phase 1: rename reserved local bindings.
// --------------------------------------------------------------------------
function renameReservedLocals(ast, stats) {
	const renamed = new Set();
	traverse(ast, {
		Identifier(p) {
			const name = p.node.name;
			if (!RESERVED_LOCALS.has(name)) return;
			// Property access (obj.name) is not a free reference.
			if (t.isMemberExpression(p.parent) && p.parent.property === p.node && !p.parent.computed) return;
			const binding = p.scope.getBinding(name);
			if (!binding || binding.kind === "module") return; // global / import
			if (renamed.has(binding.identifier)) return;
			renamed.add(binding.identifier);
			binding.scope.rename(name, `__${name}`);
			stats.reservedRenamed += 1;
		},
	});
}

// --------------------------------------------------------------------------
// Phase 1.5: `$` in identifiers is not a valid Luau identifier char.
//
// Babel/Closure renames (foo$jscomp$0, error$2, _finishedWork$memoize, ...)
// sprinkle `$` through LOCAL bindings. Replace each `$` with `_` via a
// scope-aware rename so every reference updates too. These are all locals, so
// renaming cannot collide with a global the way a text substitution could.
// --------------------------------------------------------------------------
function sanitizeDollarIdentifiers(ast, stats) {
	const renamed = new Set();
	traverse(ast, {
		Identifier(p) {
			const name = p.node.name;
			if (!name.includes("$")) return;
			if (t.isMemberExpression(p.parent) && p.parent.property === p.node && !p.parent.computed) return;
			const binding = p.scope.getBinding(name);
			if (!binding || binding.kind === "module") return; // global / import: leave (none expected)
			if (renamed.has(binding.identifier)) return;
			renamed.add(binding.identifier);
			binding.scope.rename(name, name.replace(/\$/g, "_"));
			stats.dollarRenamed += 1;
		},
	});
}

// --------------------------------------------------------------------------
// Phase 2: CJS -> ES module.
// --------------------------------------------------------------------------
function cjsToEs(ast, stats) {
	const program = ast.program;
	const body = program.body;
	const importsToAdd = [];
	let impCounter = 0;
	let sawExports = false;
	let sawModuleExports = false;
	let sawRequire = false;

	// 2a. require("pkg") -> import.
	traverse(ast, {
		CallExpression(p) {
			const { callee, arguments: args } = p.node;
			if (!t.isIdentifier(callee) || callee.name !== "require") return;
			const first = args[0];
			if (!t.isStringLiteral(first)) return; // only literal specifiers
			sawRequire = true;
			const parent = p.parent;

			// const X = require("pkg")  ->  import X from "pkg"
			if (t.isVariableDeclarator(parent) && parent.init === p.node) {
				const name = t.isIdentifier(parent.id) ? parent.id.name : null;
				if (name !== null) {
					importsToAdd.push(t.importDeclaration([t.importDefaultSpecifier(t.identifier(name))], first));
					const declPath = p.parentPath; // VariableDeclarator path
					const declNode = declPath.parent; // VariableDeclaration node
					if (declNode.declarations.length === 1) {
						declPath.parentPath.remove(); // drop the now-empty statement
					} else {
						declPath.remove(); // drop just this declarator, keep the rest
					}
					stats.requireImport += 1;
					return;
				}
			}

			// Any other require(...) -> import __req_N from "pkg"; use __req_N.
			const tmp = `__req_${impCounter++}`;
			importsToAdd.push(t.importDeclaration([t.importDefaultSpecifier(t.identifier(tmp))], first));
			p.replaceWith(t.identifier(tmp));
			stats.requireImport += 1;
		},
		// Track exports / module.exports usage.
		Identifier(p) {
			if (p.node.name === "exports" && !t.isMemberExpression(p.parent)) sawExports = true;
			if (p.node.name === "exports" && t.isMemberExpression(p.parent) && p.parent.object === p.node) sawExports = true;
		},
		MemberExpression(p) {
			const { object, property } = p.node;
			if (t.isIdentifier(object) && object.name === "module" && !p.node.computed && t.isIdentifier(property) && property.name === "exports") {
				sawModuleExports = true;
			}
		},
	});

	const isCjs = sawExports || sawModuleExports || sawRequire;
	if (!isCjs) return;

	// 2b. module.exports -> __exports ; exports -> __exports.
	traverse(ast, {
		MemberExpression(p) {
			const { object, property } = p.node;
			if (t.isIdentifier(object) && object.name === "module" && !p.node.computed && t.isIdentifier(property) && property.name === "exports") {
				p.replaceWith(t.identifier("__exports"));
				stats.moduleExports += 1;
			}
		},
		Identifier(p) {
			if (p.node.name !== "exports") return;
			// Skip when it is the property of a member expr (obj.exports) — handled above only for module.exports.
			if (t.isMemberExpression(p.parent) && p.parent.property === p.node) return;
			p.replaceWith(t.identifier("__exports"));
			stats.exportsRef += 1;
		},
	});

	// 2c. Inject `let __exports = {}` after the "use strict" directive (or at the very top).
	const exportsDecl = t.variableDeclaration("let", [t.variableDeclarator(t.identifier("__exports"), t.objectExpression([]))]);
	let insertAt = 0;
	for (let i = 0; i < body.length; i++) {
		const st = body[i];
		if (t.isExpressionStatement(st) && t.isStringLiteral(st.expression) && st.expression.value === "use strict") {
			insertAt = i + 1;
		}
	}
	body.splice(insertAt, 0, exportsDecl);

	// 2d. Add the hoisted imports at the very top (before "use strict" is fine, but
	// keep directives first). Import declarations must precede all statements.
	importsToAdd.reverse().forEach((imp) => body.splice(insertAt, 0, imp));

	// 2e. roblox-ts refuses `export default <let>`; alias __exports into a const
	// first. Also collect the `__exports.foo = ...` names so named imports such as
	// `import { useState } from "@toil/react"` resolve at runtime, and re-export them.
	const assignedNames = new Set();
	traverse(ast, {
		AssignmentExpression(p) {
			const lhs = p.node.left;
			if (
				t.isMemberExpression(lhs) &&
				t.isIdentifier(lhs.object) && lhs.object.name === "__exports" &&
				!lhs.computed && t.isIdentifier(lhs.property)
			) {
				assignedNames.add(lhs.property.name);
			}
		},
	});
	const constDecls = [t.variableDeclarator(t.identifier("__default"), t.identifier("__exports"))];
	const exportable = [...assignedNames]
		.filter((n) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(n) && n !== "default" && n !== "__esModule")
		.sort();
	const specifiers = [];
	for (const n of exportable) {
		const local = `__n_${n}`;
		constDecls.push(
			t.variableDeclarator(
				t.identifier(local),
				t.memberExpression(t.identifier("__exports"), t.identifier(n)),
			),
		);
		specifiers.push(t.exportSpecifier(t.identifier(local), t.identifier(n)));
	}
	body.push(t.variableDeclaration("const", constDecls));
	if (specifiers.length > 0) {
		body.push(t.exportNamedDeclaration(null, specifiers));
	}
	body.push(t.exportDefaultDeclaration(t.identifier("__default")));
	stats.cjsFiles += 1;
}

// --------------------------------------------------------------------------
// Phase 2.5: desugar labeled statements (roblox-ts has no labels).
// --------------------------------------------------------------------------
const LOOP_TYPES = new Set([
	"ForStatement", "WhileStatement", "DoWhileStatement", "ForInStatement", "ForOfStatement",
]);

function desugarLabels(ast, stats) {
	// Document order is pre-order (outer first); reversed, inner labels are
	// desugared before their ancestors.
	const labels = [];
	traverse(ast, { LabeledStatement: (p) => { labels.push(p); } });
	labels.reverse();

	let idx = 0;
	for (const labelPath of labels) {
		if (labelPath.node === null) continue;
		desugarOneLabel(labelPath, stats, idx++);
		stats.labels += 1;
	}
}

function desugarOneLabel(labelPath, stats, idx) {
	const labelNode = labelPath.node;
	const labelName = labelNode.label.name;
	const body = labelNode.body;
	const bodyType = body.type;
	const isLoop = LOOP_TYPES.has(bodyType);
	const F = t.identifier(`__lb_${idx}`);
	const C = t.identifier(`__lc_${idx}`);

	// 1. Collect the jumps that target THIS label (nearest-ancestor rule).
	const jumps = [];
	labelPath.traverse({
		BreakStatement: (j) => { if (targetsLabel(j, labelNode, labelName)) jumps.push(j); },
		ContinueStatement: (j) => { if (targetsLabel(j, labelNode, labelName)) jumps.push(j); },
	});

	// 2. Compute where `if (F || C) break;` unwinding checks are needed:
	// after every statement in a statement list that has a jump inside a
	// strictly nested loop (the jump's `break` escapes that nested loop and
	// must then also escape the rest of the list). The list array itself is
	// captured here, because `node.parent` is not reliably set by babel
	// between phases.
	const marked = new Map();
	for (const j of jumps) {
		let cur = j.parentPath;
		let loopsPassed = 0;
		while (cur && cur.node !== labelNode) {
			if (LOOP_TYPES.has(cur.node.type)) loopsPassed += 1;
			const par = cur.parentPath;
			if (par) {
				const pn = par.node;
				let list = null;
				if (pn.type === "BlockStatement" && pn.body.includes(cur.node)) list = pn.body;
				else if (pn.type === "SwitchCase" && pn.consequent.includes(cur.node)) list = pn.consequent;
				if (list && loopsPassed > 0) marked.set(cur.node, list);
			}
			cur = cur.parentPath;
		}
	}

	// 3. Rewrite the jumps. `continue L` on a non-loop label is a break in
	// sloppy mode.
	for (const j of jumps) {
		const flag = j.node.type === "BreakStatement" || !isLoop ? F : C;
		j.replaceWith(
			t.blockStatement([
			t.expressionStatement(t.assignmentExpression("=", flag, t.booleanLiteral(true))),
			t.breakStatement(),
			]),
		);
		stats.labelJumps += 1;
	}

	// 4. Insert the unwinding checks (into the captured lists, so stale
	// `node.parent` pointers do not matter).
	for (const [stmt, list] of marked) {
		const i = list.indexOf(stmt);
		if (i < 0) continue;
		list.splice(i + 1, 0, t.ifStatement(t.logicalExpression("||", F, C), t.blockStatement([t.breakStatement()])));
		stats.labelChecks += 1;
	}

	// 5. Build the wrapper. For loop labels the labeled statement's `.body`
	// is the loop itself; the loop's own body is `.body.body`.
	let innerBody = body;
	if (bodyType === "BlockStatement" || bodyType === "IfStatement" || bodyType === "SwitchStatement") {
		innerBody = body;
	} else if (isLoop) {
		innerBody = t.isBlockStatement(body.body) ? body.body : t.blockStatement([body.body]);
	}
	const flagsDecl = t.variableDeclaration("let", [
		t.variableDeclarator(F, t.booleanLiteral(false)),
		t.variableDeclarator(C, t.booleanLiteral(false)),
	]);
	const resetC = t.expressionStatement(t.assignmentExpression("=", C, t.booleanLiteral(false)));
	const notF = t.unaryExpression("!", F);

	let wrapper;
	if (bodyType === "ForStatement") {
		const test = body.test ?? t.booleanLiteral(true);
		const updateStmt = body.update ? t.expressionStatement(body.update) : t.emptyStatement();
		const stmts = [];
		if (body.init) {
			stmts.push(t.isVariableDeclaration(body.init) ? body.init : t.expressionStatement(body.init));
		}
		stmts.push(flagsDecl);
		stmts.push(
			t.whileStatement(notF, t.blockStatement([
			resetC,
			t.whileStatement(test, t.blockStatement([innerBody, updateStmt])),
			t.ifStatement(C, t.blockStatement([resetC, updateStmt, t.continueStatement()])),
			t.breakStatement(),
		])),
		);
		wrapper = t.blockStatement(stmts);
	} else if (bodyType === "WhileStatement") {
		wrapper = t.blockStatement([
			flagsDecl,
			t.whileStatement(notF, t.blockStatement([
			resetC,
			t.whileStatement(body.test, innerBody),
			t.ifStatement(C, t.blockStatement([resetC, t.continueStatement()])),
			t.breakStatement(),
		])),
		]);
	} else if (bodyType === "DoWhileStatement") {
		wrapper = t.blockStatement([
			flagsDecl,
			t.whileStatement(notF, t.blockStatement([
			resetC,
			t.doWhileStatement(body.test, innerBody),
			t.ifStatement(C, t.blockStatement([resetC, t.ifStatement(body.test, t.blockStatement([t.continueStatement()])), t.breakStatement()])),
			t.breakStatement(),
		])),
		]);
	} else if (bodyType === "ForInStatement" || bodyType === "ForOfStatement") {
		// The ForIn form is later rewritten to ForOf(Object.keys(...)) by the
		// syntax phase; the label wrapper is loop-agnostic.
		wrapper = t.blockStatement([
			flagsDecl,
			t.whileStatement(notF, t.blockStatement([
			resetC,
			body,
			t.ifStatement(C, t.blockStatement([resetC, t.continueStatement()])),
			t.breakStatement(),
		])),
		]);
	} else {
		// Non-loop label: block / if / switch. A single trailing break makes
		// the wrapper run exactly once unless a jump set F.
		wrapper = t.blockStatement([
			flagsDecl,
			t.whileStatement(notF, t.blockStatement([innerBody, t.breakStatement()])),
		]);
	}

	labelPath.replaceWith(wrapper);
}

function targetsLabel(jumpPath, labelNode, labelName) {
	if (!jumpPath.node.label || jumpPath.node.label.name !== labelName) return false;
	let cur = jumpPath.parentPath;
	while (cur) {
		if (cur.node.type === "LabeledStatement" && cur.node.label.name === labelName) {
			return cur.node === labelNode;
		}
		cur = cur.parentPath;
	}
	return false;
}

// --------------------------------------------------------------------------
// Phase 3: var -> let with function-scope hoisting.
//
// A naive var->let breaks code that relies on `var` being function-scoped:
// a `var` declared inside a block is still visible outside it, so
//   if (c) for (var i = 0; ...) ... ; else if (i = f()) ...
// would turn `i` into a free identifier. The fix mirrors JS hoisting:
// per function, every var declarator is hoisted to the top of the function
// as a bare `let` (initializers stay where they are, becoming plain
// assignments), so function scope is preserved and initialization timing
// is unchanged. Program-scope vars are hoisted to the top of the module.
// --------------------------------------------------------------------------
const FN_WITH_BODY = new Set([
	"FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression",
	"ObjectMethod", "ClassMethod", "ClassPrivateMethod",
]);

function collectVarDecls(fnPath) {
	const found = [];
	fnPath.traverse({
		VariableDeclaration(p) {
			if (p.node.kind !== "var") return;
			let cur = p.parentPath;
			while (cur && cur !== fnPath) {
				if (FN_WITH_BODY.has(cur.node.type)) return; // nested function has its own scope
				cur = cur.parentPath;
			}
			if (cur === fnPath) found.push(p);
		},
	});
	return found;
}

function hoistVarsInFn(fnPath, stats) {
	const isProgram = fnPath.isProgram();
	const stmts = isProgram ? fnPath.node.body : fnPath.node.body.body;
	if (!Array.isArray(stmts)) return; // expression-body arrow: no var statements
	const declPaths = collectVarDecls(fnPath);
	if (declPaths.length === 0) return;

	// Names in first-seen order, deduped (JS allows repeated var declarations).
	const order = [];
	const seen = new Set();
	for (const dp of declPaths) {
		for (const dpath of dp.get("declarations")) {
			for (const name of Object.keys(dpath.getBindingIdentifiers())) {
				if (!seen.has(name)) {
					seen.add(name);
					order.push(name);
				}
			}
		}
	}

	const hoisted = t.variableDeclaration("let", order.map((n) => t.variableDeclarator(t.identifier(n), null)));
	stmts.unshift(hoisted);

	for (const dp of declPaths) {
		const parent = dp.parentPath;
		const assignments = [];
		for (const dpath of dp.get("declarations")) {
			const d = dpath.node;
			const init = d.init;
			if (init === null) continue;
			assignments.push(t.assignmentExpression("=", d.id, init));
			stats.varHoisted += 1;
		}
		if (t.isForStatement(parent) && parent.node.init === dp.node) {
			dp.replaceWith(
				assignments.length === 0
					? null
					: assignments.length === 1
						? assignments[0]
						: t.sequenceExpression(assignments),
			);
		} else if ((t.isForInStatement(parent) || t.isForOfStatement(parent)) && parent.node.left === dp.node) {
			// for (var x in y) -> for (x in y): plain assignment target.
			const id = dp.node.declarations[0].id;
			parent.node.left = id;
			// initializer (if any) becomes a statement before the loop
			if (assignments.length > 0) {
				dp.insertAfter(assignments.map((a) => t.expressionStatement(a)));
			}
			dp.remove();
		} else {
			// plain statement: replace with the assignment statements (or drop).
			if (assignments.length === 0) {
				dp.remove();
			} else {
				dp.replaceWithMultiple(assignments.map((a) => t.expressionStatement(a)));
			}
		}
		stats.varToLet += 1;
	}
}

function varToLet(ast, stats) {
	const fns = [];
	const visitor = {};
	for (const key of FN_WITH_BODY) visitor[key] = (p) => { fns.push(p); };
	visitor["Program"] = (p) => { fns.push(p); }; // program scope last
	traverse(ast, visitor);
	for (const fp of fns) hoistVarsInFn(fp, stats);
}

// --------------------------------------------------------------------------
// Phase 3.5: loose-equality desugar (roblox-ts bans `==` / `!=`).
//
// The vendor CJS uses `x == null` / `x != null` as a null-or-undefined test.
// Phase 4's NullLiteral rewrite already collapses every `null` literal to
// `undefined`, so the only JS value a `== null` test must match is
// `undefined` itself. That makes the strict form EXACTLY equivalent here:
//   x == null  /  x == undefined  /  x == void 0   ->  x === undefined
//   x != null  /  x != undefined  /  x != void 0   ->  x !== undefined
// in either operand order. Any other loose comparison (two non-nullish
// operands) has no sound strict rewrite and is left alone so a later compile
// error surfaces it, rather than silently changing semantics.
// --------------------------------------------------------------------------
function isNullishOperand(node) {
	return (
		t.isNullLiteral(node) ||
		(t.isIdentifier(node) && node.name === "undefined") ||
		(t.isUnaryExpression(node) && node.operator === "void")
	);
}

function looseEquality(ast, stats) {
	traverse(ast, {
		BinaryExpression(p) {
			const op = p.node.operator;
			if (op !== "==" && op !== "!=") return;
			const { left, right } = p.node;
			if (!isNullishOperand(left) && !isNullishOperand(right)) return;
			const other = isNullishOperand(left) ? right : left;
			p.replaceWith(
				t.binaryExpression(op === "==" ? "===" : "!==", other, t.identifier("undefined")),
			);
			stats.looseEq += 1;
		},
	});
}

// --------------------------------------------------------------------------
// Phase 4: syntax rewrites (the original tame pass).
// --------------------------------------------------------------------------
function syntaxRewrites(ast, stats) {
	// Minified React reuses function PARAMETERS as numeric loop counters
	// (`function f(b){ ...; for (b = 0; b < n; b++) ... }`). roblox-ts infers
	// the parameter's type from its non-numeric use and rejects the `<`
	// comparison. Rewrite `for (P = <num>; ...)` where P is a parameter into a
	// fresh block-scoped `let`, so the counter is unambiguously numeric.
	traverse(ast, {
		ForStatement(p) {
			const init = p.node.init;
			if (!t.isAssignmentExpression(init) || init.operator !== "=") return;
			if (!t.isIdentifier(init.left)) return;
			if (!t.isNumericLiteral(init.right)) return;
			const binding = p.scope.getBinding(init.left.name);
			if (!binding || binding.kind !== "param") return;
			const fresh = p.scope.generateUidIdentifier(init.left.name);
			p.scope.rename(init.left.name, fresh.name);
			p.node.init = t.variableDeclaration("let", [
				t.variableDeclarator(t.identifier(fresh.name), init.right),
			]);
			stats.numericCounter += 1;
		},
	});
	traverse(ast, {
		UnaryExpression(p) {
			if (p.node.operator !== "typeof") return;
			p.replaceWith(callExpr("typeOfJS", [p.node.argument]));
			stats.typeof += 1;
		},
		NullLiteral(p) {
			p.replaceWith(t.identifier("undefined"));
			stats.null += 1;
		},
		BinaryExpression(p) {
			if (p.node.operator === "+") {
				p.replaceWith(callExpr("__cat", [p.node.left, p.node.right]));
				stats.plus += 1;
				return;
			}
			if (p.node.operator === "in") {
				p.replaceWith(callExpr("__in", [p.node.left, p.node.right]));
				stats.inOp += 1;
			}
		},
		LogicalExpression(p) {
			// `&&` / `||` are fine in Luau (and / or); nothing to do.
		},
		ForInStatement(p) {
			if (t.isVariableDeclaration(p.node.left) && p.node.left.declarations.length === 1) {
				p.node.right = callExpr("Object.keys", [p.node.right]);
				p.replaceWith(t.forOfStatement(p.node.left, p.node.right, p.node.body));
				stats.forIn += 1;
				return;
			}
			const key = t.identifier("__k");
			const body = p.node.body;
			const assignKey = t.expressionStatement(t.assignmentExpression("=", p.node.left, key));
			p.replaceWith(t.forOfStatement(
				t.variableDeclaration("const", [t.variableDeclarator(key, null)]),
				callExpr("Object.keys", [p.node.right]),
				t.blockStatement([assignKey, body]),
			));
			stats.forIn += 1;
		},
		MemberExpression(p) {
			const node = p.node;
			if (node.computed) return;
			const name = node.property.name;
			if (name === "length") {
				const parent = p.parentPath.node;
				if (t.isAssignmentExpression(parent) && parent.left === node) return;
				p.replaceWith(callExpr("__len", [node.object]));
				stats.length += 1;
				return;
			}
			if (name === "prototype") {
				const parent = p.parentPath.node;
				if (t.isAssignmentExpression(parent) && parent.left === node) return;
				p.replaceWith(callExpr("__protoOf", [node.object]));
				stats.prototype += 1;
				return;
			}
			if (name === "isArray" && t.isIdentifier(node.object) && node.object.name === "Array") {
				p.replaceWith(t.identifier("isArray"));
				stats.isArray += 1;
				return;
			}
			if (name === "from" && t.isIdentifier(node.object) && node.object.name === "Array") {
				p.replaceWith(t.identifier("__arrFrom"));
				stats.arrFrom += 1;
				return;
			}
		},
		AssignmentExpression(p) {
			const left = p.node.left;
			if (t.isMemberExpression(left) && !left.computed && t.isIdentifier(left.property)) {
				if (left.property.name === "length") {
					p.replaceWith(callExpr("__lenSet", [left.object, p.node.right]));
					stats.lengthSet += 1;
				} else if (left.property.name === "prototype") {
					p.replaceWith(callExpr("__protoSet", [left.object, p.node.right]));
					stats.prototypeSet += 1;
				}
			}
		},
		RegexLiteral(p) {
			p.replaceWith(callExpr("__re", [t.stringLiteral(p.node.pattern), t.stringLiteral(p.node.flags ?? "")]));
			stats.regex += 1;
		},
		ArrayExpression(p) {
			// JS array literal -> marked JS array, so isArray() can tell it
			// apart from object literals (plain {} tables) at runtime.
			p.replaceWith(callExpr("__arrNew", p.node.elements));
			stats.arrNew += 1;
		},
		NewExpression(p) {
			const { callee } = p.node;
			if (t.isIdentifier(callee) && (callee.name === "Array" || callee.name === "Promise")) return;
			p.replaceWith(callExpr("__new", [callee, ...(p.node.arguments ?? [])]));
			stats.newExpr += 1;
		},
		CallExpression(p) {
			const { callee } = p.node;
			if (!t.isMemberExpression(callee) || callee.computed) return;
			if (!t.isIdentifier(callee.property)) return;
			const name = callee.property.name;
			const obj = callee.object;
			if (name === "isArray" && t.isIdentifier(obj) && obj.name === "Array") {
				p.replaceWith(callExpr("isArray", p.node.arguments));
				stats.isArray += 1;
				return;
			}
			if (name === "is" && t.isIdentifier(obj) && obj.name === "Object") {
				p.replaceWith(callExpr("__objIs", p.node.arguments));
				stats.objIs += 1;
				return;
			}
			if (name === "from" && t.isIdentifier(obj) && obj.name === "Array") {
				p.replaceWith(callExpr("__arrFrom", p.node.arguments));
				stats.arrFrom += 1;
				return;
			}
			if (isGlobalReceiver(obj)) return; // polyfill table: plain call works
			switch (name) {
				case "call":
					p.replaceWith(callExpr("__callFn", [obj, ...p.node.arguments]));
					stats.methods += 1;
					return;
				case "apply":
					p.replaceWith(callExpr("__applyFn", [obj, ...p.node.arguments]));
					stats.methods += 1;
					return;
				case "bind": {
					// `recv.method.bind(thisArg, ...)` cannot pass `recv.method` as a bare
					// value (roblox-ts forbids indexing a method without calling it), so
					// hand __partial a thunk that performs the method call with a spread
					// of the runtime args, and let __partial close over thisArg.
					const restId = p.scope.generateUidIdentifier("bindArgs");
					const invoke = t.arrowFunctionExpression(
						[t.restElement(restId)],
						t.callExpression(
							t.memberExpression(obj, t.identifier("apply")),
							[t.spreadElement(restId)],
						),
					);
					p.replaceWith(callExpr("__partial", [invoke, ...p.node.arguments]));
					stats.methods += 1;
					return;
				}
				case "hasOwnProperty":
					p.replaceWith(callExpr("Object.hasOwnProperty", [obj, ...p.node.arguments]));
					stats.methods += 1;
					return;
				case "toString":
					p.replaceWith(
						p.node.arguments.length === 0
							? callExpr("__str", [obj])
							: callExpr("__numToBase", [obj, ...p.node.arguments]),
					);
					stats.methods += 1;
					return;
				default:
					break;
			}
			if (POLY_METHODS.has(name)) {
				p.replaceWith(callExpr(`__${name}`, [obj, ...p.node.arguments]));
				stats.methods += 1;
			}
		},
	});

	// `arguments` -> trailing __args rest parameter.
	{
		const ownerOf = new Map();
		const argRefs = [];
		traverse(ast, {
			Identifier(inner) {
				if (inner.node.name !== "arguments") return;
				if (inner.scope.getBinding("arguments")) return;
				let owner = null;
				let cur = inner.parentPath;
				while (cur) {
					const n = cur.node;
					if (t.isFunctionDeclaration(n) || t.isFunctionExpression(n) || t.isObjectMethod(n)) {
						owner = n;
						break;
					}
					cur = cur.parentPath;
				}
				if (owner) {
					ownerOf.set(inner.node, owner);
					argRefs.push(inner);
				}
			},
		});
		const owners = new Set(ownerOf.values());
		for (const fn of owners) {
	const params = fn.params;
	if (params.some((pm) => t.isRestElement(pm))) {
		stats.restCollision += 1;
	} else {
		params.push(t.restElement(t.identifier("__args")));
	}
	// A unified 0-based argument list: the named parameters plus the
	// rest. A bare rest parameter only holds the TRAILING arguments, so
	// `__args` alone cannot mirror JS `arguments` once the function has
	// named parameters (both .length and [e] land on the wrong
	// elements). Building the full list once makes `arguments.length`
	// (the length pass already emits `__len(arguments)`) and element
	// access direct. Element access routes through __argAt (a call) so
	// roblox-ts does not apply its 1-based index shift to an
	// array-typed local, keeping 0-based JS indexing intact.
	const named = params.slice(0, -1);
	for (const pm of named) {
		if (!t.isIdentifier(pm)) {
			throw new Error("arguments desugar: only plain parameters are supported");
		}
	}
	const build = t.variableDeclaration("let", [
		t.variableDeclarator(
			t.identifier("__allArgs"),
			t.callExpression(t.identifier("__arrNew"), [...named, t.spreadElement(t.identifier("__args"))])
		),
	]);
	if (t.isBlockStatement(fn.body)) {
		fn.body.body.unshift(build);
	} else {
		fn.body = t.blockStatement([build, t.returnStatement(fn.body)]);
	}
}
		for (const ref of argRefs) {
			const parent = ref.parentPath.node;
			if (t.isMemberExpression(parent) && !parent.computed && t.isIdentifier(parent.property) && parent.property.name === "length" && parent.object === ref.node) {
				ref.parentPath.replaceWith(callExpr("__len", [t.identifier("__allArgs")]));
			} else if (t.isMemberExpression(parent) && parent.computed && parent.object === ref.node) {
				ref.parentPath.replaceWith(callExpr("__argAt", [t.identifier("__allArgs"), parent.property]));
			} else {
				ref.replaceWith(t.identifier("__allArgs"));
			}
			stats.arguments += 1;
		}
	}
}

// --------------------------------------------------------------------------
function emptyStats() {
	return {
		reservedRenamed: 0, dollarRenamed: 0, cjsFiles: 0, requireImport: 0, moduleExports: 0, exportsRef: 0,
		labels: 0, labelJumps: 0, labelChecks: 0,
		varToLet: 0, varHoisted: 0, typeof: 0, null: 0, plus: 0, inOp: 0, forIn: 0, length: 0, lengthSet: 0,
		prototype: 0, prototypeSet: 0, isArray: 0, objIs: 0, arrFrom: 0, newExpr: 0, regex: 0, arrNew: 0,
		methods: 0, arguments: 0, restCollision: 0, looseEq: 0, numericCounter: 0,
	};
}

// Entry index.js files select production vs development at runtime via
// process.env.NODE_ENV. That makes named imports (useState, the reconciler
// factory) unresolvable as static bindings, because the chosen export object
// is only known after the branch runs. The spike polyfill pins
// NODE_ENV=development, so we collapse each entry to a static re-export of the
// development build. Named AND default imports then resolve at compile time.
const ENTRY_DEV_TARGET = new Map([
	["toil-react/index.js", "./cjs/react.development.js"],
	["toil-react/jsx-runtime.js", "./cjs/react-jsx-runtime.development.js"],
	["toil-react/jsx-dev-runtime.js", "./cjs/react-jsx-dev-runtime.development.js"],
	["toil-react-reconciler/index.js", "./cjs/react-reconciler.development.js"],
	["toil-scheduler/index.js", "./cjs/scheduler.development.js"],
]);

function rewriteEntry(filePath, relPosix) {
	for (const [suffix, target] of ENTRY_DEV_TARGET) {
		if (relPosix.endsWith(suffix)) {
			// Variant D: a namespace import keeps its own binding, whereas a
			// default import from the same module as an `export *` is folded
			// into the star-export loop by roblox-ts and its local is dropped
			// (verified against roblox-ts 3.0.0 with src/probe/reexport-*.js).
			const code =
				`import * as __ns from ${JSON.stringify(target)};\n` +
				`export * from ${JSON.stringify(target)};\n` +
				`export default __ns.default;\n`;
			fs.writeFileSync(filePath, code);
			return true;
		}
	}
	return false;
}

function transformFile(filePath) {
	const source = fs.readFileSync(filePath, "utf8");
	// "unambiguous" so a re-run on already-tamed (ES-module) files parses as
	// module instead of choking on the top-level import/export statements.
	const ast = babelParser.parse(source, { sourceType: "unambiguous", allowReturnOutsideFunction: true });
	const stats = emptyStats();
	renameReservedLocals(ast, stats);
	sanitizeDollarIdentifiers(ast, stats);
	cjsToEs(ast, stats);
	desugarLabels(ast, stats);
	varToLet(ast, stats);
	looseEquality(ast, stats);
	syntaxRewrites(ast, stats);

	const out = generate(ast, { comments: false, compact: false }, source);
	fs.writeFileSync(filePath, out.code + "\n");
	return stats;
}

// --- main ------------------------------------------------------------------
const files = [];
(function walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(p);
		else if (p.endsWith(".js")) files.push(p);
	}
})(vendorDir);

const keys = Object.keys(emptyStats());
const total = Object.fromEntries(keys.map((k) => [k, 0]));
for (const f of files.sort()) {
	const relPosix = path.relative(root, f).split(path.sep).join("/");
	if (rewriteEntry(f, relPosix)) {
		console.log(`${relPosix}: entry -> development re-export`);
		continue;
	}
	const stats = transformFile(f);
	for (const k of keys) total[k] += stats[k];
	const rel = path.relative(root, f);
	console.log(
		`${rel}: ren=${stats.reservedRenamed} dollar=${stats.dollarRenamed} cjs=${stats.cjsFiles ? 1 : 0} req=${stats.requireImport} modExp=${stats.moduleExports} expRef=${stats.exportsRef} labels=${stats.labels} jumps=${stats.labelJumps} lchecks=${stats.labelChecks} var=${stats.varToLet} typeof=${stats.typeof} null=${stats.null} plus=${stats.plus} in=${stats.inOp} forIn=${stats.forIn} len=${stats.length} new=${stats.newExpr} regex=${stats.regex} arrNew=${stats.arrNew} methods=${stats.methods} args=${stats.arguments} looseEq=${stats.looseEq} numCtr=${stats.numericCounter}`,
	);
}
console.log("TOTAL:", JSON.stringify(total));

// --- post-checks (AST-exact) ---------------------------------------------
// Regex over raw source false-positives on `typeof` and `null` inside string
// literals (React's dev builds embed examples in error messages), so the
// checks walk the parsed AST instead: strings and comments are then plain
// StringLiteral/Comment nodes and can never match.
function postCheckFile(filePath) {
	const source = fs.readFileSync(filePath, "utf8");
	const ast = babelParser.parse(source, { sourceType: "module", allowReturnOutsideFunction: true });
	const problems = [];
	traverse(ast, {
		VariableDeclaration(p) {
			if (p.node.kind === "var") {
				problems.push(`var keyword at line ${p.node.loc ? p.node.loc.start.line : "?"}`);
			}
		},
		UnaryExpression(p) {
			if (p.node.operator === "typeof") {
				problems.push(`typeof at line ${p.node.loc ? p.node.loc.start.line : "?"}`);
			}
		},
		NullLiteral(p) {
			problems.push(`bare null at line ${p.node.loc ? p.node.loc.start.line : "?"}`);
		},
		Identifier(p) {
			if (p.node.name !== "exports") return;
			// x.exports is a property access, not the CJS global.
			if (t.isMemberExpression(p.parent) && p.parent.property === p.node) return;
			if (p.scope.getBinding("exports") === undefined) {
				problems.push(`free exports at line ${p.node.loc ? p.node.loc.start.line : "?"}`);
			}
		},
		CallExpression(p) {
			const callee = p.node.callee;
			if (t.isIdentifier(callee) && callee.name === "require" && p.scope.getBinding("require") === undefined) {
				problems.push(`free require at line ${callee.loc ? callee.loc.start.line : "?"}`);
			}
		},
	});
	return problems;
}

let problems = 0;
for (const f of files) {
	const found = postCheckFile(f);
	for (const msg of found) {
		console.log(`PROBLEM ${msg} in ${path.relative(root, f)}`);
		problems += 1;
	}
}
console.log(problems === 0 ? "post-checks: clean" : `post-checks: ${problems} potential problem(s)`);