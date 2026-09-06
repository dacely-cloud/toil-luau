#!/usr/bin/env node
/**
 * Prepare the example's node_modules so it can build standalone.
 *
 * Cross-platform port of example/scripts/prepare.sh (which used ln, cp,
 * mv, cat). Runs on Node alone so it works on Windows.
 *
 * The example depends on the parent toilluau package. roblox-ts only allows
 * @scoped modules under node_modules, so @toilluau/core is exposed as a
 * compiled-as-.js shim (roblox-ts passes .js under node_modules through
 * verbatim, the same way the @toil/react vendor works).
 *
 * This script:
 *   1. links roblox-ts / @rbxts / @types / the @toil vendor from the parent
 *      node_modules (assumes the parent ran `npm install`),
 *   2. builds the @toilluau/core shim from the parent's compiled out/ Luau.
 *
 * Symlinks are created with a copy fallback: on Windows Node can fail to
 * create a symlink without Developer Mode / admin, and a real copy is
 * always acceptable here because roblox-ts only needs the files present.
 */

import {
	cpSync,
	mkdirSync,
	readdirSync,
	rmSync,
	writeFileSync,
	existsSync,
	statSync,
	symlinkSync,
	chmodSync,
} from "node:fs";
import { resolve, dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const EXAMPLE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PARENT = resolve(EXAMPLE, "..");
const NM = join(EXAMPLE, "node_modules");
const PARENT_NM = join(PARENT, "node_modules");

const isWin = process.platform === "win32";

/**
 * Create a symlink `target -> linkPath`, falling back to a recursive copy when
 * the platform cannot make symlinks (Windows without Developer Mode/admin).
 * Idempotent: the existing linkPath is removed first.
 */
function link(target, linkPath) {
	rmSync(linkPath, { recursive: true, force: true });
	mkdirSync(dirname(linkPath), { recursive: true });
	try {
		const st = statSync(target);
		const type = isWin && st.isDirectory() ? "junction" : st.isDirectory() ? "dir" : "file";
		symlinkSync(target, linkPath, type);
	} catch (err) {
		const st = statSync(target);
		if (st.isDirectory()) {
			cpSync(target, linkPath, { recursive: true });
		} else {
			mkdirSync(dirname(linkPath), { recursive: true });
			cpSync(target, linkPath);
		}
		process.stdout.write(`  (symlink failed, copied instead: ${err.code})\n`);
	}
}

// The parent must have been built at least once so out/ exists.
if (!existsSync(join(PARENT, "out", "host", "init.luau"))) {
	process.stdout.write("warn: ../out/host/init.luau not found; run `npm run build` in the parent first\n");
}

mkdirSync(join(NM, "@toil"), { recursive: true });
mkdirSync(join(NM, "@toilluau", "core", "host"), { recursive: true });
mkdirSync(join(NM, "@toilluau", "core", "css"), { recursive: true });

// --- link toolchain + vendor from the parent --------------------------------
for (const name of ["roblox-ts", "@rbxts", "@types"]) {
	link(join(PARENT_NM, name), join(NM, name));
}
for (const name of ["react", "react-reconciler", "scheduler"]) {
	link(join(PARENT_NM, "@toil", name), join(NM, "@toil", name));
}

// --- build the @toilluau/core shim from the parent's compiled Luau ---------
rmSync(join(NM, "@toilluau", "core"), { recursive: true, force: true });
const coreDir = join(NM, "@toilluau", "core");
mkdirSync(join(coreDir, "host"), { recursive: true });
mkdirSync(join(coreDir, "css"), { recursive: true });

for (const f of readdirSync(join(PARENT, "out", "host"))) {
	if (f.endsWith(".luau")) {
		cpSync(join(PARENT, "out", "host", f), join(coreDir, "host", f.replace(/\.luau$/, "") + ".js"));
	}
}
for (const f of readdirSync(join(PARENT, "out", "css"))) {
	if (f.endsWith(".luau")) {
		cpSync(join(PARENT, "out", "css", f), join(coreDir, "css", f.replace(/\.luau$/, "") + ".js"));
	}
}
cpSync(join(PARENT, "out", "polyfills.luau"), join(coreDir, "polyfills.js"));
// init.js is the entry name roblox-ts resolves; the original mv'd it to index.js.
try {
	cpSync(join(coreDir, "host", "init.js"), join(coreDir, "host", "index.js"));
} catch {
	// ignore (init.js may not exist if the parent has not been built)
}

writeFileSync(
	join(coreDir, "package.json"),
	'{ "name": "@toilluau/core", "version": "0.1.0", "main": "host/index.js", "types": "index.d.ts" }\n',
);

writeFileSync(
	join(coreDir, "index.d.ts"),
	[
		"export interface MountHandle { gui: unknown; unmount: () => void; tick: (now: number) => void; }",
		"export interface StyleRule { selector: string; declarations?: Record<string, string>; }",
		"export function mountReactRoot(container: unknown, rules: Array<StyleRule>, element: unknown, engine?: unknown, envOverride?: unknown): MountHandle;",
		"export function makeEngineEnv(): unknown;",
		"export function makeDefaultEngine(rules: Array<StyleRule>): unknown;",
		"export function applyStyle(): void;",
		"export function buildHostConfig(): unknown;",
		"export function tick(): void;",
		"export function createDriver(): unknown;",
		"export function startAnimation(): void;",
		"export function startTransition(): void;",
		"export function makeRealClock(): unknown;",
		"export function makeFakeClock(): unknown;",
		"",
	].join("\n"),
);

// --- create the .bin shims a real `npm install` would make -----------------
// The example's build script invokes `roblox-ts -p .`, which resolves via
// node_modules/.bin. The roblox-ts package's only declared bin is `rbxtsc`,
// so a plain link of the package does not put a `roblox-ts` command on .bin
// (this is why a from-scratch example build hit "roblox-ts: not found").
// Reproduce what npm's bin linker emits for a package whose bin maps a command
// to a Node CLI: a `roblox-ts` entry (what the example calls) plus `rbxtsc`
// (the real bin name), each a platform launcher pointing at the CLI.
const roBloxTsCli = join(PARENT_NM, "roblox-ts", "out", "CLI", "cli.js");
if (existsSync(roBloxTsCli)) {
	const binDir = join(NM, ".bin");
	mkdirSync(binDir, { recursive: true });
	for (const name of ["roblox-ts", "rbxtsc"]) {
		// Unix launcher (works in Git-Bash / WSL too).
		const unix = `#!/bin/sh\nexec node ${JSON.stringify(roBloxTsCli)} "$@"\n`;
		try {
			writeFileSync(join(binDir, name), unix);
			chmodSync(join(binDir, name), 0o755);
		} catch {}
		// Windows .cmd launcher (npm creates <name>.cmd on win32).
		const cmd = `@ECHO off\r\nnode ${JSON.stringify(roBloxTsCli)} %*\r\n`;
		try {
			writeFileSync(join(binDir, name + ".cmd"), cmd);
		} catch {}
	}
}

process.stdout.write("example prepared\n");