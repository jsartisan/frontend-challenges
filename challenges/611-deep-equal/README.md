`===` only tells you whether two values are the *same reference*. Two objects that look identical, like the props of a component before and after a re-render, or a form's saved state and its current state, are still "not equal" to it. To know whether anything actually changed, you need to compare the values themselves, all the way down.

Write a function `deepEqual(a, b)` that returns `true` when `a` and `b` hold the same data and `false` otherwise.

```ts
deepEqual({ id: 1, tags: ["a", "b"] }, { tags: ["a", "b"], id: 1 }); // true
deepEqual([1, [2, 3]], [1, [2, 4]]); // false
deepEqual(new Date(2024, 0, 1), new Date(2024, 0, 1)); // true
deepEqual({ a: undefined }, {}); // false
```

**Rules**

- **Primitives** are equal when they are strictly equal, with two exceptions: `NaN` equals `NaN`, and `0` equals `-0`.
- **Plain objects** are equal when they have the same own enumerable keys and each key's values are deeply equal. Key order doesn't matter, but a key that is present with the value `undefined` is not the same as a missing key.
- **Arrays** are equal when they have the same length and their items are deeply equal position by position. An array never equals a plain object, even one with keys `0`, `1`, ...
- **Dates** are equal when they represent the same time. **RegExps** are equal when their `source` and `flags` match.
- **Maps** are equal when they have the same size, the same keys, and deeply equal values for each key.
- **Sets** are equal when they have the same size and every member of one is a member of the other (as `Set.prototype.has` sees it).
- Two objects with **different prototypes** are never equal, so `new Point(1, 2)` does not equal `{ x: 1, y: 2 }`. Instances of the same class are compared like plain objects.
- **Functions** are only equal to themselves.
- The inputs may contain **circular references**. Your function must not overflow the stack on them.
