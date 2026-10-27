# Frontend Challenges verification map

This directory is the maintained source for verifying the user-facing behavior of the Frontend Challenges site (`apps/www`). Read this index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- The app was started by `bash .claude/skills/verify/scripts/launch.sh` and `doctor.sh` exits 0.
- Every journey runs in a fresh browser context, so `localStorage` is empty: no completed challenges, no saved code.
- Challenge content comes from `challenges/` in this checkout. The recipes rely on `1-rtl-icon` ("Icon and RTL") and `455-curry-with-placeholder` ("Curry with Placeholder").
- The Sandpack bundler at `*.codesandbox.io` is reachable. Without it the preview never renders.
- Never drive an instance this run did not start.

## Driving conventions

- Run a feature with `node .claude/skills/verify/scripts/journey.cjs <journey>`. Each feature file names its journey.
- Prefer ARIA roles, accessible names and placeholders over CSS selectors or DOM position.
- Wait for an observable state (a heading, a preview value, a URL), never a fixed sleep.
- The journeys undo what they change where it matters (`mark-complete` un-marks). Saved code stays in that run's browser context, which closes with the run.

## Proof and skip reporting

- A proof has the user action and the resulting state: one `step` before and one after each action.
- A stored-state claim is backed by the `localStorage` value and a reload that shows it again.
- Report a failed journey with its `result.json` error and `failure.png`. Do not report a skipped entry point as verified through a different one.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior, then exactly four H2 sections in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with Playwright`, `Gotchas`.

## Features

- [Challenge editor](./challenge-editor.md) covers editing a challenge's files, the live preview, and saved code surviving a reload.
- [Mark complete](./mark-complete.md) covers marking and un-marking a challenge and the solved state on the list.
- [Challenge filters](./challenge-filters.md) covers the list's text search and type filter.
- [Spotlight search](./spotlight-search.md) covers the header search palette, its keyboard shortcut and its empty state.
- [Playground](./playground.md) covers free-form code with a live preview that persists.
