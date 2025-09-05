JavaScript’s `Promise.prototype.finally` executes a callback when the promise is **settled** (resolved or rejected).

Your task is to **implement a polyfill** for `Promise.prototype.finally`.

### Requirements

* `finally(callback)` should run the `callback` once the promise settles, whether it resolves or rejects.
* The returned promise should:

  * Resolve with the original value if the promise was fulfilled.
  * Reject with the original reason if the promise was rejected.
* If the `callback` returns a promise, wait for it to finish before proceeding.

### Example

```js
Promise.resolve(42)
  .finally(() => console.log('done'))
  .then(value => console.log('resolved with', value));
// Output:
// done
// resolved with 42

Promise.reject('error')
  .finally(() => console.log('cleanup'))
  .catch(err => console.log('rejected with', err));
// Output:
// cleanup
// rejected with error
```
