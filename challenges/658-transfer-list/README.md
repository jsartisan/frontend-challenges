Build a `TransferList` component: two lists side by side with a column of buttons between them, used to move items from one list to the other. You have probably seen one when picking which columns to show in a table, or which permissions to grant a role.

```jsx
<TransferList initialLeft={["HTML", "CSS", "JavaScript"]} initialRight={["React"]} />
```

Props:

- `initialLeft`: the items that start in the left list. Defaults to `[]`.
- `initialRight`: the items that start in the right list. Defaults to `[]`.

Items are unique strings. After the first render the component owns its own state.

Layout and markup:

- The left list is a `<fieldset>` with the `<legend>` **Available**. The right list is a `<fieldset>` with the `<legend>` **Selected**.
- Every item is a checkbox with the item text as its label, for example `<label><input type="checkbox" /> CSS</label>`.
- A list with no items shows the text `No items` instead.

The four buttons, from top to bottom:

| Button | `aria-label` | What it does |
| --- | --- | --- |
| `»` | `Move all to Selected` | Moves every item in Available to Selected. |
| `›` | `Move checked to Selected` | Moves only the checked items in Available to Selected. |
| `‹` | `Move checked to Available` | Moves only the checked items in Selected to Available. |
| `«` | `Move all to Available` | Moves every item in Selected to Available. |

Rules:

- Moved items are added to the **end** of the target list, in the order they had in the source list.
- Moved items arrive **unchecked**. Checked items in the other list stay checked.
- A "move checked" button is disabled when nothing is checked in its source list.
- A "move all" button is disabled when its source list is empty.

### Example

Start with Available `HTML, CSS, JavaScript, React` and Selected `Vue`.

1. Check `React`, then `HTML`, and press `›`. Available is now `CSS, JavaScript` and Selected is `Vue, HTML, React`, with nothing checked.
2. Press `«`. Available is now `CSS, JavaScript, Vue, HTML, React` and Selected shows `No items`. Both buttons that move items to Available are now disabled.
