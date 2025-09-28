Implement an async function helper `parallel()` that executes multiple asynchronous functions concurrently and collects their results, similar to `Promise.all()`. Unlike `sequence()`, all functions run simultaneously rather than waiting for each other.

### Requirements

1. **Concurrent execution** – Execute all async functions simultaneously, not sequentially
2. **Result collection** – Collect all successful results into an array in the same order
3. **Error handling** – Return the first error encountered, ignoring subsequent errors or results
4. **Callback interface** – Each async function follows the Node.js callback pattern `(error, data) => void`
5. **Return async function** – `parallel()` should return a new async function that can be called

### Key Behaviors

- **Parallel execution** – All functions start simultaneously and run concurrently
- **Result ordering** – Results are collected in the same order as the input functions
- **Early error termination** – On first error, ignore remaining results and pass error to callback
- **Completion tracking** – Wait for all functions to complete before calling final callback
- **Flexible input** – Accept any number of async functions in the array

### Example

```js
const async1 = (callback) => {
  setTimeout(() => callback(null, 1), 100);
};

const async2 = (callback) => {
  setTimeout(() => callback(null, 2), 50);
};

const async3 = (callback) => {
  setTimeout(() => callback(null, 3), 150);
};

const all = parallel([async1, async2, async3]);

all((error, data) => {
  console.log(data); // [1, 2, 3]
}, 'initial');

// Error handling
const asyncFail = (callback) => {
  setTimeout(() => callback(new Error('Something failed')), 75);
};

const parallelWithError = parallel([async1, asyncFail, async3]);

parallelWithError((error, data) => {
  console.log(error.message); // "Something failed"
  console.log(data); // undefined
});
```

### Key Challenge

The function must coordinate multiple concurrent async operations, track completion status, handle the first error encountered, and collect results in the correct order while managing the callback-based async flow.
