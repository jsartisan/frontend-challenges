Implement a `wait` function that pauses the execution of code for a specified number of milliseconds. The `wait` function should return a Promise that resolves after the given time has elapsed.

**Example usage**
```js
async function demo() {
  console.log('Start');
  await wait(2000); // Pauses for 2 seconds
  console.log('End');
}

demo();
// Output:
// Start
// (waits for 2 seconds)
// End
```
