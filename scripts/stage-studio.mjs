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

// JS globals the vendored React graph reads as bare identifiers. Roblox scopes
// globals per script, so _G is not enough -- each module that uses one has to
// bind it as a local. See scripts/studio-shim.luau.
const JS_GLOBALS = [
	"process",
	"performance",
	"queueMicrotask",
	"setTimeout",
	"clearTimeout",
	"setImmediate",
	"clearImmediate",
	"console",
];

const SHIM_REQUIRE =
	'local _shim = require(game:GetService("ReplicatedStorage"):WaitForChild("ToilShim"))';

let bound = 0;

/**
 * Prepend `local <g> = _shim.<g>` for each JS global the module actually reads.
 * Only the used names are bound: these files are already near Luau's 200-local
 * ceiling (scope-to-table.mjs exists for that reason), so binding all eight
 * everywhere would be needless pressure.
 */
function bindGlobals(s) {
	const used = JS_GLOBALS.filter((g) =>
		new RegExp(`(^|[^._\\w])${g}[^\\w]`).test(s),
	);
	if (used.size === 0 || used.length === 0) return s;
	const preamble =
		`-- toil-luau: JS globals this module reads bare (see studio-shim.luau)\n` +
		`${SHIM_REQUIRE}\n` +
		`local ${used.join(", ")} = ${used.map((g) => "_shim." + g).join(", ")}\n`;
	bound++;
	// After the RuntimeLib header when there is one, so TS stays first.
	const idx = s.indexOf(ROBLOX_HEADER);
	if (idx >= 0) {
		const cut = idx + ROBLOX_HEADER.length + 1;
		return s.slice(0, cut) + preamble + s.slice(cut);
	}
	return preamble + s;
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
	s = bindGlobals(s);
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

// 4. The globals shim every staged module binds from.
fs.copyFileSync(path.join(ROOT, "scripts", "studio-shim.luau"), path.join(STAGE, "ToilShim.luau"));

// 5. The demo LocalScript. `.client.luau` is how Rojo spells a LocalScript.
const demo = path.join(ROOT, "scripts", "studio-demo.client.luau");
fs.mkdirSync(path.join(STAGE, "StarterPlayerScripts"), { recursive: true });
fs.copyFileSync(demo, path.join(STAGE, "StarterPlayerScripts", "ToilDemo.client.luau"));

process.stdout.write(
	`staged ${copied} files to .studio-stage (${rewritten} headers rewritten to RuntimeLib)\n`,
);
