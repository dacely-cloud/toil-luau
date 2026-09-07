import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// roblox-ts restores include/ from upstream on every build, so re-patch it
// before the emitted files are fixed up.
execFileSync(process.execPath, [fileURLToPath(new URL("./patch-runtime-lib.mjs", import.meta.url))], { stdio: "inherit" });

// The emitted vendor files are Luau, but roblox-ts passes some JS string
// escapes through that this VM's parser rejects. Two classes:
//  1. \uXXXX (JS unicode) -> \u{XXXX} (Luau)
//  2. .js file names -> .luau (the native require resolver only tries
//     .luau/.lua/init.luau/init.lua)
// fileURLToPath, not .pathname: .pathname keeps a leading slash on Windows.
const root = fileURLToPath(new URL("..", import.meta.url));

function walk(d, out = []) {
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name);
		if (e.isDirectory()) walk(p, out);
		else if (e.name.endsWith(".luau")) out.push(p);
	}
	return out;
}

// 3. The emitted files open with a raw `require(instance)` for
//    RuntimeLib, which the native VM cannot resolve; the bridge turns it
//    into `__spikeRequireTS()` (defined in specs/_spike_rt.luau).
let headers = 0;

// .js -> .luau renames (idempotent)
let renames = 0;
(function walkRename(d) {
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name);
		if (e.isDirectory()) walkRename(p);
		else if (e.name.endsWith(".js")) {
			fs.renameSync(p, p.slice(0, -3) + ".luau");
			renames++;
		}
	}
})(path.join(root, "out"));

let hoistedFns = [];
try {
	hoistedFns = JSON.parse(fs.readFileSync(fileURLToPath(new URL("./st-hoisted-fns.json", import.meta.url)), "utf8"));
} catch {
	// no transform metadata yet
}

let files = 0;
let conv = 0;
for (const f of walk(path.join(root, "out"))) {
	let s = fs.readFileSync(f, "utf8");
	let changed = false;
	const oldHeader = 'local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))';
	if (s.includes(oldHeader)) {
		s = s.replace(oldHeader, "local TS = __spikeRequireTS()");
		headers++;
		changed = true;
	}
	const n = (s.match(/\\u[0-9a-fA-F]{4}/g) || []).length;
	if (n > 0) {
		s = s.replace(/\\u([0-9a-fA-F]{4})/g, "\\u{$1}");
		files++;
		conv += n;
		changed = true;
	}
	// The reconciler's CJS module exports a bare function; module-scope
	// field reads of the form `local __n_x = __exports.x` crash in Luau.
	// Route them through the function-field shim. In the other vendor
	// files __exports is a plain table, so leave those reads alone.
	const isReconCjs = f.includes("toil-react-reconciler") && f.includes("react-reconciler.development");
	if (isReconCjs) {
	s = s
		.replace(
			/(local __n_[A-Za-z0-9_]+ = )__exports\.([A-Za-z0-9_]+)/g,
			'$1__spikeFnField(__exports, "$2")'
		)
		.replace(
			/__exports\.default = __exports/g,
			"__spikeFnField(__exports, \"default\", __exports)"
		)
		.replace(
			/(local _\d+ = )__exports\.default/g,
			'$1__spikeFnField(__exports, "default")'
		);
	changed = true;
	}

	// Function-typed factory-scope bindings keep their identity in __ST;
	// member access on them (JS allows fields on functions, Luau does not)
	// routes through the function-field shim.
	if (s.includes("__ST.") && hoistedFns.length > 0) {
		for (const name of hoistedFns) {
			const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			s = s.replace(
				new RegExp("([ \\t]*)__ST\\." + esc + "\\.(\\w+)([ \\t]*=[ \\t]*)([^\\n]*)$", "gm"),
				(_all, lead, field, _eq, rest) =>
					lead + '__spikeFnField(__ST.' + name + ', "' + field + '", ' + rest + ", true)"
			);
			s = s.replace(
				new RegExp("__ST\\." + esc + "\\.(?!(?:[A-Za-z0-9_$])(?=\\s*=\\s*))(?:[A-Za-z_$][A-Za-z0-9_$]*)", "g"),
				(_all, field) => '__spikeFnField(__ST.' + name + ', "' + field + '")'
			);
		}
	}

	// Element/component type field reads: the receiver may be a function
	// (JS tolerates fields on functions, Luau crashes). Route through the
	// optional-field shim; for table receivers the behavior is unchanged.
		// Skip matches inside double-quoted strings (the %s.childContextTypes
	// dev message used to be mangled into a syntax error): count unescaped
	// quotes before the match, per line (emitted strings are single-line).
	const quoteParity = (line, idx) => {
		let inStr = false;
		for (let i = 0; i < idx; i++) {
			const c = line[i];
			if (c === "\\") i++;
			else if (c === '"') inStr = !inStr;
		}
		return inStr;
	};
	for (const F of ["defaultProps", "propTypes", "displayName", "name", "childContextTypes",
		"getDerivedStateFromProps", "getDerivedStateFromError", "contextType", "contextTypes",
		"isReactComponent", "render", "$$typeof", "isReactWarning"]) {
		const Fe = F.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const rw = new RegExp("(^[ \t]*)([A-Za-z_$][A-Za-z0-9_]*(?:\\.[A-Za-z_$][A-Za-z0-9_]*)*)\\." + Fe + "([ \t]*=[ \t]*)([^\\n]*)$", "gm");
		s = s.replace(rw, (all, lead, chain, _eq, rest, _off, str) =>
			quoteParity(str.slice(0, _off), _off + lead.length + chain.length) ?
			all : lead + "__spikeOptFieldSet(" + chain + ', "' + F + '", ' + rest + ")");
		// Negative lookbehind: only start the chain at a real receiver head, not
		// at an identifier that is itself a member (preceded by ".", "]" or a
		// word char). Without it, `a[i].spec.name` matched only `spec.name` and
		// emitted `a[i].__spikeOptField(spec, "name")` -- a nil method call.
		const rx = new RegExp("(?<![.\\]A-Za-z0-9_$])([A-Za-z_$][A-Za-z0-9_]*(?:\\.[A-Za-z_$][A-Za-z0-9_]*)*)\\." + Fe + "(?![A-Za-z0-9_])", "g");
		s = s.replace(rx, (all, chain, off, str) =>
			quoteParity(str.slice(0, off), off + chain.length) ?
			all : "__spikeOptField(" + chain + ', "' + F + '")');
		changed = true;
	}

	// The reconciler's CJS exports a factory function; the ES namespace
	// table returned by the entry is not callable, but main.tsx (compiled
	// from an `export =` d.ts) calls it directly.
	if (f.includes(path.join("out", "vendor", "toil-react-reconciler")) && f.endsWith("index.luau")) {
		const before = s;
		s = s.replace(/return exports\s*$/, "return __spikeCallable(exports)\n");
		if (s !== before) {
			changed = true;
		}
	}

	// Hook dispatcher entries: roblox-ts compiles object-literal functions
	// as methods (self param) in the defining module, but the react module
	// calls them through `resolveDispatcher().useX(...)` with any-type
	// (dot, no self). Strip the self param from the dispatcher entries.
	if (f.endsWith(path.join("vendor", "toil-react-reconciler", "cjs", "react-reconciler.development.luau"))) {
		const before = s;
		s = s.replace(/(use[A-Za-z0-9_]+|readContext) = function\(self, /g, "$1 = function(");
		// Hook tuple returns: TS-compiled app code reads hook results 1-based
		// (roblox-ts shifts tuple indices), so useState returns plain 1-based
		// tables rather than 0-based __arrNew JS arrays. Deps arrays stay
		// 0-based: the reconciler reads them with __len and 0-based indexes.
		s = s
			.replace(
				"return __arrNew(initialState.memoizedState, dispatch)",
				"return { initialState.memoizedState, dispatch }"
			)
			.replace(
				"return __arrNew(hook.memoizedState, queue.dispatch)",
				"return { hook.memoizedState, queue.dispatch }"
			);
		// commitCallbacks / commitHiddenCallbacks: React reuses one `var` for
		// the update-queue object and then a numeric loop index. The block-
		// scoping transform can hand the tamed function that numeric value as
		// its `updateQueue` argument, so `updateQueue.callbacks` indexes a
		// number and throws in the commit's layout phase. React escalates the
		// throw to the root (no error boundary) and unmounts the whole tree,
		// leaving an empty ScreenGui. The queue these run is empty for the
		// supported surface (function components + hooks carry no root/class
		// commit callbacks), so guard the reads: a non-table queue means "no
		// callbacks", which is also what JS yields for a boxed primitive.
		s = s
			.replace(
				"\t\t\t\tcallbacks = updateQueue.callbacks\n",
				'\t\t\t\tcallbacks = if type(updateQueue) == "table" then updateQueue.callbacks else nil\n'
			)
			.replace(
				"\t\t\t\thiddenCallbacks = updateQueue.shared.hiddenCallbacks\n",
				'\t\t\t\thiddenCallbacks = if type(updateQueue) == "table" and type(updateQueue.shared) == "table" then updateQueue.shared.hiddenCallbacks else nil\n'
			);
		if (s !== before) changed = true;
	}

	if (changed) {
		fs.writeFileSync(f, s);
	}
}

console.log(`postbuild: ${conv} \\uXXXX escapes fixed in ${files} files, ${renames} .js renamed, ${headers} headers bridged`);
