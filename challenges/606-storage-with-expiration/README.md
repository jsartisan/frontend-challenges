`localStorage` keeps data forever. That is a problem for things that should go stale, like a cached API response, a one-time code or a "dismissed this banner today" flag. Cookies have `Max-Age`, but `localStorage` has nothing like it.

Write a function `createExpiringStorage(storage, options)` that wraps any `Storage`-like object (for example `window.localStorage` or `window.sessionStorage`) and adds expiry on top of it.

```ts
const cache = createExpiringStorage(window.localStorage, { prefix: "cache:" });

cache.set("user", { id: 7, name: "Ada" }, 60_000); // keep for one minute
cache.get("user"); // { id: 7, name: "Ada" }

// ...a minute later
cache.get("user"); // null, and the entry is gone from localStorage
```

**Options**

- `prefix` (default `""`): every key is stored in the underlying storage as `prefix + key`.
- `now` (default: the current time from `Date.now()`): a function that returns the current time in milliseconds. Tests use it to move time forward.

**Methods**

- `set(key, value, maxAge?)` stores any JSON-serializable `value`. With `maxAge` (in ms) the value expires once `maxAge` ms have passed. Without it the value never expires. A `maxAge` of `0` or less removes the key instead of storing it. Setting a key again replaces both the value and its expiry.
- `get(key)` returns the stored value, or `null` if the key is missing or expired. An expired entry is removed from the underlying storage when it is read. If the raw string under that key wasn't written by your wrapper (for example plain text or broken JSON), return `null` instead of throwing.
- `remove(key)` deletes one key.
- `clear()` deletes every key under the prefix and leaves other keys in the storage alone.
- `prune()` deletes every expired entry under the prefix and returns how many it deleted.

How you encode the value and its expiry time inside the stored string is up to you.
