Implement a `mapLimit` function that behaves like `Array.map`, but for asynchronous iteratees with a **concurrency limit**.

### Requirements

 * The returned promise **resolves to an array of results in the same order** as `inputs`.
 * No more than `limit` iteratees run concurrently.
 * If any iteratee calls back with a non-null error, the promise **rejects immediately**.
 * Each iteratee **must call its callback exactly once**.

### Example

```ts
mapLimit([1, 2, 3, 4, 5], 3, (n, cb) => {
  setTimeout(() => {
    cb(null, n * 2);
  }, 2000);
})
  .then(res => console.log(res))   // [2, 4, 6, 8, 10]
  .catch(console.error);
```
