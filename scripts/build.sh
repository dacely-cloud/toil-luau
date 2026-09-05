#!/usr/bin/env bash
# Full rebuild pipeline for the React 19 spike.
#
#   1. restore-vendor.sh          pristine npm React 19 -> src/vendor/@toil/*
#   2. tame-vendor.mjs            JS syntax -> Luau-parseable JS (AST post-checks)
#   3. scope-to-table.mjs         the reconciler dev factory has ~1000 scope
#                                 bindings; Luau caps a function at 200 live
#                                 locals, so its scope moves onto the __ST table
#   4. roblox-ts                  compiles src (app + polyfills); vendor .js
#                                 files pass through verbatim (they are Luau)
#   5. postbuild-fixup.mjs        escape fixes, .js->.luau rename, runtime
#                                 headers, dispatcher self-strip, hook tuples
set -euo pipefail
cd "$(dirname "$0")/.."

bash restore-vendor.sh
node scripts/tame-vendor.mjs
node scripts/this-to-self-param.mjs \
	src/vendor/toil-react/cjs/react.development.js \
	src/vendor/toil-react-reconciler/cjs/react-reconciler.development.js \
	src/vendor/toil-scheduler/cjs/scheduler.development.js
node scripts/scope-to-table.mjs src/vendor/toil-react-reconciler/cjs/react-reconciler.development.js
npx roblox-ts
node scripts/postbuild-fixup.mjs
echo "build done"