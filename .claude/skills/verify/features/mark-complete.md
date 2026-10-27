# Mark complete

A user marks a challenge as solved from its page. The button changes to `Completed`, the challenge list shows a green check on that row, and the solved counter on `/challenges` goes up. Pressing `Completed` undoes it.

## Sub-features

- `complete-mark` marks the current challenge solved.
- `complete-list` shows the solved state on the challenge list row.
- `complete-unmark` undoes it.

## How to get to it (user POV)

- Choose `Mark as complete` in the toolbar of a challenge page (hidden below the `md` breakpoint).
- Choose the check icon on a challenge's row on `/challenges`.

## Driving it with Playwright

Preconditions:

- Baseline state from the index (nothing completed). Journey: `mark-complete`.

- **Before.** Open `/challenges/1-rtl-icon`. The button `Mark as complete` shows. Step `not-completed`.
- **Mark.** Choose `Mark as complete`. The button becomes `Completed` and `localStorage["fc-completions"]` contains `1`. Step `completed`.
- **List.** Open `/challenges` and type `Icon and RTL` into `Search`. The row holding the link `Icon and RTL` has `data-completed="true"`, and the counter reads `1 / <total>`. Step `list-shows-completed`.
- **Undo.** Back on the challenge, choose `Completed`. The button reads `Mark as complete` and `fc-completions` no longer contains `1`. Step `uncompleted`.

## Gotchas

- Completion is per browser (`localStorage`), not per account. A new context starts at zero.
- At a narrow viewport the toolbar button is hidden. Keep the default 1400 px width or use the list row's check icon.
- The list row's check icon is not covered by the journey yet.
