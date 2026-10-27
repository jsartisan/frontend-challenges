#!/usr/bin/env bash
# Read-only check: is the instance on VERIFY_PORT ours, up, and serving this checkout?
# Exits 0 when it is worth driving, 1 otherwise.

set -uo pipefail

ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
PORT="${VERIFY_PORT:-8091}"
STATE="/tmp/fc-verify-$PORT"
BASE="http://localhost:$PORT"
ok=0

say() { printf '%-8s %s\n' "$1" "$2"; }

if [ -f "$STATE/pid" ] && kill -0 "$(cat "$STATE/pid")" 2>/dev/null; then
  say ok "dev server pid $(cat "$STATE/pid") started by launch.sh"
else
  say FAIL "no live pid in $STATE (run launch.sh)"
  ok=1
fi

# Which pid listens on PORT? Read /proc so this works without ss or lsof.
listener_pid() {
  local hex inode fd
  hex=$(printf '%04X' "$PORT")
  for inode in $(awk -v h=":$hex" '$4 == "0A" && $2 ~ h"$" {print $10}' /proc/net/tcp /proc/net/tcp6 2>/dev/null); do
    for fd in /proc/[0-9]*/fd/*; do
      if [ "$(readlink "$fd" 2>/dev/null)" = "socket:[$inode]" ]; then
        echo "$fd" | cut -d/ -f3
        return
      fi
    done
  done
}

owner=$(listener_pid)
if [ -n "$owner" ] && [ -f "$STATE/pid" ] &&
  [ "$(ps -o pgid= -p "$owner" | tr -d ' ')" = "$(ps -o pgid= -p "$(cat "$STATE/pid")" | tr -d ' ')" ]; then
  say ok "port $PORT owned by our process group (pid $owner)"
else
  say FAIL "port $PORT not owned by the launched server (owner: ${owner:-none})"
  ok=1
fi

code=$(curl -s -o "$STATE/doctor.html" -w '%{http_code}' --max-time 60 "$BASE/challenges")
if [ "$code" = 200 ] && grep -q '/challenges/1-rtl-icon' "$STATE/doctor.html"; then
  say ok "$BASE/challenges renders the challenge list"
else
  say FAIL "$BASE/challenges returned $code or no challenge links"
  ok=1
fi

say info "checkout $ROOT at $(git -C "$ROOT" rev-parse --short HEAD)$(git -C "$ROOT" diff --quiet || echo ' (dirty)')"
say info "server log $STATE/server.log"
exit $ok
