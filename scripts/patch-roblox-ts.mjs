#!/usr/bin/env node
/**
 * patch-roblox-ts.mjs — idempotent, re-runnable patches to the vendored roblox-ts
 * compiler so it will compile the tamed React 19 CJS graph.
 *
 * node_modules is re-extracted on every `npm install`, so these patches must be
 * re-applied after each install. Run: node scripts/patch-roblox-ts.mjs
 *
 * Two patches:
 *  1. validateNotAny: skip .js sources. With allowJs + checkJs:false every value in
 *     vendor JS is type `any`, so the error-level `noAny` diagnostic would fire on the
 *     whole graph. Semantics are carried by the tame transform + declared globals.
 *  2. transformIdentifier: when getSymbolAtLocation finds no symbol (a global the type
 *     shims forgot to declare), throw a message naming the identifier, file and line
 *     instead of the cryptic "Assertion Failed! (compiler bug)".
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const compiler = path.resolve(here, "..", "node_modules", "roblox-ts", "out", "TSTransformer");

function patch(rel, anchor, replacement, marker) {
	const p = path.join(compiler, rel);
	const src = fs.readFileSync(p, "utf8");
	if (src.includes(marker)) {
		console.log(`  already patched: ${rel}`);
		return;
	}
	if (!src.includes(anchor)) {
		console.error(`  ANCHOR NOT FOUND in ${rel}`);
		process.exitCode = 1;
		return;
	}
	fs.writeFileSync(p, src.replace(anchor, replacement));
	console.log(`  patched: ${rel}`);
}

console.log("patching roblox-ts @", compiler);

// 1. validateNotAny — skip .js files (noAny would fire on every untyped vendor value).
patch(
	"util/validateNotAny.js",
	"    let type = state.getType(node);",
	`    const __jsSkip = node.getSourceFile();
    if (__jsSkip !== undefined && __jsSkip.fileName.endsWith(".js")) {
        return;
    }
    let type = state.getType(node);`,
	"__jsSkip",
);

// 2. transformIdentifierDefined — name the missing global instead of asserting.
patch(
	"nodes/expressions/transformIdentifier.js",
	`    const symbol = typescript_1.default.isShorthandPropertyAssignment(node.parent)
        ? state.typeChecker.getShorthandAssignmentValueSymbol(node.parent)
        : state.typeChecker.getSymbolAtLocation(node);
    (0, assert_1.assert)(symbol);`,
	`    const symbol = typescript_1.default.isShorthandPropertyAssignment(node.parent)
        ? state.typeChecker.getShorthandAssignmentValueSymbol(node.parent)
        : state.typeChecker.getSymbolAtLocation(node);
    if (!symbol) {
        const __f = node.getSourceFile();
        const __s = __f ? __f.text : "";
        const __pos = __f ? __f.getLineAndCharacterOfPosition(node.pos) : { line: -1, character: -1 };
        throw new Error("NO SYMBOL for '" + node.text + "' in " + (__f ? __f.fileName : "?") + " at " + (__pos.line + 1) + ":" + __pos.character + " :: " + __s.slice(Math.max(0, node.pos - 70), node.pos + 70).replace(/\\n/g, "\\\\n"));
    }
    (0, assert_1.assert)(symbol);`,
	"NO SYMBOL for",
);

// 3. transformIdentifier — the OUTER assert (fires before transformIdentifierDefined
// would name the identifier). Same named error, distinct marker.
patch(
	"nodes/expressions/transformIdentifier.js",
	`    (0, assert_1.assert)(symbol);
    if (state.typeChecker.isUndefinedSymbol(symbol)) {`,
	`    if (!symbol) {
        const __f2 = node.getSourceFile();
        const __s2 = __f2 ? __f2.text : "";
        const __pos2 = __f2 ? __f2.getLineAndCharacterOfPosition(node.pos) : { line: -1, character: -1 };
        throw new Error("NO SYMBOL (outer) for '" + node.text + "' in " + (__f2 ? __f2.fileName : "?") + " at " + (__pos2.line + 1) + ":" + __pos2.character + " :: " + __s2.slice(Math.max(0, node.pos - 70), node.pos + 70).replace(/\\n/g, "\\\\n"));
    }
    (0, assert_1.assert)(symbol);
    if (state.typeChecker.isUndefinedSymbol(symbol)) {`,
	"NO SYMBOL (outer) for",
);

// 4. transformIdentifier — `new Map()` is tamed to `__new(Map, ...)`, so the
// Map/Set/WeakMap/WeakSet identifiers reach transformIdentifier WITHOUT a
// `new`; the built-in noConstructorMacroWithoutNew diagnostic would fire for
// the whole vendor graph. In .js sources the tamer + polyfills carry the
// semantics, so skip the diagnostic there.
patch(
	"nodes/expressions/transformIdentifier.js",
	`            else {
                DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noConstructorMacroWithoutNew(node));
            }`,
	`            else {
                const __jsFile4 = node.getSourceFile();
                if (!(__jsFile4 && __jsFile4.fileName.endsWith(".js"))) {
                    DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noConstructorMacroWithoutNew(node));
                }
            }`,
	"__jsFile4",
);

// 5. Type-guard diagnostics that minified vendor JS cannot satisfy under
// checkJs:false inference. Each is a SOUNDNESS guard for hand-written TS, not a
// hard error: the operands are numbers/strings/methods at runtime, roblox-ts
// just cannot prove it. Skip them for .js sources only (app .ts stays strict).
//  5a. noNonNumberStringRelationOperator (transformBinaryExpression)
patch(
	"nodes/expressions/transformBinaryExpression.js",
	`            DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noNonNumberStringRelationOperator(node));`,
	`            { const __jsFile5 = node.getSourceFile(); if (!(__jsFile5 && __jsFile5.fileName.endsWith(".js"))) DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noNonNumberStringRelationOperator(node)); }`,
	"__jsFile5",
);
//  5b. noNonNumberUnaryMinus (transformUnaryExpression)
patch(
	"nodes/expressions/transformUnaryExpression.js",
	`            DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noNonNumberUnaryMinus(node));`,
	`            { const __jsFile5 = node.getSourceFile(); if (!(__jsFile5 && __jsFile5.fileName.endsWith(".js"))) DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noNonNumberUnaryMinus(node)); }`,
	"__jsFile5",
);
//  5c. noIndexWithoutCall (addIndexDiagnostics)
patch(
	"util/addIndexDiagnostics.js",
	`        DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noIndexWithoutCall(node));`,
	`        { const __jsFile5 = node.getSourceFile(); if (!(__jsFile5 && __jsFile5.fileName.endsWith(".js"))) DiagnosticService_1.DiagnosticService.addDiagnostic(diagnostics_1.errors.noIndexWithoutCall(node)); }`,
	"__jsFile5",
);

console.log(process.exitCode ? "patches: FAILED" : "patches: OK");