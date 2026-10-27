Many older Node.js and browser APIs use the "error-first callback" style: the last argument is a callback that is called as `callback(error, result)`. If `error` is truthy, the operation failed; otherwise `result` holds the value.

Write a function `promisify(fn)` that takes such a function and returns a new function that returns a `Promise` instead.

- The returned function should accept the same arguments as `fn` (minus the callback).
- It should resolve with `result` when the callback is called without an error.
- It should reject with `error` when the callback receives an error.
- It should keep the `this` value it was called with, so methods still work.
- If `fn` throws synchronously, the promise should reject with that error.

```js
function readConfig(name, callback) {
  setTimeout(() => {
    if (!name) callback(new Error("name is required"));
    else callback(null, { name, debug: true });
  }, 10);
}

const readConfigAsync = promisify(readConfig);

await readConfigAsync("app"); // { name: "app", debug: true }
await readConfigAsync("");    // rejects with Error("name is required")
```
