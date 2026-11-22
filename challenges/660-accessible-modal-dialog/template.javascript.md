```js index.js 
/**
 * Turns the `[data-dialog]` element into an accessible modal dialog.
 * @param {HTMLElement} dialog
 * @param {{ onClose?: (reason: "escape" | "close-button" | "api") => void }} [options]
 * @returns {{ open: () => void, close: () => void, destroy: () => void }}
 */
export function createDialog(dialog, { onClose } = {}) {
  // TODO: Implement me
}
```

```js index.test.js 
import { createDialog } from "./index";

describe("createDialog", () => {
  let dialog;
  let closed;
  let instance;

  const $ = (selector) => document.querySelector(selector);
  const byText = (text) =>
    Array.from(document.querySelectorAll("button, a, input")).find(
      (el) => el.textContent.trim() === text || el.getAttribute("aria-label") === text,
    );
  const press = (el, key, init = {}) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init });
    el.dispatchEvent(event);
    return event;
  };
  const setup = () => {
    instance = createDialog(dialog, { onClose: (reason) => closed.push(reason) });
    return instance;
  };

  beforeEach(() => {
    closed = [];
    document.body.innerHTML = `
      <header><a href="/">Home</a></header>
      <main>
        <button id="trigger">Rename file</button>
      </main>
      <aside inert>Ads</aside>
      <div id="rename" data-dialog>
        <h2 data-dialog-title>Rename "notes.txt"</h2>
        <p data-dialog-description>Pick a new name for this file.</p>
        <button data-dialog-close aria-label="Close">×</button>
        <input aria-label="File name" />
        <button disabled>Advanced</button>
        <button data-dialog-close>Cancel</button>
        <button>Save</button>
        <button tabindex="-1">Skipped</button>
        <div hidden><button>Hidden option</button></div>
      </div>
    `;
    dialog = $("#rename");
  });

  afterEach(() => {
    if (instance) instance.destroy();
    instance = undefined;
    document.body.innerHTML = "";
  });

  test("sets up roles and relationships, and starts hidden", () => {
    setup();

    expect(dialog.getAttribute("role")).toBe("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("tabindex")).toBe("-1");
    expect($("[data-dialog-title]").id).toBe("rename-title");
    expect($("[data-dialog-description]").id).toBe("rename-description");
    expect(dialog.getAttribute("aria-labelledby")).toBe("rename-title");
    expect(dialog.getAttribute("aria-describedby")).toBe("rename-description");
    expect(dialog.hidden).toBe(true);
  });

  test("keeps existing ids and an alertdialog role", () => {
    dialog.setAttribute("role", "alertdialog");
    $("[data-dialog-title]").id = "heading";
    $("[data-dialog-description]").remove();
    setup();

    expect(dialog.getAttribute("role")).toBe("alertdialog");
    expect(dialog.getAttribute("aria-labelledby")).toBe("heading");
    expect(dialog.hasAttribute("aria-describedby")).toBe(false);
  });

  test("open() shows the dialog and focuses the first focusable element", () => {
    setup();
    $("#trigger").focus();
    instance.open();

    expect(dialog.hidden).toBe(false);
    expect(document.activeElement).toBe(byText("Close"));
  });

  test("an [autofocus] element wins over the first focusable one", () => {
    byText("File name").setAttribute("autofocus", "");
    setup();
    instance.open();

    expect(document.activeElement).toBe(byText("File name"));
  });

  test("a dialog with nothing focusable focuses itself", () => {
    dialog.innerHTML = `<h2 data-dialog-title>Saving…</h2>`;
    setup();
    instance.open();

    expect(document.activeElement).toBe(dialog);
    const event = press(dialog, "Tab");
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(dialog);
  });

  test("open() makes the rest of the page inert and close() restores it", () => {
    setup();
    instance.open();

    expect($("header").hasAttribute("inert")).toBe(true);
    expect($("main").hasAttribute("inert")).toBe(true);
    expect(dialog.hasAttribute("inert")).toBe(false);

    instance.close();
    expect($("header").hasAttribute("inert")).toBe(false);
    expect($("main").hasAttribute("inert")).toBe(false);
    expect($("aside").hasAttribute("inert")).toBe(true);
  });

  test("does not make an ancestor of the dialog inert", () => {
    const wrapper = document.createElement("section");
    document.body.appendChild(wrapper);
    wrapper.appendChild(dialog);
    setup();
    instance.open();

    expect(wrapper.hasAttribute("inert")).toBe(false);
    expect($("main").hasAttribute("inert")).toBe(true);
  });

  test("Tab on the last element wraps to the first", () => {
    setup();
    instance.open();
    byText("Save").focus();
    const event = press(byText("Save"), "Tab");

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(byText("Close"));
  });

  test("Shift+Tab on the first element wraps to the last, skipping unfocusable ones", () => {
    setup();
    instance.open();
    const event = press(byText("Close"), "Tab", { shiftKey: true });

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(byText("Save"));
  });

  test("Tab in the middle is left to the browser", () => {
    setup();
    instance.open();
    byText("File name").focus();
    const event = press(byText("File name"), "Tab");
    const back = press(byText("File name"), "Tab", { shiftKey: true });

    expect(event.defaultPrevented).toBe(false);
    expect(back.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(byText("File name"));
  });

  test("Tab from the dialog element itself goes to the first or last element", () => {
    setup();
    instance.open();
    dialog.focus();
    press(dialog, "Tab");
    expect(document.activeElement).toBe(byText("Close"));

    dialog.focus();
    press(dialog, "Tab", { shiftKey: true });
    expect(document.activeElement).toBe(byText("Save"));
  });

  test("focus that escapes the dialog is pulled back in", () => {
    setup();
    instance.open();
    $("#trigger").focus();

    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  test("Escape closes the dialog and returns focus to the opener", () => {
    setup();
    $("#trigger").focus();
    instance.open();
    const event = press(byText("File name"), "Escape");

    expect(event.defaultPrevented).toBe(true);
    expect(dialog.hidden).toBe(true);
    expect(document.activeElement).toBe($("#trigger"));
    expect(closed).toEqual(["escape"]);
  });

  test("every [data-dialog-close] button closes the dialog", () => {
    setup();
    $("#trigger").focus();
    instance.open();
    byText("Cancel").click();

    expect(dialog.hidden).toBe(true);
    expect(document.activeElement).toBe($("#trigger"));

    instance.open();
    byText("Close").click();
    expect(closed).toEqual(["close-button", "close-button"]);
  });

  test("other buttons do not close the dialog", () => {
    setup();
    instance.open();
    byText("Save").click();

    expect(dialog.hidden).toBe(false);
    expect(closed).toEqual([]);
  });

  test("close() reports 'api' and only fires once", () => {
    setup();
    instance.open();
    instance.close();
    instance.close();

    expect(closed).toEqual(["api"]);
  });

  test("open() while open keeps the original opener", () => {
    setup();
    $("#trigger").focus();
    instance.open();
    instance.open();
    instance.close();

    expect(document.activeElement).toBe($("#trigger"));
  });

  test("does not try to focus an opener that left the page", () => {
    setup();
    $("#trigger").focus();
    instance.open();
    $("#trigger").remove();

    expect(() => instance.close()).not.toThrow();
    expect(dialog.hidden).toBe(true);
  });

  test("destroy() closes without onClose and removes the listeners", () => {
    setup();
    $("#trigger").focus();
    instance.open();
    instance.destroy();

    expect(dialog.hidden).toBe(true);
    expect($("main").hasAttribute("inert")).toBe(false);
    expect(document.activeElement).toBe($("#trigger"));
    expect(closed).toEqual([]);

    instance.open();
    expect(dialog.hidden).toBe(true);
    byText("Cancel").click();
    press(dialog, "Escape");
    expect(closed).toEqual([]);
    instance = undefined;
  });
});
```


