A page often asks for the same data from several places at once. Three components mount, each calls `getUser(42)`, and the browser sends three identical requests. A common fix is to share the request while it is still running: the first caller starts it, and anyone who asks for the same thing before it finishes gets the same promise back.

Write a function `dedupe(fn, getKey?)` that wraps an async function and returns a new function with the same arguments.

- While a call for a given key is still pending, every new call with that key returns the **same promise** and does not call `fn` again.
- Calls with different keys run independently.
- Once the call settles (resolves or rejects), its key is forgotten. The next call runs `fn` again. This is not a cache of results, only of calls that are still running.
- If the call rejects, every caller waiting on it sees that same error, and the next call retries.
- If `fn` throws synchronously, the returned function should return a rejected promise instead of throwing, and nothing should be remembered.
- By default the key is `JSON.stringify(args)`, so `{ tag: "css" }` and another `{ tag: "css" }` count as the same call. When `getKey` is passed, use it to build the key from the arguments instead.
- Each function returned by `dedupe` keeps its own record of pending calls.

```ts
const getUser = dedupe((id: number) => fetch(`/api/users/${id}`).then((r) => r.json()));

const a = getUser(42);
const b = getUser(42); // no new request, a === b
const c = getUser(7);  // different key, a new request

await a;
getUser(42);           // the first call finished, so this sends a fresh request
```

This pattern is sometimes called request coalescing or "single flight".
