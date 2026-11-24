Your photo app lets people drop 200 images at once, but the upload server only handles 3 uploads at a time from one client. Fire all 200 requests together and most of them time out. You need a way to say "at most 3 of these may run right now; everyone else waits their turn". That tool is a **semaphore**: a counter of free slots plus a queue of callers waiting for one.

Write `createSemaphore(limit)`. It returns an object with:

- `acquire()`: returns a promise that resolves with a `release` function once the caller holds a slot.
- `run(task)`: waits for a slot, calls `task()`, frees the slot when the task finishes, and resolves or rejects with the task's outcome.
- `available`: how many slots are free right now.
- `waiting`: how many callers are queued for a slot right now.

```ts
const uploads = createSemaphore(3);

const results = await Promise.all(files.map((file) => uploads.run(() => upload(file))));
// never more than 3 uploads in flight
```

```ts
const lock = createSemaphore(1);

const release = await lock.acquire();
try {
  await saveDraft();
} finally {
  release();
}
```

Rules:

- `limit` must be a positive integer. Otherwise `createSemaphore` throws a `RangeError`.
- If a slot is free, `acquire()` takes it right away: `available` goes down by one before `acquire()` returns. It still returns a promise.
- If no slot is free, the caller is queued and `waiting` goes up by one.
- Waiters get slots in the order they called `acquire()` (first in, first out).
- When a slot is released and someone is waiting, hand the slot straight to the first waiter. `available` stays the same and `waiting` goes down by one at the moment `release()` is called. A caller that arrives right after the release must not jump ahead of the waiter.
- Each `release` function frees its slot only once. Calling it again does nothing.
- `run(task)` must not call `task` until it holds a slot. The task may return a plain value or a promise. The slot is freed whether the task succeeds, rejects or throws synchronously, and `run` always returns a promise.
- `acquire()` and `run()` share the same slots, and each semaphore has its own slots and queue.

```ts
const sem = createSemaphore(1);

const release = await sem.acquire(); // available: 0, waiting: 0
const later = sem.run(() => "second"); // available: 0, waiting: 1

release(); // the slot moves to the queued run: available 0, waiting 0
release(); // already released, nothing happens

await later; // "second", and available is back to 1
```
