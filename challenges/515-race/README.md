Implement an async function helper `race()` that executes multiple asynchronous functions concurrently and returns the result of the first function to complete, similar to `Promise.race()`. Unlike `parallel()`, it finishes as soon as any function completes or encounters an error.

### Requirements

1. **Concurrent execution** – Execute all async functions simultaneously
2. **First completion wins** – Return the result of the first function to complete (success or error)
3. **Early termination** – Stop and ignore remaining functions once first result is received
4. **Callback interface** – Each async function follows the Node.js callback pattern `(error, data) => void`
5. **Return async function** – `race()` should return a new async function that can be called

### Key Behaviors

- **Parallel execution** – All functions start simultaneously and run concurrently
- **First-wins semantics** – Return the first result (success or error) and ignore the rest
- **Immediate completion** – Call final callback as soon as any function completes
- **No result collection** – Don't wait for or collect results from other functions
- **Flexible input** – Accept any number of async functions in the array

### Example

```js
const async1 = (callback) => {
  setTimeout(() => callback(null, 1), 300);
};

const async2 = (callback) => {
  setTimeout(() => callback(null, 2), 100);
};

const async3 = (callback) => {
  setTimeout(() => callback(null, 3), 200);
};

const first = race([async1, async2, async3]);

first((error, data) => {
  console.log(data); // 2, since async2 completes first
});

// Error handling
const asyncFail = (callback) => {
  setTimeout(() => callback(new Error('Something failed')), 50);
};

const raceWithError = race([async1, asyncFail, async3]);

raceWithError((error, data) => {
  console.log(error.message); // "Something failed"
  console.log(data); // undefined
});
```

### Key Challenge

The function must coordinate multiple concurrent async operations and return the first result (success or error) while ignoring all subsequent completions.
