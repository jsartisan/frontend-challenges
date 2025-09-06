Implement a function `retryPromise` that retries executing a **promise-returning function** up to `n` times if it fails.

### Requirements

* Input is a function `fn` that returns a promise, and an integer `n` (maximum retry attempts).
* If `fn` resolves at any attempt, return its resolved value immediately.
* If all attempts fail, reject with the last error.
* Each retry should only be triggered when the previous attempt fails.
* The function should work even if `n = 0` (i.e., try only once).

### Example

```ts
let count = 0;
const unreliable = () => {
  count++;
  return count < 3
    ? Promise.reject('fail')
    : Promise.resolve('success');
};

retryPromise(unreliable, 5).then(console.log).catch(console.error);
// Output: "success"

retryPromise(() => Promise.reject('always fails'), 2)
  .then(console.log)
  .catch(console.error);
// Output: "always fails"
```

### Constraints

* `fn` is always a function that returns a promise.
* `n` is a non-negative integer.
* Must reject immediately if the final attempt fails.
