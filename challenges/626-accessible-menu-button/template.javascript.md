```js index.js 
/**
 * Turns the menu button markup inside `root` into an accessible menu button.
 * @param {HTMLElement} root
 * @param {{ onSelect?: (item: HTMLElement) => void }} [options]
 * @returns {() => void} a function that removes every listener added
 */
export function createMenuButton(root, { onSelect } = {}) {
  // TODO: Implement me
}
```

```js index.test.js 
import { createMenuButton } from "./index";

describe("createMenuButton", () => {
  let root;
  let cleanup;
  let selected;

  const button = () => root.querySelector("[data-menu-button]");
  const menu = () => root.querySelector("[data-menu]");
  const item = (text) =>
    Array.from(root.querySelectorAll("[data-menu-item]")).find(
      (el) => el.textContent.trim() === text,
    );
  const isOpen = () => button().getAttribute("aria-expanded") === "true";
  const press = (el, key) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
    el.dispatchEvent(event);
    return event;
  };
  const setup = () => {
    cleanup = createMenuButton(root, { onSelect: (el) => selected.push(el.textContent.trim()) });
  };

  beforeEach(() => {
    selected = [];
    root = document.createElement("div");
    root.id = "sort";
    root.innerHTML = `
      <button data-menu-button>Sort by</button>
      <ul data-menu>
        <li data-menu-item>Newest</li>
        <li data-menu-item>Oldest</li>
        <li data-menu-item aria-disabled="true">Most popular</li>
        <li data-menu-item>Price: low to high</li>
        <li data-menu-item>Price: high to low</li>
      </ul>
    `;
    document.body.appendChild(root);
  });

  afterEach(() => {
    if (typeof cleanup === "function") cleanup();
    cleanup = undefined;
    root.remove();
  });

  test("sets up roles, ids and relationships", () => {
    setup();

    expect(button().id).toBe("sort-button");
    expect(menu().id).toBe("sort-menu");
    expect(button().getAttribute("aria-haspopup")).toBe("menu");
    expect(button().getAttribute("aria-controls")).toBe("sort-menu");
    expect(menu().getAttribute("role")).toBe("menu");
    expect(menu().getAttribute("aria-labelledby")).toBe("sort-button");
    root.querySelectorAll("[data-menu-item]").forEach((el) => {
      expect(el.getAttribute("role")).toBe("menuitem");
      expect(el.getAttribute("tabindex")).toBe("-1");
    });
  });

  test("keeps ids that already exist", () => {
    button().id = "sort-trigger";
    menu().id = "sort-options";
    setup();

    expect(button().getAttribute("aria-controls")).toBe("sort-options");
    expect(menu().getAttribute("aria-labelledby")).toBe("sort-trigger");
  });

  test("starts closed", () => {
    setup();

    expect(button().getAttribute("aria-expanded")).toBe("false");
    expect(menu().hidden).toBe(true);
  });

  test("clicking the button opens the menu and focuses the first item", () => {
    setup();
    button().click();

    expect(isOpen()).toBe(true);
    expect(menu().hidden).toBe(false);
    expect(document.activeElement).toBe(item("Newest"));
  });

  test("clicking the button again closes the menu", () => {
    setup();
    button().click();
    button().click();

    expect(isOpen()).toBe(false);
    expect(menu().hidden).toBe(true);
    expect(document.activeElement).toBe(button());
  });

  test("ArrowDown on the button opens the menu on the first item", () => {
    setup();
    button().focus();
    const event = press(button(), "ArrowDown");

    expect(isOpen()).toBe(true);
    expect(document.activeElement).toBe(item("Newest"));
    expect(event.defaultPrevented).toBe(true);
  });

  test("ArrowUp on the button opens the menu on the last item", () => {
    setup();
    button().focus();
    const event = press(button(), "ArrowUp");

    expect(isOpen()).toBe(true);
    expect(document.activeElement).toBe(item("Price: high to low"));
    expect(event.defaultPrevented).toBe(true);
  });

  test("arrow keys move through items, skip disabled ones and wrap", () => {
    setup();
    button().click();

    press(item("Newest"), "ArrowDown");
    expect(document.activeElement).toBe(item("Oldest"));

    const event = press(item("Oldest"), "ArrowDown");
    expect(document.activeElement).toBe(item("Price: low to high"));
    expect(event.defaultPrevented).toBe(true);

    press(item("Price: low to high"), "ArrowDown");
    press(item("Price: high to low"), "ArrowDown");
    expect(document.activeElement).toBe(item("Newest"));

    press(item("Newest"), "ArrowUp");
    expect(document.activeElement).toBe(item("Price: high to low"));
  });

  test("Home and End jump to the first and last enabled item", () => {
    item("Price: high to low").setAttribute("aria-disabled", "true");
    setup();
    button().click();

    press(item("Newest"), "End");
    expect(document.activeElement).toBe(item("Price: low to high"));

    press(item("Price: low to high"), "Home");
    expect(document.activeElement).toBe(item("Newest"));
  });

  test("typing a character focuses the next item that starts with it", () => {
    setup();
    button().click();

    const event = press(item("Newest"), "p");
    expect(document.activeElement).toBe(item("Price: low to high"));
    expect(event.defaultPrevented).toBe(true);

    press(item("Price: low to high"), "P");
    expect(document.activeElement).toBe(item("Price: high to low"));

    press(item("Price: high to low"), "p");
    expect(document.activeElement).toBe(item("Price: low to high"));

    press(item("Price: low to high"), "z");
    expect(document.activeElement).toBe(item("Price: low to high"));
  });

  test("Escape closes the menu and returns focus to the button", () => {
    setup();
    button().click();
    press(item("Oldest"), "Escape");

    expect(isOpen()).toBe(false);
    expect(menu().hidden).toBe(true);
    expect(document.activeElement).toBe(button());
    expect(selected).toEqual([]);
  });

  test("Tab closes the menu without blocking the browser", () => {
    setup();
    button().click();
    expect(isOpen()).toBe(true);
    const event = press(item("Newest"), "Tab");

    expect(isOpen()).toBe(false);
    expect(event.defaultPrevented).toBe(false);
  });

  test("Enter and Space choose the focused item", () => {
    setup();
    button().click();
    press(item("Newest"), "ArrowDown");
    const event = press(item("Oldest"), "Enter");

    expect(selected).toEqual(["Oldest"]);
    expect(event.defaultPrevented).toBe(true);
    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(button());

    button().click();
    press(item("Newest"), " ");
    expect(selected).toEqual(["Oldest", "Newest"]);
  });

  test("clicking an item chooses it and closes the menu", () => {
    setup();
    button().click();
    item("Price: low to high").click();

    expect(selected).toEqual(["Price: low to high"]);
    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(button());
  });

  test("disabled items cannot be chosen", () => {
    setup();
    button().click();
    item("Most popular").click();
    press(item("Most popular"), "Enter");

    expect(selected).toEqual([]);
    expect(isOpen()).toBe(true);
  });

  test("a mousedown outside closes the menu", () => {
    setup();
    button().click();
    menu().dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(isOpen()).toBe(true);

    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(isOpen()).toBe(false);
  });

  test("the returned function removes the listeners", () => {
    const destroy = createMenuButton(root);
    destroy();
    button().click();
    button().focus();
    press(button(), "ArrowDown");

    expect(isOpen()).toBe(false);
    expect(document.activeElement).toBe(button());
  });
});
```


