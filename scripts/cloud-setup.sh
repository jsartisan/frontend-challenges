#!/usr/bin/env bash
# Setup script for claude.ai cloud containers. Set the environment's setup
# script to: bash /home/user/frontend-challenges/scripts/cloud-setup.sh
#
# It runs as root before the session starts, without the environment's
# variables or secrets. A non-zero exit stops the session from starting, so
# every step logs its failure and the script always exits 0.

set -o pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG=/tmp/cloud-setup.log

step() {
  local name="$1"
  shift
  if "$@" 2>&1 | sed "s/^/[$name] /" >>"$LOG"; then
    echo "[$name] ok" >>"$LOG"
  else
    echo "FAILED $name (see $LOG)"
  fi
}

# Fast steps first, since the setup run can be cut off early.
step skills bash "$ROOT/scripts/link-repo-skills.sh"
step pnpm bash -c "cd '$ROOT' && corepack enable >/dev/null 2>&1; pnpm install --frozen-lockfile"

exit 0
