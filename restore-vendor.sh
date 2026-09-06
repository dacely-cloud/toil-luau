#!/usr/bin/env bash
# Thin wrapper for cross-platform tooling. The real work is in
# restore-vendor.mjs (Node), so this only exists so `bash restore-vendor.sh`
# keeps working under Git-Bash / WSL. On native Windows, run `npm run restore`
# which calls node directly.
set -euo pipefail
cd "$(dirname "$0")"
exec node restore-vendor.mjs "$@"