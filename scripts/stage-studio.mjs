#!/usr/bin/env node
/**
 * Assemble a Rojo-syncable Roblox tree from the compiled out/.
 *
 * `npm run build` emits out/ for the *native Lest runner*: every module header
 * is `local TS = __spikeRequireTS()`, a global that only exists in
 * specs/_spike_rt.luau. Roblox has no such global, so the tree cannot be
 * synced as-is. This script produces .studio-stage/, which differs from out/
 * in three ways:
 *
 *   1. Module headers are rewritten to the real roblox-ts RuntimeLib require.
 *   2. Vendor files are renamed `X.luau` -> `X.js.luau`, because the emitted
 *      requires ask for instances named `react.development.js` / `index.js`
 *      and Rojo names a ModuleScript after the file minus the .luau suffix.
 *      (Rojo skips plain .js files entirely, so the vendor would otherwise be
 *      missing from the place.)
 *   3. Vendor package.json files are dropped. Rojo turns a .json file into a
 *      JSON-model ModuleScript, and its JSONC comment stripper truncates any
 *      string containing `//` -- an npm repository URL is enough to fail the
 *      whole build.
 *
 * Layout produced (matching the TS.import paths in out/):
 *
 *   .studio-stage/include                     -> ReplicatedStorage.rbxts_include
 *   .studio-stage/TS                          -> ReplicatedStorage.TS
 *   .studio-stage/node_modules/@toil/*        -> ReplicatedStorage.node_modules.@toil.*
 *   .studio-stage/StarterPlayerScripts/*      -> StarterPlayer.StarterPlayerScripts
 *
 * Run `npm run studio` (build + stage + rojo build) or `node scripts/stage-studio.mjs`.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const STAGE = path.join(ROOT, ".studio-stage");

const SPIKE_HEADER = "local TS = __spikeRequireTS()";
const ROBLOX_HEADER =
	'local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))';

if (!fs.existsSync(path.join(OUT, "host", "init.luau"))) {
	process.stderr.write("out/ not built; run `npm run build` first\n");
	process.exit(1);
}

fs.rmSync(STAGE, { recursive: true, force: true });

let rewritten = 0;
let copied = 0;

let bound = 0;

// Copy the runtime's globals into this module's own environment. Roblox
// gives each script its own env, so the ~70 JS-semantic helpers the tamed vendor reads
// bare (typeOfJS, __cat, __arrNew, Object, Symbol, ...) are invisible across
// module boundaries. Binding them as locals is not an option: these files are
// already at Luau's 200-local ceiling, which is why scope-to-table.mjs exists.
// Writing them into getfenv(0) inside a `do` block adds no persistent locals.
const ENV_PREAMBLE = `-- toil-luau: install the JS-semantics runtime into this module's environment.
do
	local _rt = require(game:GetService("ReplicatedStorage"):WaitForChild("ToilRuntime"))
	local _env = getfenv(0)
	for _k, _v in pairs(_rt) do
		if rawget(_env, _k) == nil then
			_env[_k] = _v
		end
	end
end
`;

/**
 * Give every staged module the JS runtime in its own environment. Applied
 * unconditionally: the helper surface is ~70 names (typeOfJS, __cat, __len,
 * __arrNew, __spikeSetST, ...), so a keyword test would only risk missing one,
 * and the preamble costs a cached require plus a table copy.
 */
// The reconciler factory reads React and Scheduler as bare globals: roblox-ts
// elided its `import React from "@toil/react"` / `import * as Scheduler` as
// type-only, so nothing binds them. The native runner publishes both on the
// shared env (specs/_spike_env.luau); on Roblox each reconciler module binds
// them in its own env. Only the reconciler gets this: requiring the react
// index from inside react's own modules would be a recursive require.
const RECONCILER_PREAMBLE = `-- toil-luau: React / Scheduler globals the reconciler factory reads bare.
do
	local _env = getfenv(0)
	local _toil = game:GetService("ReplicatedStorage"):WaitForChild("node_modules"):WaitForChild("@toil")
	local _reactNs = require(_toil:WaitForChild("react"):WaitForChild("index.js"))
	_env.React = _reactNs.default or _reactNs
	local _schedNs = require(_toil:WaitForChild("scheduler"):WaitForChild("index.js"))
	_env.Scheduler = _schedNs
end
`;

function bindGlobals(s, extra = "") {
	bound++;
	const preamble = ENV_PREAMBLE + extra;
	// After the RuntimeLib header when there is one, so TS stays first.
	const idx = s.indexOf(ROBLOX_HEADER);
	if (idx >= 0) {
		const cut = idx + ROBLOX_HEADER.length + 1;
		return s.slice(0, cut) + preamble + s.slice(cut);
	}
	return preamble + s;
}

/**
 * Port specs/_spike_rt.luau -- the JS-semantics layer the tamed vendor is
 * compiled against -- into a Roblox ModuleScript.
 *
 * It is otherwise pure Luau (no game/script/Instance), but it was written for
 * the native VM, where getfenv(0) and _G are the same table: it *writes*
 * getfenv(0).Symbol and *reads* _G.Symbol. On Roblox those are different, so
 * every install is redirected to _G, and the module exports everything it
 * defined -- both the _G installs and the implicit `function foo()` globals
 * that land in its own environment.
 */
function stageRuntime() {
	const src = fs.readFileSync(path.join(ROOT, "specs", "_spike_rt.luau"), "utf8");
	let s = src
		// The native entry point: requires a module by file path, which Roblox
		// cannot resolve. Staged modules use the real RuntimeLib header instead.
		.replace(
			/function __spikeRequireTS\(\)[\s\S]*?\nend\n/,
			"-- __spikeRequireTS removed: staged modules require RuntimeLib directly.\n",
		)
		// Installs must land where the reads look.
		.replace(/getfenv\(0\)\./g, "_G.")
		.replace(/^--!strict/m, "--!nocheck");

	const header = `--!nocheck
-- toil-luau: generated from specs/_spike_rt.luau by scripts/stage-studio.mjs.
-- Do not edit; edit the spec runtime and re-stage.
local _envBaseline = {}
for _k in pairs(getfenv(0)) do
	_envBaseline[_k] = true
end
local _gBaseline = {}
for _k in pairs(_G) do
	_gBaseline[_k] = true
end
`;

	const footer = `
-- Export everything this module defined so each staged module can copy it into
-- its own environment: the _G installs above plus the bare \`function foo()\`
-- helpers, which land in this script's environment rather than in _G.
local _exported = {}
for _k, _v in pairs(_G) do
	if _gBaseline[_k] == nil then
		_exported[_k] = _v
	end
end
for _k, _v in pairs(getfenv(0)) do
	if _envBaseline[_k] == nil and _exported[_k] == nil then
		_exported[_k] = _v
	end
end
return _exported
`;

	// Drop the original trailing `return true`; the export table replaces it.
	s = s.replace(/\nreturn true\s*$/, "\n");
	fs.writeFileSync(path.join(STAGE, "ToilRuntime.luau"), header + s + footer);
}

/**
 * Copy one Luau file, swapping the native-runner header for the Roblox one.
 * `renameJs` appends the `.js` the require paths expect to the instance name.
 */
function copyLuau(src, dst, renameJs) {
	let s = fs.readFileSync(src, "utf8");
	// `npm test` (scripts/run-native.mjs) rewrites out/ in place, replacing the
	// one-line postbuild header with an inlined _spikeRequireTS() plus a
	// __spikeRequireCache preamble that maps module paths for the native VM.
	// That form cannot be translated to Roblox, and silently staging it yields
	// a place that fails at the first import -- so stop and ask for a rebuild.
	if (s.includes("__spikeRequireCache")) {
		process.stderr.write(
			`out/ carries the native test runner's header (${path.relative(ROOT, src)}).\n` +
				"`npm test` rewrites out/ in place; run `npm run build` before staging.\n",
		);
		process.exit(1);
	}
	if (s.includes(SPIKE_HEADER)) {
		s = s.replace(SPIKE_HEADER, ROBLOX_HEADER);
		rewritten++;
	}
	const isReconciler = renameJs && /react-reconciler/.test(src.replace(/\/g, "/"));
	s = bindGlobals(s, isReconciler ? RECONCILER_PREAMBLE : "");
	const final = renameJs ? dst.replace(/\.luau$/, ".js.luau") : dst;
	fs.mkdirSync(path.dirname(final), { recursive: true });
	fs.writeFileSync(final, s);
	copied++;
}

/**
 * Recursively copy a directory of .luau files. Skips .json (see header) and
 * the vendor's *.production.luau builds: the entry modules re-export the
 * development ones, and the production reconciler does not compile anyway --
 * scope-to-table.mjs only lifts the development build's bindings onto __ST, so
 * production still trips Luau's 200-local ceiling.
 */
function copyTree(srcDir, dstDir, renameJs) {
	for (const e of fs.readdirSync(srcDir, { withFileTypes: true })) {
		const src = path.join(srcDir, e.name);
		const dst = path.join(dstDir, e.name);
		if (e.isDirectory()) copyTree(src, dst, renameJs);
		else if (e.name.endsWith(".production.luau")) continue;
		else if (e.name.endsWith(".luau")) copyLuau(src, dst, renameJs);
	}
}

// 1. rbxts_include -- from roblox-ts, NOT from include/.
//    Build step 7 (patch-runtime-lib.mjs) rewrites include/RuntimeLib.lua for
//    the native Lest runner: its require() becomes a spikeRequire() that reads
//    an `instance.__path` field off a fake tree. Roblox instances have no
//    __path, so staging include/ verbatim fails at the first import with
//    `__path is not a valid member of ModuleScript`. The pristine upstream
//    copy is what roblox-ts restores include/ from on every build.
const PRISTINE_INCLUDE = path.join(ROOT, "node_modules", "roblox-ts", "include");
if (!fs.existsSync(path.join(PRISTINE_INCLUDE, "RuntimeLib.lua"))) {
	process.stderr.write("roblox-ts include/ not found; run `npm install` first\n");
	process.exit(1);
}
fs.cpSync(PRISTINE_INCLUDE, path.join(STAGE, "include"), { recursive: true });

// 2. ReplicatedStorage.TS -- the package itself, minus the vendor and the
//    native-only spike entry (main.luau drives the table-host smoke test).
for (const name of ["init.luau", "polyfills.luau"]) {
	copyLuau(path.join(OUT, name), path.join(STAGE, "TS", name), false);
}
for (const dir of ["css", "host"]) {
	copyTree(path.join(OUT, dir), path.join(STAGE, "TS", dir), false);
}

// 3. The vendored React 19 graph, under the @toil scope the requires expect.
const VENDOR = {
	"toil-react": "react",
	"toil-react-reconciler": "react-reconciler",
	"toil-scheduler": "scheduler",
};
for (const [from, to] of Object.entries(VENDOR)) {
	copyTree(path.join(OUT, "vendor", from), path.join(STAGE, "node_modules", "@toil", to), true);
}

// 4. The JS-semantics runtime every staged module installs into its env.
stageRuntime();

// 4b. Container init scripts. Azul's Rojo-compat builder emits a `$path`
//     directory that has no init script twice (once for the project node, once
//     while walking it), which lands duplicate Folders in Studio. A directory
//     with an init script is emitted once, as a ModuleScript container, and
//     WaitForChild resolves through it exactly like a Folder.
const CONTAINER_INIT =
	"-- toil-luau: container module (see scripts/stage-studio.mjs). Intentionally empty.\nreturn {}\n";
for (const dir of ["include", "node_modules"]) {
	fs.writeFileSync(path.join(STAGE, dir, "init.luau"), CONTAINER_INIT);
}

// 5. The demo LocalScript. `.client.luau` is how Rojo spells a LocalScript.
const demo = path.join(ROOT, "scripts", "studio-demo.client.luau");
fs.mkdirSync(path.join(STAGE, "StarterPlayerScripts"), { recursive: true });
fs.copyFileSync(demo, path.join(STAGE, "StarterPlayerScripts", "ToilDemo.client.luau"));

process.stdout.write(
	`staged ${copied} files to .studio-stage (${rewritten} headers rewritten to RuntimeLib)\n`,
);
