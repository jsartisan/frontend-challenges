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
  test("sets a value at a dot-separated path", () => {
    const config = { server: { port: 3000 } };
    set(config, "server.port", 8080);

    expect(config).toEqual({ server: { port: 8080 } });
  });

  test("returns the same object it was given, mutated in place", () => {
    const target = { a: 1 };
    const result = set(target, "b", 2);

    expect(result).toBe(target);
    expect(target).toEqual({ a: 1, b: 2 });
  });

  test("creates missing objects along the way", () => {
    const state = {};
    set(state, "user.profile.name", "Ada");

    expect(state).toEqual({ user: { profile: { name: "Ada" } } });
  });

  test("supports bracket indices in a string path", () => {
    const data = { rows: [{ cells: ["x", "y"] }] };
    set(data, "rows[0].cells[1]", "z");

    expect(data.rows[0].cells).toEqual(["x", "z"]);
  });

  test("creates an array when the next key is an index", () => {
    const form: Record<string, any> = {};
    set(form, "tags[0]", "news");
    set(form, "contacts.1.email", "b@example.com");

    expect(Array.isArray(form.tags)).toBe(true);
    expect(form.tags).toEqual(["news"]);
    expect(Array.isArray(form.contacts)).toBe(true);
    expect(form.contacts[1]).toEqual({ email: "b@example.com" });
    expect(form.contacts.length).toBe(2);
  });

  test("creates an object when the next key only looks a bit like a number", () => {
    const out: Record<string, any> = {};
    set(out, "a.01", true);
    set(out, "b.-1", true);
    set(out, "c.1x", true);

    expect(Array.isArray(out.a)).toBe(false);
    expect(out.a).toEqual({ "01": true });
    expect(Array.isArray(out.b)).toBe(false);
    expect(Array.isArray(out.c)).toBe(false);
  });

  test("accepts an array path, where keys may contain dots", () => {
    const obj: Record<string, any> = {};
    set(obj, ["files", "report.pdf", "size"], 120);
    set(obj, ["list", 0, "id"], 7);

    expect(obj.files).toEqual({ "report.pdf": { size: 120 } });
    expect(obj.list).toEqual([{ id: 7 }]);
  });

  test("replaces a primitive or null that sits in the middle of the path", () => {
    const obj: Record<string, any> = { a: 5, b: null, c: "text" };
    set(obj, "a.x", 1);
    set(obj, "b.y", 2);
    set(obj, "c[0]", 3);

    expect(obj).toEqual({ a: { x: 1 }, b: { y: 2 }, c: [3] });
  });

  test("keeps existing siblings untouched", () => {
    const obj = { theme: { color: "red", size: "md" }, other: [1, 2] };
    const other = obj.other;
    set(obj, "theme.color", "blue");

    expect(obj).toEqual({ theme: { color: "blue", size: "md" }, other: [1, 2] });
    expect(obj.other).toBe(other);
  });

  test("can store undefined, null and objects as the value", () => {
    const obj: Record<string, any> = { a: 1 };
    const payload = { deep: true };
    set(obj, "a", undefined);
    set(obj, "b", null);
    set(obj, "c.d", payload);

    expect("a" in obj).toBe(true);
    expect(obj.a).toBeUndefined();
    expect(obj.b).toBeNull();
    expect(obj.c.d).toBe(payload);
  });

  test("does nothing for an empty path", () => {
    const obj = { a: 1 };

    expect(set(obj, "", 2)).toBe(obj);
    expect(set(obj, [], 2)).toBe(obj);
    expect(obj).toEqual({ a: 1 });
  });

  test("refuses paths that would reach a prototype", () => {
    const obj: Record<string, any> = {};
    set(obj, "__proto__.polluted", "yes");
    set(obj, ["constructor", "prototype", "polluted"], "yes");
    set(obj, "a.prototype.b", "yes");

    expect(({} as any).polluted).toBeUndefined();
    expect((Object.prototype as any).polluted).toBeUndefined();
    expect(obj).toEqual({});
  });
});
```


