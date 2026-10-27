# Playground

`/play` is a free-form editor with a template picker (vanilla, React and others), a file list, a live preview and a console. The code is saved in the browser per template, and `Share` produces a link that carries the code.

## Sub-features

- `play-load` renders the default template and its preview.
- `play-edit` re-runs the preview after an edit.
- `play-persist` keeps the code after a reload.
- `play-template` switches templates (not yet in the journey).
- `play-share` builds a share link with the code in `?code=` (not yet in the journey).

## How to get to it (user POV)

- Choose `Playground` in the header, or open `/play`.
- Open a shared link `/play?code=...&template=...`.

## Driving it with Playwright

Preconditions:

- Baseline state from the index (no saved playground). Journey: `playground`.

- **Load.** Open `/play`. The preview shows `Hello World` from the vanilla template. Step `playground-loaded`.
- **Edit.** Choose `index.js` and replace it with `import "./styles.css";` plus `document.body.innerHTML = "<h1>Hello from verify</h1>";`. The preview shows `Hello from verify`. Step `preview-shows-edit`.
- **Persist.** `localStorage["fc:/playground-vanilla"]` exists. Reload; the preview still shows `Hello from verify`. Step `edit-persisted`.

## Gotchas

- Wait for the first compile (`Hello World` in the preview) before editing. An edit made earlier is not applied to the preview.
- `index.html` and `index.js` edits both re-run the vanilla preview once the first compile has landed.
