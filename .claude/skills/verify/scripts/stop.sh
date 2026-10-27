#!/usr/bin/env bash
# Stop the dev server launch.sh started on VERIFY_PORT and remove its state dir.
# Kills only that process group. Never touches .verify-artifacts/.

set -uo pipefail

PORT="${VERIFY_PORT:-8091}"
STATE="/tmp/fc-verify-$PORT"

if [ ! -f "$STATE/pid" ]; then
  echo "nothing to stop on port $PORT"
  exit 0
fi

pid=$(cat "$STATE/pid")
if kill -0 "$pid" 2>/dev/null; then
  pgid=$(ps -o pgid= -p "$pid" | tr -d ' ')
  kill -TERM -- "-$pgid" 2>/dev/null
  for _ in $(seq 1 10); do kill -0 "$pid" 2>/dev/null || break; sleep 1; done
  kill -KILL -- "-$pgid" 2>/dev/null || true
fi
rm -rf "$STATE"
echo "stopped dev server on port $PORT"
