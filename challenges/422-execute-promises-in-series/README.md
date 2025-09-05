Implement a function `runInSeries` that takes an **array of functions**, where each function returns a promise, and executes them **one after another** (in series).

The function should return a promise that resolves with an array of results, in the same order as the functions.

If any promise rejects, stop execution and reject immediately with that error.

### Example

```js
const tasks = [
  () => Promise.resolve(1),
  () => new Promise(res => setTimeout(() => res(2), 100)),
  () => Promise.resolve(3)
];

runInSeries(tasks).then(console.log);
// Output: [1, 2, 3]

const failingTasks = [
  () => Promise.resolve('a'),
  () => Promise.reject('error'),
  () => Promise.resolve('c')
];

runInSeries(failingTasks).catch(console.error);
// Output: error
```

### Constraints

* Input is always an array of functions returning promises.
* Execution must be strictly sequential (no overlapping).
* Handle empty array input → should resolve to `[]`.
