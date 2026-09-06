#!/usr/bin/env bash
# Prepare the example's node_modules so it can build standalone.
#
# The example depends on the parent toilluau package. roblox-ts only allows
# @scoped modules under node_modules, so @toilluau/core is exposed as a
# compiled-as-.js shim (roblox-ts passes .js under node_modules through
# verbatim, the same way the @toil/react vendor works).
#
# This script:
#   1. links roblox-ts / @rbxts / @types / the @toil vendor from the parent
#      node_modules (assumes the parent ran `npm install`),
#   2. builds the @toilluau/core shim from the parent's compiled out/ Luau.
#
# Run it before building (it is wired into `npm run build`).
set -euo pipefail
cd "$(dirname "$0")/.."

NM=node_modules
# Absolute path to the parent's node_modules (avoids symlink-relative loops).
PARENT_NM="$(cd .. && pwd)/node_modules"

# The parent must have been built at least once so out/ exists.
if [ ! -f ../out/host/init.luau ]; then
	echo "warn: ../out/host/init.luau not found; run `npm run build` in the parent first" >&2
fi

mkdir -p "$NM/@toil" "$NM/@toilluau/core/host" "$NM/@toilluau/core/css"

# --- link toolchain + vendor from the parent -------------------------------
rm -f "$NM/roblox-ts" "$NM/@rbxts" "$NM/@types"
rm -f "$NM/@toil/react" "$NM/@toil/react-reconciler" "$NM/@toil/scheduler"
ln -sfn "$PARENT_NM/roblox-ts" "$NM/roblox-ts"
ln -sfn "$PARENT_NM/@rbxts"    "$NM/@rbxts"
ln -sfn "$PARENT_NM/@types"    "$NM/@types"
ln -sfn "$PARENT_NM/@toil/react"                 "$NM/@toil/react"
ln -sfn "$PARENT_NM/@toil/react-reconciler"      "$NM/@toil/react-reconciler"
ln -sfn "$PARENT_NM/@toil/scheduler"             "$NM/@toil/scheduler"

# --- build the @toilluau/core shim from the parent's compiled Luau ---------
rm -rf "$NM/@toilluau/core"
mkdir -p "$NM/@toilluau/core/host" "$NM/@toilluau/core/css"
for f in ../out/host/*.luau; do
	cp "$f" "$NM/@toilluau/core/host/$(basename "$f" .luau).js"
done
for f in ../out/css/*.luau; do
	cp "$f" "$NM/@toilluau/core/css/$(basename "$f" .luau).js"
done
cp ../out/polyfills.luau "$NM/@toilluau/core/polyfills.js"
mv "$NM/@toilluau/core/host/init.js" "$NM/@toilluau/core/host/index.js" 2>/dev/null || true

cat > "$NM/@toilluau/core/package.json" <<'JSON'
{ "name": "@toilluau/core", "version": "0.1.0", "main": "host/index.js", "types": "index.d.ts" }
JSON

cat > "$NM/@toilluau/core/index.d.ts" <<'TS'
export interface MountHandle { gui: unknown; unmount: () => void; tick: (now: number) => void; }
export interface StyleRule { selector: string; declarations?: Record<string, string>; }
export function mountReactRoot(container: unknown, rules: Array<StyleRule>, element: unknown, engine?: unknown, envOverride?: unknown): MountHandle;
export function makeEngineEnv(): unknown;
export function makeDefaultEngine(rules: Array<StyleRule>): unknown;
export function applyStyle(): void;
export function buildHostConfig(): unknown;
export function tick(): void;
export function createDriver(): unknown;
export function startAnimation(): void;
export function startTransition(): void;
export function makeRealClock(): unknown;
export function makeFakeClock(): unknown;
TS

echo "example prepared: $(find "$NM" -maxdepth 2 -mindepth 1 | wc -l) entries"