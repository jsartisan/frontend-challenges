A tabs widget looks simple, but a row of buttons that toggles some `div`s is invisible to screen reader users and awkward for keyboard users. The [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) describes how it should behave.

Write a function `createTabs(root)` that takes the markup below and turns it into an accessible tabs widget.

```html
<div id="settings">
  <div data-tablist aria-label="Settings">
    <button data-tab="profile">Profile</button>
    <button data-tab="billing">Billing</button>
    <button data-tab="team" disabled>Team</button>
    <button data-tab="alerts">Alerts</button>
  </div>
  <div data-panel="profile">Your name and avatar</div>
  <div data-panel="billing">Your plan and invoices</div>
  <div data-panel="team">Invite people</div>
  <div data-panel="alerts">Email and push settings</div>
</div>
```

A tab and its panel share the same key (`data-tab="billing"` goes with `data-panel="billing"`).

**Roles and relationships**

- `[data-tablist]` gets `role="tablist"`.
- Every `[data-tab]` gets `role="tab"` and `aria-controls` pointing at its panel's id.
- Every `[data-panel]` gets `role="tabpanel"`, `tabindex="0"` and `aria-labelledby` pointing at its tab's id.
- If a tab or panel has no id, give it `<key>-tab` or `<key>-panel`. Keep ids that already exist.

**Selection**

- Exactly one tab is selected. It has `aria-selected="true"` and `tabindex="0"`. Every other tab has `aria-selected="false"` and `tabindex="-1"`, so <kbd>Tab</kbd> lands only on the selected tab.
- Only the selected tab's panel is visible. Hide the others with the `hidden` attribute.
- On start, select the tab that already has `aria-selected="true"` in the markup. If none does, select the first enabled tab.
- Clicking an enabled tab selects it.

**Keyboard** (when a tab has focus)

- <kbd>ArrowRight</kbd> / <kbd>ArrowLeft</kbd> move focus to the next / previous tab and select it, wrapping around at the ends.
- <kbd>Home</kbd> / <kbd>End</kbd> move to the first / last tab.
- Disabled tabs are skipped.
- Call `preventDefault()` for the keys you handle, and leave every other key alone.

`createTabs` returns a function that removes every listener it added.

```js
const destroy = createTabs(document.getElementById("settings"));

// "Profile" is selected, its panel is visible.
// Focus "Billing" and press ArrowRight: focus jumps over "Team" to "Alerts".
// Press ArrowRight again: focus wraps back to "Profile".

destroy(); // clicks and key presses do nothing now
```
