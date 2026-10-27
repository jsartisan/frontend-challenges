# pstack in this repo

pstack is vendored from [pstack-claude](https://github.com/michael-denyer/pstack-claude). The version and commit are in `.agents/pstack/UPSTREAM`, and every imported path is in `.agents/pstack/MANIFEST`.

## Using it

pstack is opt-in. Nothing loads it automatically. Invoke `poteto-mode` as the session's first command, then follow the playbook it picks.

Skills live in `.claude/skills/` under plain names (`poteto-mode`, `how`, `why`, `principle-*`), with no `pstack:` prefix. Agents live in `.agents/agents/`, and `.claude/agents` links to them. Spawn them by their plain names, such as `poteto-agent`.

This repo has no project playbooks (`.agents/playbooks/`), so skip that lookup.

## Cloud sessions

A claude.ai cloud session can start before the repo is cloned, so the repo's `.claude/` skills, agents and hooks are not loaded and `/poteto-mode` answers "Unknown skill". The session does read `~/.claude/skills` and `~/.claude/agents`.

- The environment setup script runs `scripts/cloud-setup.sh`, which calls `scripts/link-repo-skills.sh` to symlink every repo skill and agent into `~/.claude` before the session starts.
- In a session that already started without them, run `bash scripts/link-repo-skills.sh --copy` from the repo root. A running session picks up copied folders but not symlinks. Then invoke `poteto-mode` again.

## The vendored files are ours

Edit them like any other file. Nothing re-syncs them, so an upgrade is a three-way merge per file against the new upstream tag. Keep `UPSTREAM` and `MANIFEST` current when you add, remove or upgrade a skill or agent.

When importing from upstream, apply the same rewrites as the first import: drop the `pstack:` prefix on Claude Code agent and skill names, write plugin-relative `skills/...` paths as `.claude/skills/...`, write "installed plugin" as "vendored pstack", and drop the plugin-namespace sentence in `poteto-mode/SKILL.md`. Leave the Codex, Copilot, Muse and Pi reference files as upstream wrote them.

## Where this repo wins

Where a playbook disagrees with this repo's own instructions (`AGENTS.md`), the repo wins.

| Topic | This repo |
| --- | --- |
| Opening PRs | Open a PR only when the user asked for one. |
| Install | `pnpm install` at the repo root. |
| Start the app | `pnpm dev` (the `www` app on port 8080). |
| Type check | `pnpm typecheck` |
| Lint and format | `pnpm lint:fix`; staged files run through `lint-staged` on commit. |
| Proving a UI change | No repo `verify` skill yet, so poteto-mode falls back to the built-in `run` skill. Run `/create-verification-skill` to add one. |

## Unrelated findings

A defect found mid-task is fixed in the same PR if it is tiny, and otherwise filed as a GitHub issue. Never drop it.
