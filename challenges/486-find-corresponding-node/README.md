Given two identical DOM trees **A** and **B**, and an element **a** in tree **A**, find the corresponding element **b** in tree **B** that has the same relative position.

### Requirements

- **Same structure** – both DOM trees have identical structure.
- **Relative position** – elements at the same path from root should correspond.
- **Multiple approaches** – solve recursively, iteratively, and using DOM APIs.

### Example

```html
<!-- Tree A -->
<div id="rootA">
  <div class="container">
    <p class="text">Hello</p>
    <span class="highlight">World</span>
  </div>
</div>

<!-- Tree B -->
<div id="rootB">
  <div class="container">
    <p class="text">Goodbye</p>
    <span class="highlight">Universe</span>
  </div>
</div>
```

If `a` is the `<p class="text">` element in tree A, then `b` should be the `<p class="text">` element in tree B.

### Signature

```ts
function findCorrespondingNode(rootA: Node, rootB: Node, target: Node): Node | null;
```

### Follow-up Questions

1. **Recursive vs Iterative** – Can you solve this both ways?
2. **DOM API optimization** – Are there special DOM APIs for better performance?
3. **Time complexity** – What's the time cost for each approach?
