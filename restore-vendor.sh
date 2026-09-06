#!/usr/bin/env bash
# Restore the vendored @toil/* React 19 runtime from the pristine npm
# react / react-reconciler / scheduler packages.
#
# What it does, per package:
#   1. copies the entry files and the CJS builds they select
#   2. rewrites require("react") / require("scheduler") / require("react-reconciler")
#      to require("@toil/...") so the whole graph shares ONE React copy
#   3. writes a package.json with main pointing at the JS entry
#
# The TS type surface is checked in under type-shims/toil-vendor-types/;
# step 4 copies it back, because rm -rf above wipes whatever was in vendor/.
set -euo pipefail
cd "$(dirname "$0")"

NM=node_modules
V=src/vendor

rm -rf "$V/toil-react" "$V/toil-react-reconciler" "$V/toil-scheduler"
mkdir -p "$V/toil-react/cjs" "$V/toil-react-reconciler/cjs" "$V/toil-scheduler/cjs"

# --- react ---------------------------------------------------------------
cp "$NM/react/index.js" "$NM/react/jsx-runtime.js" "$NM/react/jsx-dev-runtime.js" "$V/toil-react/"
cp "$NM/react/cjs/react.development.js" \
   "$NM/react/cjs/react.production.js" \
   "$NM/react/cjs/react-jsx-runtime.development.js" \
   "$NM/react/cjs/react-jsx-runtime.production.js" \
   "$NM/react/cjs/react-jsx-dev-runtime.development.js" \
   "$NM/react/cjs/react-jsx-dev-runtime.production.js" \
   "$V/toil-react/cjs/"

# --- react-reconciler ----------------------------------------------------
cp "$NM/react-reconciler/index.js" "$V/toil-react-reconciler/"
cp "$NM/react-reconciler/cjs/"react-reconciler.development.js \
   "$NM/react-reconciler/cjs/"react-reconciler.production.js \
   "$V/toil-react-reconciler/cjs/"

# --- scheduler -----------------------------------------------------------
cp "$NM/scheduler/index.js" "$V/toil-scheduler/"
cp "$NM/scheduler/cjs/scheduler.development.js" \
   "$NM/scheduler/cjs/scheduler.production.js" \
   "$V/toil-scheduler/cjs/"

# --- rewrite cross-requires to @toil/* ------------------------------------
grep -rl --include='*.js' -e 'require("react")' -e 'require("react/")' -e 'require("scheduler")' -e 'require("react-reconciler")' "$V" | while IFS= read -r f; do
  sed -i \
    -e 's/require("react")/require("@toil\/react")/g' \
    -e 's/require("react")/require("@toil\/react")/g' \
    -e 's/require("scheduler")/require("@toil\/scheduler")/g' \
    -e 's/require("react-reconciler")/require("@toil\/react-reconciler")/g' \
    "$f"
done

# --- type surface ------------------------------------------------------------
for p in toil-react toil-react-reconciler toil-scheduler; do
  cp type-shims/toil-vendor-types/$p/*.d.ts "$V/$p/"
done

# --- package.json entries -------------------------------------------------
node -e '
const fs = require("fs");
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
  fs.writeFileSync(`src/vendor/${dir}/package.json`, JSON.stringify(pj, null, 2) + "\n");
}
'

echo "restored vendor/:"
find src/vendor -name '*.js' | sort
echo "patched require lines:"
grep -rn 'require("@toil/' src/vendor --include='*.js' | head -10