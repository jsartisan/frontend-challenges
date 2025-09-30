Create a **Todo List** app

The component should let users add tasks and remove them.

## Requirements

### Behaviour

* Render an input field and a **Submit** button.
* When the user clicks **Submit**:

  * Add the input text as a new task in the list.
  * Clear the input field.
  * Do not add empty tasks.
* Each task should display with a **Delete** button.

  * Clicking **Delete** removes that task from the list.

### Accessibility

* Use semantic `<input>` and `<button>` elements.
* Ensure the input has a label or `aria-label`.
* Render tasks inside an unordered list (`<ul>` with `<li>`).
