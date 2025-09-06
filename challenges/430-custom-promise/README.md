Implement a custom `MyPromise` class that reproduces the **core behaviour** of the native JavaScript `Promise`.

### Requirements

* Constructor accepts an executor `(resolve, reject) => void`.
* Support instance methods:
  * `then(onFulfilled?, onRejected?)`
  * `catch(onRejected?)`
  * `finally(onFinally?)`
* Handlers must run **asynchronously** (micro-task style).
* Each `then` returns a **new** promise to enable chaining.
* Handle edge-cases:
  * Errors thrown inside executor or callbacks.
  * Returning a promise/thenable from within `then`.
  * `finally` executes on both resolve and reject.

### Example

```ts
const p = new MyPromise((resolve) => {
  setTimeout(() => resolve(42), 100);
});

p.then(v => v * 2)
 .then(console.log); // 84 (after ~100 ms)

new MyPromise((_, reject) => reject('error'))
  .catch(console.log); // "error"
```
