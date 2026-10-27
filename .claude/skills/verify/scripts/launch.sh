#!/usr/bin/env bash
# Start the www app's Next.js dev server for a verification run and wait until
# the home page actually renders.
#
# Usage: launch.sh            (port from VERIFY_PORT, default 8091)
# Prints the base URL on success. State (pid, log) lives in
# /tmp/fc-verify-<port>/ so stop.sh can kill exactly what this started.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
PORT="${VERIFY_PORT:-8091}"
STATE="/tmp/fc-verify-$PORT"
BASE="http://localhost:$PORT"

if [ -f "$STATE/pid" ] && kill -0 "$(cat "$STATE/pid")" 2>/dev/null; then
  echo "already running (pid $(cat "$STATE/pid")): $BASE"
  exit 0
fi

if curl -s -o /dev/null --max-time 2 "$BASE"; then
  echo "port $PORT is served by something this script did not start; pick another VERIFY_PORT" >&2
  exit 1
fi

# Two Next dev servers in one checkout share apps/www/.next and corrupt each other.
for other in $(pgrep -f "next dev" || true); do
  if [ "$(readlink "/proc/$other/cwd" 2>/dev/null)" = "$ROOT/apps/www" ]; then
    echo "another next dev (pid $other) is running in this checkout; stop it or use a separate worktree" >&2
    exit 1
  fi
done

if [ ! -d "$ROOT/node_modules" ]; then
  (cd "$ROOT" && pnpm install --frozen-lockfile)
fi

mkdir -p "$STATE"
cd "$ROOT/apps/www"
NEXT_TELEMETRY_DISABLED=1 setsid pnpm exec next dev --turbopack -p "$PORT" >"$STATE/server.log" 2>&1 &
echo $! >"$STATE/pid"

for _ in $(seq 1 90); do
  grep -q "Ready in" "$STATE/server.log" && break
  if ! kill -0 "$(cat "$STATE/pid")" 2>/dev/null; then
    echo "dev server exited; see $STATE/server.log" >&2
    tail -20 "$STATE/server.log" >&2
    exit 1
  fi
  sleep 1
done

# "Ready" only means the server listens. The first request compiles the app
# (about 30 s cold), so warm the routes the journeys use.
for path in / /challenges /challenges/1-rtl-icon /play; do
  body=$(curl -s --max-time 180 "$BASE$path" || true)
  if ! grep -q "<title>" <<<"$body"; then
    echo "$path did not render; see $STATE/server.log" >&2
    exit 1
  fi
done

echo "$BASE"
