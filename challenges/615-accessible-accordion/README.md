An FAQ list where each question opens its answer is one of the most common widgets on the web. Built from plain `div`s with click handlers, it tells a screen reader nothing about which answers are open and gives keyboard users no quick way to move between questions. The [WAI-ARIA accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) describes how it should behave.

Write a function `createAccordion(root, options)` that takes the markup below and turns it into an accessible accordion.

```html
<div id="faq">
  <h3><button data-trigger="returns">Can I return my order?</button></h3>
  <div data-content="returns">Yes, within 30 days of delivery.</div>

  <h3><button data-trigger="gift" aria-expanded="true">Do you offer gift wrap?</button></h3>
  <div data-content="gift">Add it at checkout for free.</div>

  <h3><button data-trigger="pickup" disabled>Can I pick up in store?</button></h3>
  <div data-content="pickup">Coming soon.</div>

  <h3><button data-trigger="track">How do I track a package?</button></h3>
  <div data-content="track">Use the link in your shipping email.</div>
</div>
```

A trigger and its content share the same key (`data-trigger="gift"` goes with `data-content="gift"`). The triggers are real `<button>`s inside headings, so <kbd>Enter</kbd> and <kbd>Space</kbd> already fire `click` for you.

**Roles and relationships**

- Every `[data-trigger]` gets `aria-controls` pointing at its content's id.
- Every `[data-content]` gets `role="region"` and `aria-labelledby` pointing at its trigger's id.
- If a trigger or content has no id, give it `<key>-trigger` or `<key>-content`. Keep ids that already exist.

**Expanding and collapsing**

- Every trigger always has `aria-expanded` set to `"true"` or `"false"`. A collapsed section's content has the `hidden` attribute, an expanded one does not.
- On start, sections whose trigger already has `aria-expanded="true"` are open, and everything else is closed.
- Clicking an enabled trigger toggles its section. Clicking inside the content does nothing.
- By default only one section can be open at a time: opening one closes the rest. If several triggers start with `aria-expanded="true"`, keep only the first one open. Closing the open section is allowed, so everything can be collapsed.
- With `{ multiple: true }`, sections open and close independently.

**Keyboard** (when a trigger has focus)

- <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> move focus to the next / previous trigger, wrapping around at the ends. Moving focus does not open or close anything.
- <kbd>Home</kbd> / <kbd>End</kbd> move focus to the first / last trigger.
- Disabled triggers are skipped.
- Call `preventDefault()` for the keys you handle, and leave every other key alone.

`createAccordion` returns a function that removes every listener it added.

```js
const destroy = createAccordion(document.getElementById("faq"));

// "Do you offer gift wrap?" is open, the rest are closed.
// Click "Can I return my order?": it opens and the gift wrap answer closes.
// Focus it and press ArrowDown twice: focus skips the disabled
// "pick up in store" question and lands on "How do I track a package?".

destroy(); // clicks and key presses do nothing now
```
