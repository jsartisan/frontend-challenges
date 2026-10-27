# Spotlight search

The header `Search...` button opens a command palette that lists site links and every challenge. Typing filters it, choosing a challenge opens that challenge, and a query with no match shows `No results found.`

## Sub-features

- `spotlight-open-button` opens the palette from the header button.
- `spotlight-open-keyboard` opens it with Ctrl+K or Cmd+K.
- `spotlight-pick` opens the chosen challenge.
- `spotlight-empty` shows the empty state.

## How to get to it (user POV)

- Choose `Search... ⌘ K` in the header on any page.
- Press Ctrl+K (Cmd+K on macOS).

## Driving it with Playwright

Preconditions:

- Baseline state from the index. Journey: `spotlight-search`.

- **Button.** On `/`, choose the `Search` button. The dialog with placeholder `Search Challenges...` opens. Step `search-open-button`.
- **Filter.** Type `Curry with Placeholder`. A `menuitem` named `Curry with Placeholder ...` shows. Step `search-results`.
- **Pick.** Press Enter. The URL becomes `/challenges/455-curry-with-placeholder` and its heading shows. Step `landed-on-challenge`.
- **Keyboard and empty.** On `/`, press `ControlOrMeta+k` until the dialog shows, type `zzzz-no-such-challenge`. `No results found.` shows. Step `search-open-keyboard-empty`.

## Gotchas

- Use lowercase `k`. The app checks `e.key === "k"`, and Playwright's `+K` sends `K`, so the shortcut silently does nothing.
- The shortcut listener attaches after hydration, which can trail the page's load event in dev. Retry the keypress while the dialog is closed. It toggles, so never press again once it is open.
- Items are `menuitem`s, not `option`s, and their names include the difficulty (`Curry with Placeholder medium`).
