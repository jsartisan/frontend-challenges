# Challenge editor

A challenge page shows the description on the left and an editor with file tabs, a live preview and a console on the right. Edits re-run the preview and are saved in the browser, so reopening the challenge shows the user's code.

## Sub-features

- `editor-load` renders the description, the starter files and the preview.
- `editor-edit-preview` re-renders the preview after a file edit.
- `editor-persist` keeps the edit after a reload.

## How to get to it (user POV)

- Choose a challenge on `/challenges`.
- Pick a challenge in the header search palette.
- Open `/challenges/<number>-<slug>` directly, e.g. `/challenges/1-rtl-icon`.

## Driving it with Playwright

Preconditions:

- Baseline state from the index. Journey: `challenge-editor`.

- **Load.** Open `/challenges/1-rtl-icon`. The heading `#1 Icon and RTL` shows and the preview body contains `Home`. Step `challenge-loaded`.
- **Edit.** Choose the `styles.css` tab and replace its content with `body { background: rgb(255, 0, 0); }` using `replaceEditorText`. The preview body's computed background becomes `rgb(255, 0, 0)`. Step `preview-updated`.
- **Stored.** `localStorage["fc:/challenges/1-rtl-icon-vanilla"]` contains the new CSS.
- **Persist.** Reload, choose `styles.css`. The editor shows `background` and the preview is still red. Step `edit-persisted`.

## Gotchas

- Clicking Monaco's `Editor content` textbox times out: its rendered lines cover it. Click `.monaco-editor .view-lines`.
- Typing into Monaco auto-closes brackets and quotes. `replaceEditorText` uses `insertText` to avoid that.
- The preview updates a moment after the edit. Poll it with `waitForPreview`.
- The saved-code key includes the template (`-vanilla`, `-react`). Switching template with the HTML/React toggle reads a different key.
