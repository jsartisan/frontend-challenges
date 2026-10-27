---
name: verify
description: Drive the Frontend Challenges web app (the Next.js `www` app) in a real browser and capture proof that a change works. Use to verify any UI change, before claiming a fix or feature works, or when a playbook asks for the driver/verification skill.
---

# Verify Frontend Challenges

The product is one web app, `apps/www`: a Next.js site (static export in production) where users browse challenges, solve them in a Monaco editor with a live Sandpack preview, mark them complete, and use a free-form playground. There is no backend in the user path. Progress and code edits live in the browser's `localStorage`, so a fresh browser context is a clean user. The `DATABASE_URL` and GitHub auth variables are not needed to run or drive the app.

Driving is Playwright (preinstalled in cloud containers; `require("playwright")` works from any directory). Each feature in [features/](features/README.md) has a journey script under `journeys/` that the runner executes and records.

All commands run from the repo root.

## Launch

```bash
bash .claude/skills/verify/scripts/launch.sh
```

- Starts `next dev --turbopack` for `apps/www` on `VERIFY_PORT` (default `8091`, so it does not collide with the user's `pnpm dev` on 8080). Runs `pnpm install --frozen-lockfile` first if `node_modules` is missing.
- Ready means usable: it waits for `Ready in`, then requests `/`, `/challenges`, `/challenges/1-rtl-icon` and `/play` until each returns a rendered page. A cold start takes about 40 s because the first request to each route compiles it.
- Prints the base URL, e.g. `http://localhost:8091`. Pid and server log go to `/tmp/fc-verify-<port>/`.
- Refuses to start when the port already answers or another `next dev` runs in this checkout: two dev servers share `apps/www/.next` and corrupt each other. For a second instance, use a separate worktree and a different `VERIFY_PORT`.

## Doctor

```bash
bash .claude/skills/verify/scripts/doctor.sh
```

Read-only. Checks that the launched pid is alive, that the process listening on the port belongs to it, that `/challenges` renders challenge links, and prints the checkout's commit (with `(dirty)` when there are local edits). Run it first whenever anything looks off. Exit 0 means the instance is worth driving.

## Drive

```bash
node .claude/skills/verify/scripts/journey.cjs <journey> [--headed]
```

Journeys: `challenge-editor`, `mark-complete`, `challenge-filters`, `spotlight-search`, `playground`. Each feature file in [features/](features/README.md) says what its journey proves and how to drive the same path by hand.

For a change no journey covers, add a journey file to `journeys/`. It exports `async ({ page, context, base, step, expect }) => {}`:

- `page` is a Playwright page in a fresh context (empty `localStorage`), `base` the base URL.
- `await step("label", "note")` records a screenshot and an ARIA snapshot of the current state. Call it after each user action you want in the proof.
- `expect(condition, "message")` fails the run with that message.
- `journeys/_editor.cjs` has `replaceEditorText(page, text)` for Monaco and `waitForPreview(page, fn)` that polls the Sandpack preview body until `fn(body)` is true.

Handles that work in this app: roles and names (`getByRole("button", { name: "Mark as complete" })`, `getByRole("heading", { name: "#1 Icon and RTL" })`, `getByRole("menuitem", ...)` in the search palette), placeholders (`Search` on the list, `Search Challenges...` in the palette), file tabs by exact text (`getByText("styles.css", { exact: true })`), the preview `iframe[title="Sandpack Preview"]`, and `data-completed="true"` on a completed list row.

## Evidence

Every run writes `.verify-artifacts/<journey>/<UTC timestamp>/` at the repo root (git-ignored):

- `NN-<step>.png` and `NN-<step>.aria.txt` for each recorded step, so the action and the resulting state are both captured.
- `console-errors.txt` with browser console errors and page errors.
- `result.json` with `ok`, the steps, their URLs and notes, and the error on failure, plus `failure.png` when it failed.

Proof standards:

- Drive the real user path: click the button, type in the editor, use the search box. Never call app functions or write `localStorage` to fake a state.
- Check side effects next to what is visible. The journeys assert the `localStorage` value a feature writes (`fc-completions`, `fc:/challenges/<path>-<template>`, `fc:/playground-<template>`) and reload to show it persists.
- Sandpack compiles in a remote bundler (`*.codesandbox.io`). That is the production boundary for code execution, so a preview proof needs network access to it. A blocked request to `col.csbops.io` is Sandpack telemetry and is harmless.
- `console-errors.txt` is never empty today: the challenge page logs a React hydration warning about a `<button>` nested in a `<button>` (breadcrumb dropdown) and the telemetry CORS error. Compare against a run on `main` before blaming a change for them.

## Cleanup

```bash
bash .claude/skills/verify/scripts/stop.sh
```

Kills the process group that `launch.sh` started on `VERIFY_PORT` and removes `/tmp/fc-verify-<port>/`. It never kills by process name and never touches `.verify-artifacts/`, so the proof survives. Browser contexts close when each journey ends.

## Typical run

```bash
bash .claude/skills/verify/scripts/launch.sh
bash .claude/skills/verify/scripts/doctor.sh
node .claude/skills/verify/scripts/journey.cjs challenge-editor
bash .claude/skills/verify/scripts/stop.sh
ls .verify-artifacts/challenge-editor/
```

Keep the map honest with `/maintain-verification-skill` when routes or UI change.
