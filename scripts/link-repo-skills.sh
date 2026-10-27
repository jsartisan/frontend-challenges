#!/usr/bin/env bash
# Expose this repo's Claude Code skills and agents at the user level.
#
# A claude.ai cloud project session can start without loading the repo's own
# .claude/ config (skills, agents, hooks), so `/poteto-mode` answers "Unknown
# skill". The same session does load ~/.claude/skills and ~/.claude/agents.
#
# Usage: scripts/link-repo-skills.sh [--copy]
#   (default)  symlink each skill and agent. For the cloud environment's setup
#              script: it runs before the session starts, and the links keep
#              pointing at the live checkout after the environment is cached.
#   --copy     copy instead, for a session that is already running. A running
#              session picks up copied skill folders and agent files, but not
#              symlinked ones.
# A name that already exists at the user level and is not one of ours is left
# alone. Ours are links into this repo and the copies listed in the manifest
# below. Each run refreshes them and removes the ones whose source is gone.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mode=link
if [ "${1:-}" = "--copy" ]; then
  mode=copy
elif [ -n "${1:-}" ]; then
  echo "usage: $0 [--copy]" >&2
  exit 2
fi

skills_dir="$HOME/.claude/skills"
agents_dir="$HOME/.claude/agents"
manifest="$HOME/.claude/.link-repo-skills-copies"
mkdir -p "$skills_dir" "$agents_dir"
touch "$manifest"
copied=()

install_entry() {
  local src="$1" dest="$2"
  if [ -L "$dest" ]; then
    case "$(readlink "$dest")" in "$ROOT"/*) ;; *) return 0 ;; esac
    [ "$mode" = link ] || return 0
  elif [ -e "$dest" ]; then
    grep -Fxq "$dest" "$manifest" || return 0
  fi
  rm -rf "$dest"
  if [ "$mode" = link ]; then
    ln -s "$src" "$dest"
  else
    cp -R "$src" "$dest"
    copied+=("$dest")
  fi
}

for skill in "$ROOT"/.claude/skills/*/; do
  skill="${skill%/}"
  [ -f "$skill/SKILL.md" ] || continue
  install_entry "$skill" "$skills_dir/$(basename "$skill")"
done

for agent in "$ROOT"/.agents/agents/*.md; do
  [ -f "$agent" ] || continue
  install_entry "$agent" "$agents_dir/$(basename "$agent")"
done

for dir in "$skills_dir" "$agents_dir"; do
  for entry in "$dir"/*; do
    [ -L "$entry" ] && [ ! -e "$entry" ] || continue
    case "$(readlink "$entry")" in "$ROOT"/*) rm -f "$entry" ;; esac
  done
done

while IFS= read -r stale; do
  case "$stale" in "$skills_dir"/* | "$agents_dir"/*) ;; *) continue ;; esac
  [ ! -L "$stale" ] || continue
  printf '%s\n' "${copied[@]}" | grep -Fxq "$stale" || rm -rf "$stale"
done <"$manifest"
printf '%s\n' "${copied[@]}" | grep -v '^$' >"$manifest" || true

# The session's watcher can miss a SKILL.md written in the same instant as its
# new folder; a later write to the file makes it reload.
if [ "${#copied[@]}" -gt 0 ]; then
  sleep 2
  for dest in "${copied[@]}"; do
    if [ -d "$dest" ]; then touch "$dest/SKILL.md"; else touch "$dest"; fi
  done
fi
