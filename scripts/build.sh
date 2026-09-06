#!/usr/bin/env bash
# Thin wrapper for the full build pipeline. The real work is in
# scripts/build.mjs (Node), so this only exists so `bash scripts/build.sh`
# keeps working under Git-Bash / WSL. On native Windows, run `npm run build`
# which calls node directly.
set -euo pipefail
cd "$(dirname "$0")/.."
exec node scripts/build.mjs "$@"