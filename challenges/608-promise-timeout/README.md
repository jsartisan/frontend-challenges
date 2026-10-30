A request that never answers is worse than one that fails: the spinner keeps spinning and the user has no idea what is going on. Most of the time you want to give an async task a time budget and stop waiting once it runs out.

Write a function `withTimeout(task, ms)` that returns a promise which settles with whatever `task` settles with, unless `ms` milliseconds pass first. In that case it rejects with a `TimeoutError`.

```ts
const profile = await withTimeout(fetchProfile(7), 2000);
// resolves with the profile if it arrives within 2 seconds,
// otherwise rejects with TimeoutError("Timed out after 2000ms")
```

Giving up on a promise doesn't stop the work behind it, so `task` can also be a function. In that case `withTimeout` calls it with an `AbortSignal` and aborts that signal when time runs out, so the task can cancel itself:

```ts
const res = await withTimeout((signal) => fetch("/api/search?q=shoes", { signal }), 3000);
// after 3 seconds the fetch is actually cancelled, not just ignored
```

**Requirements**

- `task` is either a promise or a function `(signal: AbortSignal) => Promise<T>`.
- If the task resolves or rejects before the deadline, pass its value or its error through unchanged.
- If the deadline is hit first, reject with an instance of the exported `TimeoutError` class. It must extend `Error`, have `name` set to `"TimeoutError"` and the message `` `Timed out after ${ms}ms` ``.
- When the deadline is hit and `task` was a function, abort its signal, using the `TimeoutError` as the abort reason. Never abort it when the task finished in time.
- Once the result is decided, a later outcome of the task is ignored.
- Don't leave timers behind: clear the timer as soon as the task settles.
- If the function throws synchronously, return a rejected promise instead of throwing.
