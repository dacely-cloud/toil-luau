#!/usr/bin/env bash
# Thin wrapper for the example prebuild. The real work is in
# scripts/prepare.mjs (Node), so this only exists so `bash scripts/prepare.sh`
# keeps working under Git-Bash / WSL. On native Windows, `npm run build`
# (prebuild) calls node directly.
set -euo pipefail
cd "$(dirname "$0")/.."
exec node scripts/prepare.mjs "$@"