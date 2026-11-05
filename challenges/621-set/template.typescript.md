```ts index.ts 
export function set<T extends object>(
  object: T,
  path: string | Array<string | number>,
  value: unknown
): T {}
```

```ts index.test.ts 
import { set } from "./index";

describe("set", () => {
  test("writes a value at a dot path and returns the same object", () => {
    const config = { theme: { color: "blue" } };
    const result = set(config, "theme.color", "green");

    expect(result).toBe(config);
    expect(config).toEqual({ theme: { color: "green" } });
  });

  test("accepts bracket indexes in a string path", () => {
    const state = { todos: [{ done: false }, { done: false }] };
    set(state, "todos[1].done", true);

    expect(state.todos).toEqual([{ done: false }, { done: true }]);
  });

  test("accepts an array path, where keys may contain dots", () => {
    const headers: Record<string, unknown> = {};
    set(headers, ["x.request.id", "value"], "abc");
    set(headers, ["list", 0], "first");

    expect(headers).toEqual({ "x.request.id": { value: "abc" }, list: ["first"] });
  });

  test("creates missing objects along the way", () => {
    const obj: any = {};
    set(obj, "user.profile.name", "Mei");

    expect(obj).toEqual({ user: { profile: { name: "Mei" } } });
  });

  test("creates an array when the next key is an index", () => {
    const obj: any = {};
    set(obj, "grid[0][2]", "x");
    set(obj, "rows.1.cells", []);

    expect(Array.isArray(obj.grid)).toBe(true);
    expect(Array.isArray(obj.grid[0])).toBe(true);
    expect(obj.grid[0][2]).toBe("x");
    expect(Array.isArray(obj.rows)).toBe(true);
    expect(obj.rows[1]).toEqual({ cells: [] });
  });

  test("only whole non-negative integers count as indexes", () => {
    const obj: any = {};
    set(obj, "a.01", 1);
    set(obj, "b.-1", 2);
    set(obj, "c.1.x", 3);

    expect(Array.isArray(obj.a)).toBe(false);
    expect(Array.isArray(obj.b)).toBe(false);
    expect(Array.isArray(obj.c)).toBe(true);
    expect(obj).toEqual({ a: { "01": 1 }, b: { "-1": 2 }, c: [undefined, { x: 3 }] });
  });

  test("keeps existing siblings untouched", () => {
    const obj = { a: { keep: 1, list: [10, 20] } };
    set(obj, "a.list[1]", 99);
    set(obj, "a.extra", true);

    expect(obj).toEqual({ a: { keep: 1, list: [10, 99], extra: true } });
  });

  test("replaces primitives and null that sit in the middle of the path", () => {
    const obj: any = { a: 5, b: null, c: "text" };
    set(obj, "a.x", 1);
    set(obj, "b[0]", 2);
    set(obj, "c.d.e", 3);

    expect(obj).toEqual({ a: { x: 1 }, b: [2], c: { d: { e: 3 } } });
  });

  test("can store undefined, null and objects as the value", () => {
    const obj: any = { a: 1 };
    const nested = { deep: true };
    set(obj, "a", undefined);
    set(obj, "b", null);
    set(obj, "c", nested);

    expect("a" in obj).toBe(true);
    expect(obj.a).toBeUndefined();
    expect(obj.b).toBeNull();
    expect(obj.c).toBe(nested);
  });

  test("does nothing for an empty path", () => {
    const obj = { a: 1 };

    expect(set(obj, "", 2)).toBe(obj);
    expect(set(obj, [], 2)).toBe(obj);
    expect(obj).toEqual({ a: 1 });
  });

  test("refuses to write through __proto__, constructor or prototype", () => {
    const obj: any = {};
    set(obj, "__proto__.polluted", "yes");
    set(obj, ["constructor", "prototype", "polluted"], "yes");
    set(obj, "a.__proto__.polluted", "yes");

    expect(({} as any).polluted).toBeUndefined();
    expect(Object.prototype.hasOwnProperty("polluted")).toBe(false);
    expect(obj.a).toBeUndefined();
  });
});
```


