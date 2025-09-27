Create a `NodeStore` class that can use DOM elements as keys, similar to how ES6 `Map` works. This is useful for environments that don't support ES6 `Map` or when you need to associate data with DOM nodes.

### Requirements

1. **`set(node, value)`** – stores a value associated with a DOM node.
2. **`get(node)`** – retrieves the value associated with a DOM node.
3. **`has(node)`** – checks if a DOM node exists as a key.

### Constraints

- **Cannot use ES6 `Map`** – must implement your own solution.
- **DOM elements as keys** – leverage the unique characteristics of DOM nodes.
- **Consider time/space complexity** – optimize for performance.

### Example

```js
const store = new NodeStore();
const div = document.createElement('div');

store.set(div, 'hello world');
store.has(div);    // true
store.get(div);    // 'hello world'
store.set(div, 'updated');
store.get(div);    // 'updated'
```

### Key Insight

What makes DOM elements special as keys? They are **object references** that remain stable throughout their lifecycle.
