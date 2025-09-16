`_.get(object, path, [defaultValue])` from Lodash lets you safely retrieve a deeply-nested property.
Re-implement this behaviour as a standalone `get` function.

### Signature

```ts
function get<T, R = unknown>(
  object: T,
  path: string | Array<string | number>,
  defaultValue?: R
): R | unknown
```

### Behaviour

1. `path` accepts either  
   • a dot-separated string (`"a.b[0].c"`), or  
   • an array of keys / indices (`["a", "b", 0, "c"]`).
2. If the resolved value is **`undefined`**, return `defaultValue` (or `undefined` if no default provided).
3. If the traversal hits a non-object/null before the path ends, also return `defaultValue`.
4. Keys containing dots or brackets should work when the array syntax is used (`["a.b"]`).

### Example

```ts
const obj = {
  a: { b: [{ c: 3 }] },
  x: 0,
};

get(obj, "a.b[0].c");              // 3
get(obj, ["a", "b", 0, "c"]);      // 3
get(obj, "a.b[1].c", "missing");   // "missing"
get(obj, "x.y.z", null);           // null
```
