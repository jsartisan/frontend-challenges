```ts index.ts 
/**
 * Creates a deep clone of the provided value.
 */
export function deepClone<T>(value: T): T {
  // TODO: Implement me
  return value;
}
```

```ts index.test.ts 
import { deepClone } from "./index";

describe("deepClone", () => {
  it("clones nested objects and keeps structure independent", () => {
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

  it("clones Date and RegExp instances", () => {
    const date = new Date();
    const regex = /hello/gi;
    const copy = deepClone({ date, regex });

    expect(copy.date).not.toBe(date);
    expect(copy.date.getTime()).toBe(date.getTime());

    expect(copy.regex).not.toBe(regex);
    expect(copy.regex.source).toBe(regex.source);
    expect(copy.regex.flags).toBe(regex.flags);
  });

  it("returns primitives unchanged", () => {
    expect(deepClone(123)).toBe(123);
    expect(deepClone("abc")).toBe("abc");
  });
});
```


