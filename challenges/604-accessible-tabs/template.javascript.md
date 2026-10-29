```js index.js 
/**
 * Turns the tabs markup inside `root` into an accessible tabs widget.
 * @param {HTMLElement} root
 * @returns {() => void} a function that removes every listener added
 */
export function createTabs(root) {
  // TODO: Implement me
}
```

```js index.test.js 
import { createTabs } from "./index";

describe("createTabs", () => {
  let root;
  let cleanup;

  const tab = (key) => root.querySelector(`[data-tab="${key}"]`);
  const panel = (key) => root.querySelector(`[data-panel="${key}"]`);
  const press = (el, key) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
    el.dispatchEvent(event);
    return event;
  };

  beforeEach(() => {
    root = document.createElement("div");
    root.innerHTML = `
      <div data-tablist aria-label="Fruits">
        <button data-tab="apple">Apple</button>
        <button data-tab="mango">Mango</button>
        <button data-tab="kiwi" disabled>Kiwi</button>
        <button data-tab="plum">Plum</button>
      </div>
      <div data-panel="apple">Apples are crunchy.</div>
      <div data-panel="mango">Mangoes are sweet.</div>
      <div data-panel="kiwi">Kiwis are fuzzy.</div>
      <div data-panel="plum">Plums are juicy.</div>
    `;
    document.body.appendChild(root);
  });

  afterEach(() => {
    if (typeof cleanup === "function") cleanup();
    cleanup = undefined;
    root.remove();
  });

  test("adds the tablist, tab and tabpanel roles", () => {
    cleanup = createTabs(root);

    expect(root.querySelector("[data-tablist]").getAttribute("role")).toBe("tablist");
    root.querySelectorAll("[data-tab]").forEach((el) => {
      expect(el.getAttribute("role")).toBe("tab");
    });
    root.querySelectorAll("[data-panel]").forEach((el) => {
      expect(el.getAttribute("role")).toBe("tabpanel");
      expect(el.getAttribute("tabindex")).toBe("0");
    });
  });

  test("links every tab to its panel in both directions", () => {
    cleanup = createTabs(root);

    ["apple", "mango", "kiwi", "plum"].forEach((key) => {
      expect(tab(key).id).toBe(`${key}-tab`);
      expect(panel(key).id).toBe(`${key}-panel`);
      expect(tab(key).getAttribute("aria-controls")).toBe(`${key}-panel`);
      expect(panel(key).getAttribute("aria-labelledby")).toBe(`${key}-tab`);
    });
  });

  test("keeps ids that already exist", () => {
    tab("mango").id = "custom-tab";
    panel("mango").id = "custom-panel";
    cleanup = createTabs(root);

    expect(tab("mango").getAttribute("aria-controls")).toBe("custom-panel");
    expect(panel("mango").getAttribute("aria-labelledby")).toBe("custom-tab");
  });

  test("selects the first tab by default", () => {
    cleanup = createTabs(root);

    expect(tab("apple").getAttribute("aria-selected")).toBe("true");
    expect(tab("apple").getAttribute("tabindex")).toBe("0");
    ["mango", "kiwi", "plum"].forEach((key) => {
      expect(tab(key).getAttribute("aria-selected")).toBe("false");
      expect(tab(key).getAttribute("tabindex")).toBe("-1");
      expect(panel(key).hidden).toBe(true);
    });
    expect(panel("apple").hidden).toBe(false);
  });

  test("respects a tab marked aria-selected in the markup", () => {
    tab("plum").setAttribute("aria-selected", "true");
    cleanup = createTabs(root);

    expect(tab("plum").getAttribute("aria-selected")).toBe("true");
    expect(tab("apple").getAttribute("aria-selected")).toBe("false");
    expect(panel("plum").hidden).toBe(false);
    expect(panel("apple").hidden).toBe(true);
  });

  test("selects a tab when it is clicked", () => {
    cleanup = createTabs(root);
    tab("mango").click();

    expect(tab("mango").getAttribute("aria-selected")).toBe("true");
    expect(tab("mango").getAttribute("tabindex")).toBe("0");
    expect(tab("apple").getAttribute("aria-selected")).toBe("false");
    expect(tab("apple").getAttribute("tabindex")).toBe("-1");
    expect(panel("mango").hidden).toBe(false);
    expect(panel("apple").hidden).toBe(true);
  });

  test("ArrowRight moves focus and selection to the next tab", () => {
    cleanup = createTabs(root);
    tab("apple").focus();
    const event = press(tab("apple"), "ArrowRight");

    expect(document.activeElement).toBe(tab("mango"));
    expect(tab("mango").getAttribute("aria-selected")).toBe("true");
    expect(panel("mango").hidden).toBe(false);
    expect(event.defaultPrevented).toBe(true);
  });

  test("arrow keys skip disabled tabs", () => {
    cleanup = createTabs(root);
    tab("mango").click();
    press(tab("mango"), "ArrowRight");

    expect(document.activeElement).toBe(tab("plum"));
    expect(tab("kiwi").getAttribute("aria-selected")).toBe("false");

    press(tab("plum"), "ArrowLeft");
    expect(document.activeElement).toBe(tab("mango"));
  });

  test("arrow keys wrap around at both ends", () => {
    cleanup = createTabs(root);
    press(tab("apple"), "ArrowLeft");
    expect(document.activeElement).toBe(tab("plum"));
    expect(tab("plum").getAttribute("aria-selected")).toBe("true");

    press(tab("plum"), "ArrowRight");
    expect(document.activeElement).toBe(tab("apple"));
    expect(tab("apple").getAttribute("aria-selected")).toBe("true");
  });

  test("Home and End jump to the first and last enabled tab", () => {
    tab("plum").disabled = true;
    cleanup = createTabs(root);

    press(tab("apple"), "End");
    expect(document.activeElement).toBe(tab("mango"));

    press(tab("mango"), "Home");
    expect(document.activeElement).toBe(tab("apple"));
  });

  test("ignores other keys", () => {
    cleanup = createTabs(root);
    tab("apple").focus();
    const event = press(tab("apple"), "a");

    expect(document.activeElement).toBe(tab("apple"));
    expect(tab("apple").getAttribute("aria-selected")).toBe("true");
    expect(event.defaultPrevented).toBe(false);
  });

  test("the returned function removes the listeners", () => {
    const destroy = createTabs(root);
    destroy();
    tab("mango").click();
    press(tab("apple"), "End");

    expect(tab("apple").getAttribute("aria-selected")).toBe("true");
    expect(tab("mango").getAttribute("aria-selected")).toBe("false");
    expect(tab("plum").getAttribute("aria-selected")).toBe("false");
  });
});
```


