Reading a deeply nested value safely is only half the job. Form libraries, state reducers and config loaders also need to **write** into a nested path like `"user.address.city"` without first checking that `user` and `address` exist.

Write a function `set(object, path, value)` that assigns `value` at `path` inside `object`, creating any missing containers on the way. It mutates `object` and returns that same object.

```ts
const form = {};

set(form, "user.address.city", "Lisbon");
// { user: { address: { city: "Lisbon" } } }

set(form, "user.phones[0]", "555-0100");
// { user: { address: { city: "Lisbon" }, phones: ["555-0100"] } }

set(form, ["meta", "last.saved"], 1700000000);
// adds { meta: { "last.saved": 1700000000 } }
```

**Rules**

- `path` is either a string or an array of keys.
  - In a string, keys are separated by `.` and an index can be written in brackets, so `"a[0].b"` and `"a.0.b"` mean the same thing.
  - In an array, each item is one key, so `["a.b"]` writes to a key literally named `"a.b"`.
- When an intermediate value is missing, create a container for it: an **array** if the next key is an index, otherwise a plain **object**. An index is a whole non-negative number without leading zeros, like `0` or `12` (`"01"` and `"-1"` are object keys).
- When an intermediate value exists but is a primitive or `null`, replace it with a new container chosen by the same rule.
- Existing objects and arrays on the path are reused, so sibling keys stay untouched.
- Any value can be stored, including `undefined` and `null`.
- An empty path (`""` or `[]`) changes nothing.
- For safety, if any key in the path is `__proto__`, `constructor` or `prototype`, change nothing. Your `set` must never be a way to pollute `Object.prototype`.

This is the counterpart to the [Get](https://frontend-challenges.com/challenges/446-get) challenge.
