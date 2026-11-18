`URLSearchParams` is the browser's tool for reading and building query strings like `?q=shoes&size=9`. Write your own class, `MyURLSearchParams`, that covers the everyday part of it, without using the built-in `URLSearchParams`, `URL`, `decodeURIComponent` or `encodeURIComponent`.

Think of it as an ordered list of `[name, value]` pairs. Unlike a `Map`, the same name can show up more than once, and order is kept.

```ts
const params = new MyURLSearchParams("?q=red+shoes&tag=sale&tag=new");

params.get("q");        // "red shoes"
params.getAll("tag");   // ["sale", "new"]
params.has("page");     // false
params.get("page");     // null

params.append("page", "2");
params.set("tag", "clearance");   // replaces both "tag" entries
params.delete("q");

params.toString();      // "tag=clearance&page=2"
[...params];            // [["tag", "clearance"], ["page", "2"]]
params.size;            // 2
```

**Constructor**

`new MyURLSearchParams(init?)` accepts:

- a query string, with or without a leading `?`
- a plain object, such as `{ a: "1", b: "2" }`
- an array of pairs, such as `[["a", "1"], ["a", "2"]]`

Only a query string is parsed and decoded. Names and values from an object or array are stored as they are.

**Parsing a query string**

1. Split on `&` and skip empty segments.
2. Split each segment on the **first** `=`. A segment with no `=` gets the value `""`.
3. Decode both name and value: `+` becomes a space, and `%XX` escapes are bytes of UTF-8 text (`%C3%BC` is `"ü"`). A `%` that is not followed by two hex digits stays as it is.

**Methods**

| Member | What it does |
| --- | --- |
| `get(name)` | First value for `name`, or `null` |
| `getAll(name)` | Every value for `name`, in order |
| `has(name)` | Whether any entry has that name |
| `append(name, value)` | Adds a pair at the end |
| `set(name, value)` | Changes the first entry with that name and removes the others. Adds it at the end if there is none |
| `delete(name)` | Removes every entry with that name |
| `size` | Number of entries |
| `toString()` | The serialized query string, with no leading `?` |
| `[Symbol.iterator]()` | Yields `[name, value]` pairs in order |

**Serializing**

`toString()` joins `name=value` pairs with `&`. Encode each name and value as UTF-8 bytes. Letters, digits, and `*`, `-`, `.`, `_` stay as they are, a space becomes `+`, and every other byte becomes `%XX` with uppercase hex. Empty values still get an `=`, so `debug` turns into `debug=`.

```ts
new MyURLSearchParams({ q: "salt & pepper", city: "München" }).toString();
// "q=salt+%26+pepper&city=M%C3%BCnchen"
```

**Follow-up:** add `sort()`, which orders entries by name and keeps the original order for entries with the same name.
