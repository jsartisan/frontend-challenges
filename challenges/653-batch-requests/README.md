Picture a comment list where every comment renders an avatar, and every avatar asks for its author with `getUser(id)`. Fifty comments means fifty requests, even though the server has an endpoint that takes many ids at once. Batching fixes this: let each component ask for one user, but quietly collect all the ids asked for in the same tick and send them in a single request.

Write `createBatcher(batchFn, options?)`. It takes a function that loads many keys at once and returns a `load(key)` function that loads one key:

```ts
const getUsers = (ids: number[]) => fetch(`/users?ids=${ids}`).then((r) => r.json());
const loadUser = createBatcher(getUsers);

const [ada, alan] = await Promise.all([loadUser(1), loadUser(2)]);
// getUsers was called once, with [1, 2]
```

Rules:

- `load(key)` returns a promise right away. It must not call `batchFn` synchronously.
- Every `load` call made during the same synchronous run of code joins one batch. Schedule the batch to be sent in a microtask (for example with `queueMicrotask`) when the first key is queued. A `load` call made after an `await` belongs to the next batch.
- `batchFn` receives the keys in the order they were first asked for and resolves with an array of results of the same length, where `results[i]` belongs to `keys[i]`.
- If the same key is asked for more than once in one batch, send it only once. Every caller for that key gets the same result.
- If `results[i]` is an `Error`, only the callers for `keys[i]` reject with that error. The rest still resolve.
- If `batchFn` rejects or throws, every caller in that batch rejects with that error.
- If `batchFn` resolves with something that is not an array of the right length, every caller in that batch rejects with an `Error`.
- `options.maxBatchSize` limits how many keys go into one `batchFn` call. When a batch is bigger, split it into chunks in order and send all chunks at once, without waiting for the previous one. A failed chunk only affects its own callers.
- Results are not cached. Asking for a key again in a later batch calls `batchFn` again.
- Each batcher created by `createBatcher` keeps its own queue.

```ts
const loadSquare = createBatcher(async (nums: number[]) => nums.map((n) => n * n), {
  maxBatchSize: 2,
});

loadSquare(2); // 4
loadSquare(3); // 9
loadSquare(2); // 4, shares the result of the first call
loadSquare(5); // 25
// batchFn calls: [2, 3] and [5]
```
