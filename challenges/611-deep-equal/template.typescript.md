```ts index.ts 
export function deepEqual(a: unknown, b: unknown): boolean {}
```

```ts index.test.ts 
import { deepEqual } from "./index";

describe("deepEqual", () => {
  test("compares primitives by value", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("hi", "hi")).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);

    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual(1, "1")).toBe(false);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(0, false)).toBe(false);
  });

  test("treats NaN as equal to NaN and 0 as equal to -0", () => {
    expect(deepEqual(NaN, NaN)).toBe(true);
    expect(deepEqual(0, -0)).toBe(true);
    expect(deepEqual({ score: NaN }, { score: NaN })).toBe(true);
  });

  test("compares nested plain objects regardless of key order", () => {
    const left = { id: 3, user: { name: "Lin", roles: ["admin", "editor"] } };
    const right = { user: { roles: ["admin", "editor"], name: "Lin" }, id: 3 };

    expect(deepEqual(left, right)).toBe(true);
    expect(deepEqual(left, { ...right, id: 4 })).toBe(false);
    expect(deepEqual(left, { id: 3, user: { name: "Lin", roles: ["admin"] } })).toBe(false);
  });

  test("objects must have exactly the same keys", () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(deepEqual({ a: undefined }, {})).toBe(false);
    expect(deepEqual({}, { a: undefined })).toBe(false);
  });

  test("compares arrays by length and position", () => {
    expect(deepEqual([1, [2, [3]]], [1, [2, [3]]])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(deepEqual([1, 2], [2, 1])).toBe(false);
    expect(deepEqual([], [])).toBe(true);
  });

  test("an array is never equal to a plain object", () => {
    expect(deepEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
    expect(deepEqual({ 0: 1, 1: 2 }, [1, 2])).toBe(false);
    expect(deepEqual([], {})).toBe(false);
  });

  test("compares Dates by their time value", () => {
    expect(deepEqual(new Date(2024, 0, 1), new Date(2024, 0, 1))).toBe(true);
    expect(deepEqual(new Date(2024, 0, 1), new Date(2024, 0, 2))).toBe(false);
    expect(deepEqual(new Date(0), 0)).toBe(false);
    expect(deepEqual({ at: new Date(5) }, { at: new Date(5) })).toBe(true);
  });

  test("compares RegExps by source and flags", () => {
    expect(deepEqual(/ab+c/gi, /ab+c/gi)).toBe(true);
    expect(deepEqual(/ab+c/g, /ab+c/i)).toBe(false);
    expect(deepEqual(/a/, /b/)).toBe(false);
  });

  test("compares Maps by keys and deeply compared values", () => {
    const a = new Map<string, unknown>([["x", { n: 1 }], ["y", [1, 2]]]);
    const b = new Map<string, unknown>([["y", [1, 2]], ["x", { n: 1 }]]);
    const c = new Map<string, unknown>([["x", { n: 2 }], ["y", [1, 2]]]);

    expect(deepEqual(a, b)).toBe(true);
    expect(deepEqual(a, c)).toBe(false);
    expect(deepEqual(a, new Map([["x", { n: 1 }]]))).toBe(false);
  });

  test("compares Sets by membership", () => {
    expect(deepEqual(new Set([1, 2, 3]), new Set([3, 2, 1]))).toBe(true);
    expect(deepEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false);
    expect(deepEqual(new Set([1]), new Set([1, 2]))).toBe(false);
  });

  test("values with different prototypes are not equal", () => {
    class Point {
      constructor(public x: number, public y: number) {}
    }

    expect(deepEqual(new Point(1, 2), new Point(1, 2))).toBe(true);
    expect(deepEqual(new Point(1, 2), { x: 1, y: 2 })).toBe(false);
    expect(deepEqual(new Map(), {})).toBe(false);
    expect(deepEqual(new Set(), [])).toBe(false);
  });

  test("compares functions by reference", () => {
    const fn = () => 1;

    expect(deepEqual({ onClick: fn }, { onClick: fn })).toBe(true);
    expect(deepEqual({ onClick: fn }, { onClick: () => 1 })).toBe(false);
  });

  test("handles circular references without overflowing the stack", () => {
    const a: any = { name: "node", children: [] };
    a.self = a;
    a.children.push(a);

    const b: any = { name: "node", children: [] };
    b.self = b;
    b.children.push(b);

    expect(deepEqual(a, b)).toBe(true);

    const c: any = { name: "other", children: [] };
    c.self = c;
    c.children.push(c);

    expect(deepEqual(a, c)).toBe(false);
  });
});
```


