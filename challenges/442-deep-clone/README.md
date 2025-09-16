Implement a `deepClone` utility that returns a deep-copied version of any serialisable JavaScript value.

### Signature

```ts
function deepClone<T>(value: T): T
```

### Requirements

1. Supported types:  
   * Primitives (`string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`)  
   * Plain objects  
   * Arrays  
   * `Date`  
   * `RegExp`
2. For objects and arrays, **all nested levels** must be copied by value, not by reference.
3. Functions and DOM nodes (or other non-serialisable values) should be returned **as-is** (shared reference).
4. The clone must not share any mutable nested structure with the original.
5. Circular references **are out of scope** (you may assume input is acyclic).

### Examples

```ts
const original = {
  name: "Alice",
  meta: { scores: [1, 2, 3], birthday: new Date("2000-01-01") },
};

const copy = deepClone(original);

copy.meta.scores.push(4);

console.log(original.meta.scores); // [1, 2, 3]
console.log(copy.meta.scores);     // [1, 2, 3, 4]
```
