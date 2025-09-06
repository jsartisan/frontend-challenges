Design and implement a function `runWithPriority` that executes an array of **tasks** (functions returning promises) based on their assigned priority.

### Requirements

* Each task is represented as an object:
  `{ fn: () => Promise<any>, priority: number }`
* Tasks with **higher priority** should run before tasks with lower priority.
* If multiple tasks share the same priority, they should be executed in the order they appear.
* The function should return a promise that resolves with an array of results in the **execution order**.
* If a task rejects, the function should stop immediately and reject with that error.

### Example

```js
const tasks = [
  { fn: () => Promise.resolve('low'), priority: 1 },
  { fn: () => Promise.resolve('high'), priority: 3 },
  { fn: () => new Promise(res => setTimeout(() => res('medium'), 50)), priority: 2 }
];

runWithPriority(tasks).then(console.log);
// Output: ["high", "medium", "low"]

const failingTasks = [
  { fn: () => Promise.resolve('ok'), priority: 2 },
  { fn: () => Promise.reject('fail'), priority: 5 },
  { fn: () => Promise.resolve('skip'), priority: 1 }
];

runWithPriority(failingTasks).catch(console.error);
// Output: "fail"
```

### Constraints

* Input is always an array of objects with `fn` and `priority`.
* Must not execute any lower-priority task until all higher-priority ones are finished.
* Handle empty input gracefully (resolve with `[]`).
