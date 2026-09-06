#!/usr/bin/env node
/**
 * Restore the vendored @toil/* React 19 runtime from the pristine npm
 * react / react-reconciler / scheduler packages.
 *
 * Cross-platform port of the original restore-vendor.sh (which used cp, sed,
 * grep and find). Runs on Node alone so it works on Windows, macOS and Linux.
 *
 * What it does, per package:
 *   1. copies the entry files and the CJS builds they select
 *   2. rewrites require("react") / require("scheduler") /
 *      require("react-reconciler") to require("@toil/...") so the whole
 *      graph shares ONE React copy
 *   3. copies the TS type surface back (rm -rf above wipes vendor/)
 *   4. writes a package.json with main pointing at the JS entry
 *
 * Idempotent: safe to re-run on every `npm install`.
 */

import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)));
const NM = join(ROOT, "node_modules");
const V = join(ROOT, "src", "vendor");

/** Recursively list every file under `dir`. */
function walk(dir) {
	const out = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walk(full));
		else out.push(full);
	}
	return out;
}

/**
 * Copy a source file, creating any missing parent directories on the
 * destination side (Node 20+ has cpSync withDirs, but we keep it explicit).
 */
function copyTo(src, dst) {
	mkdirSync(dirname(dst), { recursive: true });
	cpSync(src, dst);
}

// --- wipe + recreate the vendor tree ---------------------------------------
rmSync(join(V, "toil-react"), { recursive: true, force: true });
rmSync(join(V, "toil-react-reconciler"), { recursive: true, force: true });
rmSync(join(V, "toil-scheduler"), { recursive: true, force: true });
for (const p of ["toil-react", "toil-react-reconciler", "toil-scheduler"]) {
	mkdirSync(join(V, p, "cjs"), { recursive: true });
}

// --- react -----------------------------------------------------------------
const reactEntry = [
	"index.js",
	"jsx-runtime.js",
	"jsx-dev-runtime.js",
];
for (const f of reactEntry) {
	copyTo(join(NM, "react", f), join(V, "toil-react", f));
}
const reactCjs = [
	"react.development.js",
	"react.production.js",
	"react-jsx-runtime.development.js",
	"react-jsx-runtime.production.js",
	"react-jsx-dev-runtime.development.js",
	"react-jsx-dev-runtime.production.js",
];
for (const f of reactCjs) {
	copyTo(join(NM, "react", "cjs", f), join(V, "toil-react", "cjs", f));
}

// --- react-reconciler ------------------------------------------------------
copyTo(join(NM, "react-reconciler", "index.js"), join(V, "toil-react-reconciler", "index.js"));
for (const f of ["react-reconciler.development.js", "react-reconciler.production.js"]) {
	copyTo(join(NM, "react-reconciler", "cjs", f), join(V, "toil-react-reconciler", "cjs", f));
}

// --- scheduler -------------------------------------------------------------
copyTo(join(NM, "scheduler", "index.js"), join(V, "toil-scheduler", "index.js"));
for (const f of ["scheduler.development.js", "scheduler.production.js"]) {
	copyTo(join(NM, "scheduler", "cjs", f), join(V, "toil-scheduler", "cjs", f));
}

// --- rewrite cross-requires to @toil/* -------------------------------------
// The originals used a fixed set of sed substitutions over every .js file
// under src/vendor. Reproduce them exactly, in the same order.
const REWRITES = [
	[/require\("react"\)/g, 'require("@toil/react")'],
	[/require\("react\/"\)/g, 'require("@toil/react/")'],
	[/require\("scheduler"\)/g, 'require("@toil/scheduler")'],
	[/require\("react-reconciler"\)/g, 'require("@toil/react-reconciler")'],
];

let patchedFiles = 0;
let patchedLines = 0;
for (const file of walk(V)) {
	if (!file.endsWith(".js")) continue;
	const before = readFileSync(file, "utf8");
	let after = before;
	for (const [re, rep] of REWRITES) {
		after = after.replace(re, () => {
			patchedLines++;
			return rep;
		});
	}
	if (after !== before) {
		writeFileSync(file, after);
		patchedFiles++;
	}
}

// --- type surface ----------------------------------------------------------
for (const p of ["toil-react", "toil-react-reconciler", "toil-scheduler"]) {
	const srcDir = join(ROOT, "type-shims", "toil-vendor-types", p);
	for (const f of readdirSync(srcDir)) {
		if (f.endsWith(".d.ts")) {
			cpSync(join(srcDir, f), join(V, p, f));
		}
	}
}

// --- package.json entries --------------------------------------------------
const entries = [
	["toil-react", "@toil/react", "19.2.8"],
	["toil-react-reconciler", "@toil/react-reconciler", "0.33.0"],
	["toil-scheduler", "@toil/scheduler", "0.27.0"],
];
for (const [dir, name, version] of entries) {
	const pj = {
		name,
		version,
		description: "Vendored React 19 for the toil-roblox spike (single-copy @toil graph)",
		main: "index.js",
		types: "index.d.ts",
	};
	writeFileSync(join(V, dir, "package.json"), JSON.stringify(pj, null, 2) + "\n");
}

// --- report (mirrors the original bash output) -----------------------------
console.log("restored vendor/:");
for (const f of walk(V).filter((f) => f.endsWith(".js")).sort()) {
	console.log("  " + f.slice(ROOT.length + 1));
}
console.log(`patched require lines in ${patchedFiles} files (${patchedLines} substitutions)`);

// Hard fail loudly if the pristine react packages were not found (a fresh
// `npm install` is required before this runs).
for (const p of ["react", "react-reconciler", "scheduler"]) {
	if (!existsSync(join(NM, p))) {
		throw new Error(`node_modules/${p} missing - run \`npm install\` first`);
	}
}