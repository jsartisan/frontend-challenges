```ts index.ts 
/**
 * Creates a deep clone of plain objects, arrays, and primitives.
 */
export function deepClone<T>(value: T): T {
  // TODO: Implement me
  return value as T;
}
```

```ts index.test.ts 
import { deepClone } from "./index";

describe("deepClone", () => {
  it("clones nested objects independently", () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = deepClone(obj);
    copy.b.c = 42;
    expect(obj.b.c).toBe(2);
    expect(copy.b.c).toBe(42);
  });

  it("clones arrays deeply", () => {
    const arr = [1, [2, 3]];
    const copy = deepClone(arr);
    (copy[1] as number[])[0] = 99;
    expect((arr[1] as number[])[0]).toBe(2);
  });

  it("returns primitives unchanged", () => {
    expect(deepClone(123)).toBe(123);
    expect(deepClone("abc")).toBe("abc");
  });

  it("leaves unsupported types by reference", () => {
    const date = new Date();
    const fn = () => 1;
    expect(deepClone(date)).toBe(date);
    expect(deepClone(fn)).toBe(fn);
  });
});
```


