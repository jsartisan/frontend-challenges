Write a function that takes a **DOM node** as input and converts it into a plain **JavaScript object**.

The returned object must include:

* `type`: the node’s tag name for element nodes (e.g. `"DIV"`, `"SPAN"`) or `#text` for text nodes.
* `attributes`: an object of attribute key-value pairs (empty object for nodes without attributes).
* `children`: an array of recursively converted child nodes (empty array if none).
* For text nodes, include a `value` field containing the text content.

### Example

Given the HTML:

```html
<div id="root" class="main">
  <span>Hello</span>
  <p>World</p>
</div>
```

Calling `domToObject(document.getElementById('root'))` should return:

```js
{
  type: "DIV",
  attributes: { id: "root", class: "main" },
  children: [
    {
      type: "SPAN",
      attributes: {},
      children: [
        { type: "#text", value: "Hello", attributes: {}, children: [] }
      ]
    },
    {
      type: "P",
      attributes: {},
      children: [
        { type: "#text", value: "World", attributes: {}, children: [] }
      ]
    }
  ]
}
```

### Constraints

* Input will always be a valid DOM node.
* Should handle elements, attributes, and text nodes.
* Ignore comment nodes for simplicity.
