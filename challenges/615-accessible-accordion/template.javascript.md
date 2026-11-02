```js index.js 
/**
 * Turns the accordion markup inside `root` into an accessible accordion.
 * @param {HTMLElement} root
 * @param {{ multiple?: boolean }} [options]
 * @returns {() => void} a function that removes every listener added
 */
export function createAccordion(root, { multiple = false } = {}) {
  // TODO: Implement me
}
```

```js index.test.js 
import { createAccordion } from "./index";

describe("createAccordion", () => {
  let root;
  let cleanup;

  const trigger = (key) => root.querySelector(`[data-trigger="${key}"]`);
  const content = (key) => root.querySelector(`[data-content="${key}"]`);
  const isOpen = (key) => trigger(key).getAttribute("aria-expanded") === "true";
  const press = (el, key) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
    el.dispatchEvent(event);
    return event;
  };

  beforeEach(() => {
    root = document.createElement("div");
    root.innerHTML = `
      <h3><button data-trigger="rent">Can I rent a bike for a day?</button></h3>
      <div data-content="rent">Yes, daily and weekly plans are available.</div>
      <h3><button data-trigger="helmet">Is a helmet included?</button></h3>
      <div data-content="helmet">Every rental comes with a helmet and a lock.</div>
      <h3><button data-trigger="tandem" disabled>Do you have tandem bikes?</button></h3>
      <div data-content="tandem">Not this season.</div>
      <h3><button data-trigger="rain">What if it rains?</button></h3>
      <div data-content="rain">Free cancellation up to an hour before pickup.</div>
    `;
    document.body.appendChild(root);
  });

  afterEach(() => {
    if (typeof cleanup === "function") cleanup();
    cleanup = undefined;
    root.remove();
  });

  test("links every trigger to its content in both directions", () => {
    cleanup = createAccordion(root);

    ["rent", "helmet", "tandem", "rain"].forEach((key) => {
      expect(trigger(key).id).toBe(`${key}-trigger`);
      expect(content(key).id).toBe(`${key}-content`);
      expect(trigger(key).getAttribute("aria-controls")).toBe(`${key}-content`);
      expect(content(key).getAttribute("role")).toBe("region");
      expect(content(key).getAttribute("aria-labelledby")).toBe(`${key}-trigger`);
    });
  });

  test("keeps ids that already exist", () => {
    trigger("helmet").id = "q2";
    content("helmet").id = "a2";
    cleanup = createAccordion(root);

    expect(trigger("helmet").getAttribute("aria-controls")).toBe("a2");
    expect(content("helmet").getAttribute("aria-labelledby")).toBe("q2");
  });

  test("starts with every section collapsed", () => {
    cleanup = createAccordion(root);

    ["rent", "helmet", "tandem", "rain"].forEach((key) => {
      expect(trigger(key).getAttribute("aria-expanded")).toBe("false");
      expect(content(key).hidden).toBe(true);
    });
  });

  test("respects a section marked aria-expanded in the markup", () => {
    trigger("helmet").setAttribute("aria-expanded", "true");
    cleanup = createAccordion(root);

    expect(isOpen("helmet")).toBe(true);
    expect(content("helmet").hidden).toBe(false);
    expect(isOpen("rent")).toBe(false);
  });

  test("only keeps the first pre-expanded section open in single mode", () => {
    trigger("helmet").setAttribute("aria-expanded", "true");
    trigger("rain").setAttribute("aria-expanded", "true");
    cleanup = createAccordion(root);

    expect(isOpen("helmet")).toBe(true);
    expect(isOpen("rain")).toBe(false);
    expect(content("rain").hidden).toBe(true);
  });

  test("clicking a trigger expands and collapses its section", () => {
    cleanup = createAccordion(root);

    trigger("rent").click();
    expect(isOpen("rent")).toBe(true);
    expect(content("rent").hidden).toBe(false);

    trigger("rent").click();
    expect(isOpen("rent")).toBe(false);
    expect(content("rent").hidden).toBe(true);
  });

  test("opening a section closes the others by default", () => {
    cleanup = createAccordion(root);

    trigger("rent").click();
    trigger("rain").click();

    expect(isOpen("rain")).toBe(true);
    expect(isOpen("rent")).toBe(false);
    expect(content("rent").hidden).toBe(true);
  });

  test("multiple: true lets several sections stay open", () => {
    trigger("helmet").setAttribute("aria-expanded", "true");
    trigger("rain").setAttribute("aria-expanded", "true");
    cleanup = createAccordion(root, { multiple: true });

    expect(isOpen("helmet")).toBe(true);
    expect(isOpen("rain")).toBe(true);

    trigger("rent").click();
    expect(isOpen("rent")).toBe(true);
    expect(isOpen("helmet")).toBe(true);
    expect(isOpen("rain")).toBe(true);
  });

  test("clicks inside a section's content do nothing", () => {
    cleanup = createAccordion(root);
    trigger("rent").click();
    content("rent").click();

    expect(isOpen("rent")).toBe(true);
  });

  test("ArrowDown and ArrowUp move focus without toggling", () => {
    cleanup = createAccordion(root);
    trigger("rent").focus();
    const event = press(trigger("rent"), "ArrowDown");

    expect(document.activeElement).toBe(trigger("helmet"));
    expect(isOpen("helmet")).toBe(false);
    expect(event.defaultPrevented).toBe(true);

    press(trigger("helmet"), "ArrowUp");
    expect(document.activeElement).toBe(trigger("rent"));
  });

  test("arrow keys skip disabled triggers and wrap around", () => {
    cleanup = createAccordion(root);

    press(trigger("helmet"), "ArrowDown");
    expect(document.activeElement).toBe(trigger("rain"));

    press(trigger("rain"), "ArrowDown");
    expect(document.activeElement).toBe(trigger("rent"));

    press(trigger("rent"), "ArrowUp");
    expect(document.activeElement).toBe(trigger("rain"));

    press(trigger("rain"), "ArrowUp");
    expect(document.activeElement).toBe(trigger("helmet"));
  });

  test("Home and End jump to the first and last enabled trigger", () => {
    trigger("rain").disabled = true;
    cleanup = createAccordion(root);

    press(trigger("rent"), "End");
    expect(document.activeElement).toBe(trigger("helmet"));

    press(trigger("helmet"), "Home");
    expect(document.activeElement).toBe(trigger("rent"));
  });

  test("ignores other keys", () => {
    cleanup = createAccordion(root);
    trigger("rent").focus();
    const event = press(trigger("rent"), "ArrowRight");

    expect(document.activeElement).toBe(trigger("rent"));
    expect(event.defaultPrevented).toBe(false);
  });

  test("the returned function removes the listeners", () => {
    const destroy = createAccordion(root);
    destroy();
    trigger("rent").click();
    trigger("rent").focus();
    press(trigger("rent"), "ArrowDown");

    expect(isOpen("rent")).toBe(false);
    expect(document.activeElement).toBe(trigger("rent"));
  });
});
```


