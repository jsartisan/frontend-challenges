Implement an async function helper `sequence()` that chains asynchronous functions together, similar to how `pipe()` works for synchronous functions. This is a fundamental pattern for handling async operations in sequence.

### Requirements

1. **Chain async functions** – Accept an array of async functions and execute them sequentially
2. **Data flow** – Pass the result of each function as input to the next function
3. **Error handling** – Stop execution and call final callback when any function returns an error
4. **Callback interface** – Each async function follows the Node.js callback pattern `(error, data) => void`
5. **Return async function** – `sequence()` should return a new async function that can be called

### Key Behaviors

- **Sequential execution** – Functions execute one after another, not in parallel
- **Data transformation** – Output of each function becomes input of the next
- **Early termination** – Stop on first error, don't execute remaining functions
- **Callback propagation** – Pass through the callback to the final result
- **Flexible input** – Accept any number of async functions in the array

### Example

```js
const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};

const asyncTimes4 = sequence([
  asyncTimes2,
  asyncTimes2
]);

asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);

// Error handling
const asyncFail = (callback, data) => {
  setTimeout(() => callback(new Error('Something went wrong')), 50);
};

const sequenceWithError = sequence([
  asyncTimes2,
  asyncFail,
  asyncTimes2 // This won't execute
]);

sequenceWithError((error, data) => {
  console.log(error.message); // "Something went wrong"
  console.log(data); // undefined
}, 1);
```

### Key Challenge

The function must handle the sequential execution of callback-based async functions while properly managing data flow and error propagation through the chain.
