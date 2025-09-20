Implement a `deepClone` utility that returns a deep-copied version of any plain JavaScript data (objects, arrays, and primitives).

### Signature

```ts
function deepClone<T>(value: T): T
```

### Requirements

1. Supported inputs:
   * **Primitives** (`string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`)
   * **Plain objects** (created with `{}` or `Object.create(null)`)
   * **Arrays**
2. For objects and arrays, **every nested level** must be cloned by value, never by reference.
3. Any value that is **not** a primitive, plain object, or array (e.g. `Date`, `RegExp`, `Map`, `Set`, functions, DOM nodes) should be returned **as-is** (shared reference).
4. Circular references are **out of scope** (you may assume the input is acyclic).

### Example

```ts
const original = {
  user: "Alice",
  scores: [1, 2, 3],
};

const copy = deepClone(original);
copy.scores.push(4);

console.log(original.scores); // [1, 2, 3]
console.log(copy.scores);    // [1, 2, 3, 4]
```
