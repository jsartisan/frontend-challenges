`element.getElementsByClassName()` is one of the oldest DOM lookups. It looks simple, but writing it yourself means walking the DOM tree, telling elements apart from text and comment nodes, and getting class-name matching exactly right.

Write a function `getElementsByClassName(root, classNames)` that returns every element **inside** `root` that has all of the given classes.

```ts
// <div id="root">
//   <button class="btn primary">Save</button>
//   <button class="btn">Cancel</button>
//   <div class="card">
//     <button class="primary large btn">Go</button>
//   </div>
// </div>

getElementsByClassName(root, "btn");
// [<button>Save</button>, <button>Cancel</button>, <button>Go</button>]

getElementsByClassName(root, "primary btn");
// [<button>Save</button>, <button>Go</button>]
```

**Rules**

- `root` is an `Element` or a `Document`. Only its descendants are searched; `root` itself is never part of the result.
- `classNames` is a string of one or more class names separated by whitespace (spaces, tabs or newlines, possibly several in a row). An element matches when it has **every** class in the list, in any order.
- Class names match whole names only and are case-sensitive: `item` does not match `item-active`, `items` or `Item`.
- If `classNames` is empty or only whitespace, return an empty array.
- Return a plain array (not a live `HTMLCollection`), with elements in document order (the order a depth-first walk visits them).
- It should work for any element, including SVG elements.
- Don't use `getElementsByClassName`, `querySelector` or `querySelectorAll`; the tests turn them off. Walk the tree yourself.
