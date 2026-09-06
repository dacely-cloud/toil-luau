#!/usr/bin/env node
/**
 * Full build pipeline for toil-luau (React 19 for Roblox/Luau).
 *
 * Cross-platform port of scripts/build.sh. The shell script existed only to
 * sequence six steps; this runs them in order under Node so the whole
 * pipeline is portable to Windows. Each step is the SAME script the shell
 * version called, so behavior is identical:
 *
 *   1. restore-vendor.mjs        pristine npm React 19 -> src/vendor/@toil/*
 *   2. patch-roblox-ts.mjs       pristine roblox-ts after `npm install`; patch
 *                                it so the tamed vendor .js graph compiles.
 *   3. tame-vendor.mjs           JS syntax -> Luau-parseable JS
 *   4. this-to-self-param.mjs    fix `this` in arrow methods the VM needs
 *   5. scope-to-table.mjs        reconciler dev factory scope -> __ST table
 *   6. `npx roblox-ts --type game`  compile src -> out/ (game project type)
 *   7. patch-runtime-lib.mjs     re-patch include/RuntimeLib.lua for the runner
 *   8. postbuild-fixup.mjs       escape fixes, .js->.luau rename, runtime headers
 *
 * Runs from the project root regardless of cwd (build.sh used to `cd` first).
 */

import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const scripts = (name) => resolve(ROOT, "scripts", name);

/**
 * Run a step, printing a small header. Fails the whole build (non-zero exit)
 * if the step does, mirroring `set -euo pipefail` in the shell version.
 */
function run(label, cmd, args, opts = {}) {
	process.stdout.write(`\n=== ${label} ===\n$ ${cmd} ${args.join(" ")}\n`);
	const res = spawnSync(cmd, args, {
		cwd: ROOT,
		stdio: "inherit",
		shell: process.platform === "win32" ? true : false,
		...opts,
	});
	if (res.error) {
		throw new Error(`${label} failed to start: ${res.error.message}`);
	}
	if (res.status !== 0) {
		process.exit(res.status ?? 1);
	}
}

// 1. restore the @toil vendor from the pristine npm React packages
run("1/7 restore-vendor", process.execPath, [resolve(ROOT, "restore-vendor.mjs")]);

// 2. patch the just-installed roblox-ts for the tamed vendor graph
run("2/7 patch-roblox-ts", process.execPath, [scripts("patch-roblox-ts.mjs")]);

// 3. desugar the vendor JS into Luau-parseable JS
run("3/7 tame-vendor", process.execPath, [scripts("tame-vendor.mjs")]);

// 4. fix `this` in arrow methods (explicit vendor cjs files, as build.sh passed them)
run("4/7 this-to-self-param", process.execPath, [
	scripts("this-to-self-param.mjs"),
	"src/vendor/toil-react/cjs/react.development.js",
	"src/vendor/toil-react-reconciler/cjs/react-reconciler.development.js",
	"src/vendor/toil-scheduler/cjs/scheduler.development.js",
]);

// 5. move the reconciler dev factory scope onto the __ST table
run("5/7 scope-to-table", process.execPath, [
	scripts("scope-to-table.mjs"),
	"src/vendor/toil-react-reconciler/cjs/react-reconciler.development.js",
]);

// 6. compile to Luau (game project type -> ReplicatedStorage runtime headers)
run("6/7 roblox-ts", "npx", ["roblox-ts", "--type", "game"]);

// 7. re-patch the RuntimeLib that roblox-ts restored from upstream
run("7/7a patch-runtime-lib", process.execPath, [scripts("patch-runtime-lib.mjs")]);

// 8. final postbuild fixups
run("7/7b postbuild-fixup", process.execPath, [scripts("postbuild-fixup.mjs")]);

process.stdout.write("\nbuild done\n");