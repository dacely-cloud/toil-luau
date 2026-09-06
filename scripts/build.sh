#!/usr/bin/env bash
# Full build pipeline for toilluau (React 19 for Roblox/Luau).
#
#   1. restore-vendor.sh          pristine npm React 19 -> src/vendor/@toil/*
#   2. patch-roblox-ts.mjs        roblox-ts is pristine after `npm install`;
#                                 patch it so the tamed vendor .js graph compiles
#                                 (skip the `any`/type-guard diagnostics for .js).
#                                 Must run BEFORE `npx roblox-ts`.
#   3. tame-vendor.mjs            JS syntax -> Luau-parseable JS (AST post-checks)
#   4. scope-to-table.mjs         the reconciler dev factory has ~1000 scope
#                                 bindings; Luau caps a function at 200 live
#                                 locals, so its scope moves onto the __ST table
#   5. roblox-ts                  compiles src (app + polyfills); vendor .js
#                                 files pass through verbatim (they are Luau)
#   6. patch-runtime-lib.mjs      include/RuntimeLib.lua is restored from
#                                 upstream by roblox-ts; re-patch it for the
#                                 native Lest runner.
#   7. postbuild-fixup.mjs        escape fixes, .js->.luau rename, runtime
#                                 headers, dispatcher self-strip, hook tuples
set -euo pipefail
cd "$(dirname "$0")/.."

bash restore-vendor.sh
node scripts/patch-roblox-ts.mjs
node scripts/tame-vendor.mjs
node scripts/this-to-self-param.mjs \
	src/vendor/toil-react/cjs/react.development.js \
	src/vendor/toil-react-reconciler/cjs/react-reconciler.development.js \
	src/vendor/toil-scheduler/cjs/scheduler.development.js
node scripts/scope-to-table.mjs src/vendor/toil-react-reconciler/cjs/react-reconciler.development.js
npx roblox-ts --type game
node scripts/patch-runtime-lib.mjs
node scripts/postbuild-fixup.mjs
echo "build done"