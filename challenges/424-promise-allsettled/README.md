Implement a polyfill function `promiseAllSettled` that works like `Promise.allSettled`.

### Requirements

* Accepts an **array of promises (or values)**.
* Returns a promise that resolves once **all input promises have settled**.
* The result should be an array of objects with:

  * `{ status: "fulfilled", value: ... }` if the promise resolved.
  * `{ status: "rejected", reason: ... }` if the promise rejected.
* Order of results must match the order of the input promises.
* Must not short-circuit on rejection (unlike `Promise.all`).

### Example

```js
const promises = [
  Promise.resolve(1),
  Promise.reject('fail'),
  42
];

promiseAllSettled(promises).then(console.log);

// Output:
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "fail" },
//   { status: "fulfilled", value: 42 }
// ]
```

### Constraints

* Do not use `Promise.allSettled` directly.
* Must handle non-promise values correctly (treat them as fulfilled).
