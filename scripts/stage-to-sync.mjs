#!/usr/bin/env node
/**
 * Copy the staged Roblox tree (.studio-stage/, from scripts/stage-studio.mjs)
 * into Azul's live-sync mirror (sync/), so a running `azul` daemon patches the
 * scripts that already exist in Studio.
 *
 * Why this exists: `azul build --rojo` (see `npm run studio`) needs its own
 * connection to the Studio plugin, so every full push means stopping the
 * daemon and reconnecting the plugin twice. Once the tree is in Studio, the
 * daemon mirrors Studio <-> sync/ live, and updating a script is just writing
 * its file in sync/. This script does that mapping for every staged file:
 *
 *   .studio-stage/TS/init.luau              -> sync/ReplicatedStorage/TS.luau
 *   .studio-stage/TS/host/init.luau         -> sync/ReplicatedStorage/TS/host.luau
 *   .studio-stage/TS/css/engine.luau        -> sync/ReplicatedStorage/TS/css/engine.luau
 *   .studio-stage/include/RuntimeLib.lua    -> sync/ReplicatedStorage/rbxts_include/RuntimeLib.luau
 *   .studio-stage/node_modules/@toil/...    -> sync/ReplicatedStorage/node_modules/@toil/...
 *   .studio-stage/ToilRuntime.luau          -> sync/ReplicatedStorage/ToilRuntime.luau
 *   .studio-stage/StarterPlayerScripts/X.client.luau
 *                                           -> sync/StarterPlayer/StarterPlayerScripts/X.client.luau
 *
 * (Azul spells a ModuleScript that has children as `Name.luau` beside a
 * `Name/` directory, and always uses the .luau extension.)
 *
 * Azul does not create Studio instances from new files, so a file whose
 * instance is missing in Studio is reported, not written: run `npm run studio`
 * for a full push in that case. The container `init.luau` files the staging
 * writes for rbxts_include / node_modules are skipped on purpose -- in Studio
 * those are plain Folders, which need no source.
 *
 * Usage: node scripts/stage-to-sync.mjs   (or `npm run studio:sync`)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STAGE = path.join(ROOT, ".studio-stage");
const SYNC = path.join(ROOT, "sync");

if (!fs.existsSync(path.join(STAGE, "TS", "init.luau"))) {
	process.stderr.write("nothing staged; run `node scripts/stage-studio.mjs` first\n");
	process.exit(1);
}
if (!fs.existsSync(path.join(SYNC, "ReplicatedStorage"))) {
	process.stderr.write(
		"sync/ReplicatedStorage is missing: start `azul` in this directory and connect the Studio plugin first\n",
	);
	process.exit(1);
}

/** Map one staged file (relative to .studio-stage) to its sync/ path, or null to skip. */
function mapToSync(rel) {
	const parts = rel.split(/[\\/]/);
	const top = parts[0];
	let dest;
	if (top === "ServerScriptService") {
		dest = parts;
	} else if (top === "StarterPlayerScripts") {
		dest = ["StarterPlayer", "StarterPlayerScripts", ...parts.slice(1)];
	} else if (top === "include") {
		if (parts.length === 2 && parts[1] === "init.luau") return null; // Folder in Studio
		dest = ["ReplicatedStorage", "rbxts_include", ...parts.slice(1)];
	} else if (top === "node_modules") {
		if (parts.length === 2 && parts[1] === "init.luau") return null; // Folder in Studio
		dest = ["ReplicatedStorage", ...parts];
	} else {
		dest = ["ReplicatedStorage", ...parts];
	}
	// A directory's init script is the ModuleScript named after the directory.
	const last = dest[dest.length - 1];
	if (last === "init.luau" || last === "init.lua") {
		dest.pop();
		dest[dest.length - 1] = dest[dest.length - 1] + ".luau";
	} else if (last.endsWith(".lua")) {
		dest[dest.length - 1] = last.slice(0, -4) + ".luau";
	}
	return path.join(SYNC, ...dest);
}

function walk(dir, out) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p, out);
		else out.push(p);
	}
	return out;
}

let written = 0;
let unchanged = 0;
const missing = [];
for (const file of walk(STAGE, [])) {
	const rel = path.relative(STAGE, file);
	const dest = mapToSync(rel);
	if (dest === null) continue;
	if (!fs.existsSync(dest)) {
		missing.push(path.relative(ROOT, dest));
		continue;
	}
	const next = fs.readFileSync(file, "utf8");
	const prev = fs.readFileSync(dest, "utf8");
	if (prev === next) {
		unchanged++;
		continue;
	}
	fs.writeFileSync(dest, next);
	written++;
}

process.stdout.write(`stage-to-sync: ${written} updated, ${unchanged} unchanged\n`);
if (missing.length > 0) {
	process.stdout.write(
		`not in Studio yet (run \`npm run studio\` for a full push):\n  ${missing.join("\n  ")}\n`,
	);
}
