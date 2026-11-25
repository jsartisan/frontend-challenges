Some work should happen only one time, however many places ask for it: opening a database connection, loading a config file, registering a service worker, or sending an "app started" analytics event. Write a function `once(fn)` that returns a wrapped version of `fn` which runs `fn` at most one time.

```ts
const loadConfig = once(() => {
  console.log("reading config...");
  return { theme: "dark" };
});

loadConfig(); // logs "reading config...", returns { theme: "dark" }
loadConfig(); // logs nothing, returns the same object
```

**Rules**

- The first call runs `fn` with the arguments and `this` that it was called with, and returns what `fn` returns.
- Every later call returns that first result without running `fn` again, even if the arguments change. This includes results such as `undefined`, `null` and `0`.
- Each call to `once` makes a new wrapper with its own state, so wrapping the same `fn` twice gives two wrappers that each run it once.
- If `fn` throws, the error goes to the caller and the call does **not** count. The next call tries `fn` again. This lets a failed setup step be retried.
- If `fn` calls the wrapper again while it is still running, that inner call must not run `fn` a second time. It returns `undefined`.
