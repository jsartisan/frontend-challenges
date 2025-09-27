Create a simple DOM wrapper function `$` that supports method chaining like jQuery. The wrapper should enable fluent API for manipulating DOM elements.

### Requirements

1. **`$(selector)`** – selects DOM elements using CSS selectors.
2. **`.css(property, value)`** – sets CSS properties on the selected elements.
3. **Method chaining** – all methods should return the wrapper instance to enable chaining.

### Example

```js
$('#button')
  .css('color', '#fff')
  .css('backgroundColor', '#000')
  .css('fontWeight', 'bold');
```

This should apply all three CSS properties to the element with id "button" in a single fluent chain.

### Signature

```ts
function $(selector: string): {
  css(property: string, value: string): any;
};
```
