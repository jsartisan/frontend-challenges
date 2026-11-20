Forms, settings panels and state reducers often need to write a value deep inside a nested object without knowing in advance which levels already exist. Write a function `set(object, path, value)` that writes `value` at `path`, creating whatever is missing on the way.

This is the write side of the existing [Get](https://frontend-challenges.com/challenges/446-get) challenge.

`path` is either:

- a **string** with dot and bracket syntax, such as `"a.b[0].c"` or `"a.b.0.c"`, or
- an **array** of keys, such as `["a", "b", 0, "c"]`. Keys in an array are used as-is, so `["file.txt"]` is one key.

```ts
const settings = { theme: { color: "red" } };

set(settings, "theme.color", "blue");
// { theme: { color: "blue" } }

set(settings, "editor.tabs[0].title", "main.ts");
// {
//   theme: { color: "blue" },
//   editor: { tabs: [{ title: "main.ts" }] },
// }

set(settings, ["recent", "notes.md"], 3);
// adds recent: { "notes.md": 3 }
```

**Rules**

- Mutate `object` in place and return that same object.
- When a level along the path is missing, or holds a primitive or `null`, replace it with a new container. Make it an **array** when the next key is a whole array index (`0`, `1`, `42`, but not `"01"`, `"-1"` or `"1x"`), and a plain **object** otherwise.
- Leave everything not on the path untouched, and keep existing nested objects and arrays (do not copy them).
- `value` can be anything, including `undefined` and `null`.
- An empty path (`""` or `[]`) changes nothing.
- If any key on the path is `__proto__`, `constructor` or `prototype`, change nothing. A `set` helper that runs on user input must never be able to modify `Object.prototype`.
