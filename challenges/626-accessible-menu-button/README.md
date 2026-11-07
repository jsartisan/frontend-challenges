A "Sort by" or "More actions" button that drops down a short list of choices shows up on almost every app toolbar. Built from a `div` and a few click handlers, it leaves screen reader users guessing whether anything opened, and keyboard users have no way to reach the choices without tabbing through the whole page. The [WAI-ARIA menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) describes how it should behave.

Write a function `createMenuButton(root, options)` that takes the markup below and turns it into an accessible menu button.

```html
<div id="actions">
  <button data-menu-button>Actions</button>
  <ul data-menu>
    <li data-menu-item>Rename</li>
    <li data-menu-item>Duplicate</li>
    <li data-menu-item aria-disabled="true">Move to folder</li>
    <li data-menu-item>Download</li>
    <li data-menu-item>Delete</li>
  </ul>
</div>
```

The button is a real `<button>`, so <kbd>Enter</kbd> and <kbd>Space</kbd> on it already fire `click` for you. Items are plain `<li>`s, so you have to wire up their keyboard support yourself.

**Roles and relationships**

- The `[data-menu-button]` gets `aria-haspopup="menu"` and `aria-controls` pointing at the menu's id.
- The `[data-menu]` gets `role="menu"` and `aria-labelledby` pointing at the button's id.
- Every `[data-menu-item]` gets `role="menuitem"` and `tabindex="-1"`, so it can take focus from script but is not a Tab stop.
- If the button or menu has no id, give it `<root id>-button` or `<root id>-menu`. Keep ids that already exist.

**Opening and closing**

- The button always has `aria-expanded` set to `"true"` or `"false"`. A closed menu has the `hidden` attribute, an open one does not. The menu starts closed.
- Clicking the button opens the menu and focuses the first enabled item. Clicking it while open closes the menu and focuses the button.
- With focus on the button, <kbd>ArrowDown</kbd> opens the menu on the first enabled item and <kbd>ArrowUp</kbd> opens it on the last one.
- A `mousedown` anywhere outside `root` closes the menu, without moving focus.

**Keyboard** (when an item has focus)

- <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> move focus to the next / previous item, wrapping around at the ends.
- <kbd>Home</kbd> / <kbd>End</kbd> move focus to the first / last item.
- Items with `aria-disabled="true"` are skipped by every focus movement.
- Typing a single printable character moves focus to the next item, after the current one and wrapping around, whose text starts with that character (case-insensitive). If no item matches, focus stays put.
- <kbd>Enter</kbd> or <kbd>Space</kbd> chooses the focused item.
- <kbd>Escape</kbd> closes the menu and focuses the button.
- <kbd>Tab</kbd> closes the menu but lets the browser move focus as usual, so do not call `preventDefault()` for it. Call `preventDefault()` for every other key you handle.

**Choosing an item**

- Clicking an enabled item, or pressing <kbd>Enter</kbd>/<kbd>Space</kbd> on it, closes the menu, focuses the button and then calls `options.onSelect(item)` with the item element.
- Disabled items cannot be chosen: nothing happens and the menu stays open.

`createMenuButton` returns a function that removes every listener it added.

```js
const destroy = createMenuButton(document.getElementById("actions"), {
  onSelect: (item) => console.log(item.textContent),
});

// Click "Actions": the menu opens and "Rename" has focus.
// Press ArrowDown twice: focus skips "Move to folder" and lands on "Download".
// Press "d": focus jumps to "Delete". Press "d" again: back to "Duplicate".
// Press Enter: logs "Duplicate", the menu closes and "Actions" has focus.

destroy(); // clicks and key presses do nothing now
```
