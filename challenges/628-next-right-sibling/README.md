`element.nextElementSibling` only looks at children of the same parent. Sometimes you want the element that sits **directly to the right** of another one on the same level of the tree, even if it lives under a different parent (a "cousin").

Write a function `nextRightSibling(root, target)` that returns the element immediately to the right of `target` on the same depth of the tree rooted at `root`, or `null` if there is none.

```ts
// <div id="root">
//   <section>
//     <h2 id="a"></h2>
//     <p id="b"></p>
//   </section>
//   <aside></aside>
//   <section>
//     <img id="c" />
//   </section>
// </div>

nextRightSibling(root, a); // <p id="b">       (a plain sibling)
nextRightSibling(root, b); // <img id="c">     (a cousin; the empty <aside> has nothing on this level)
nextRightSibling(root, c); // null             (c is the last element on its level)
```

Think of the tree as rows: row 0 is `root`, row 1 is its children, row 2 is its grandchildren, and so on, each row read left to right in document order. The answer is the element that comes right after `target` in its row.

**Rules**

- Only elements count. Text and comment nodes are ignored.
- Depth is measured from `root`, not from the document. Elements outside `root` never appear in the answer.
- Never return an element from a different level: not an ancestor's sibling, not a deeper descendant.
- Return `null` when `target` is `root`, when `target` is not inside `root`, or when `target` is the last element on its level.
- It should work for any element, including SVG elements.

**Follow-up:** can you do it in a single pass over the tree, visiting each element at most once?
