Build an `update` function that enables efficient immutable updates to nested data structures. Instead of manually spreading objects at every level, this helper allows you to specify deep changes using a declarative syntax.

### Signature

```ts
function update<T>(target: T, spec: UpdateSpec): T;
```

### Supported Operations

1. **`{$push: any[]}`** – Appends all items from the array to the target array.
2. **`{$set: any}`** – Replaces the target with a new value.
3. **`{$merge: object}`** – Merges properties into the target object.
4. **`{$apply: (value: any) => any}`** – Transforms the value using a custom function.

### Examples

```ts
// Push to array
const arr = [1, 2, 3];
update(arr, {$push: [4, 5]}); // [1, 2, 3, 4, 5]

// Set nested value
const state = { a: { b: { c: 1 } }, d: 2 };
update(state, {a: {b: {c: {$set: 3}}}}); 
// { a: { b: { c: 3 } }, d: 2 }

// Merge objects
update(state, {a: {b: {$merge: {e: 5}}}});
// { a: { b: { c: 1, e: 5 } }, d: 2 }

// Apply function
update([1, 2, 3], {0: {$apply: x => x * 2}});
// [2, 2, 3]
```
