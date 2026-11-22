"Are you sure?" prompts, sign-in forms and image previews often open in a modal dialog that sits on top of the page. Showing a `div` with a dark overlay is the easy part. Screen reader users also need to hear that a dialog opened and what it is called. Keyboard users need focus to move into it, stay inside it while it is open, and go back where it came from when it closes. The [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) describes the full behaviour.

Write a function `createDialog(dialog, options)` that turns markup like this into an accessible modal dialog:

```html
<button id="rename-trigger">Rename file</button>

<div id="rename" data-dialog>
  <h2 data-dialog-title>Rename "notes.txt"</h2>
  <p data-dialog-description>Pick a new name for this file.</p>
  <button data-dialog-close aria-label="Close">×</button>
  <input aria-label="File name" />
  <button data-dialog-close>Cancel</button>
  <button>Save</button>
</div>
```

It returns an object with `open()`, `close()` and `destroy()` methods.

**Roles and relationships**

- The dialog gets `role="dialog"`, unless it already has `role="alertdialog"`, which you keep.
- It also gets `aria-modal="true"` and `tabindex="-1"`, so script can focus it.
- `aria-labelledby` points at the `[data-dialog-title]` element. `aria-describedby` points at `[data-dialog-description]`, but only if one exists.
- If the title or description has no id, give it `<dialog id>-title` or `<dialog id>-description`. Keep ids that already exist.
- The dialog starts closed, which means it has the `hidden` attribute.

**Focusable elements**

An element inside the dialog counts as focusable when it matches `a[href], button, input, select, textarea, [tabindex]` and is not `disabled`, does not have `tabindex="-1"`, and is not inside an element with the `hidden` attribute.

**Opening**

- `open()` remembers which element had focus, removes `hidden` and moves focus into the dialog. Focus goes to the first focusable element with an `autofocus` attribute, otherwise the first focusable element, otherwise the dialog itself.
- Every child of `document.body` that does not contain the dialog gets the `inert` attribute, so the rest of the page can't be clicked or read. Leave elements that were already inert alone.
- Calling `open()` while the dialog is already open does nothing.

**While open**

- <kbd>Tab</kbd> on the last focusable element moves focus to the first one. <kbd>Shift</kbd>+<kbd>Tab</kbd> on the first one moves it to the last one. Call `preventDefault()` in both cases.
- When the dialog element itself has focus, <kbd>Tab</kbd> goes to the first focusable element and <kbd>Shift</kbd>+<kbd>Tab</kbd> to the last one. If there are no focusable elements, <kbd>Tab</kbd> is prevented and focus stays on the dialog.
- Any other <kbd>Tab</kbd> press is left to the browser, so don't prevent it.
- If focus still ends up outside the dialog (a `focusin` event whose target is outside it), move it back to where `open()` would put it.

**Closing**

- <kbd>Escape</kbd> closes the dialog and calls `preventDefault()`.
- Clicking any `[data-dialog-close]` element inside the dialog closes it. Other buttons do not.
- `close()` closes it from code.
- Closing adds `hidden` back, removes the `inert` attributes that `open()` added, and moves focus back to the element that had focus before `open()`, if it is still on the page. After that, it calls `options.onClose(reason)` with `"escape"`, `"close-button"` or `"api"`.
- Closing a dialog that is already closed does nothing, and `onClose` is not called.

**Cleaning up**

`destroy()` closes the dialog if it is open, without calling `onClose`, and removes every listener the dialog added. After that, `open()` does nothing.

```js
const trigger = document.getElementById("rename-trigger");
const dialog = createDialog(document.getElementById("rename"), {
  onClose: (reason) => console.log("closed by", reason),
});

trigger.addEventListener("click", () => dialog.open());

// Click "Rename file": the dialog appears and focus moves to "×".
// Press Shift+Tab: focus wraps around to "Save".
// Press Tab: focus wraps back to "×".
// Press Escape: logs "closed by escape" and focus is back on "Rename file".
```
