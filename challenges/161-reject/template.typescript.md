```ts index.ts
export function reject<T>(
  array: Array<T>,
  predicate: (value: T, index: number, array: Array<T>) => boolean,
): Array<T> {}
```

```ts index.test.ts
import { reject } from "./index";

describe("reject function", () => {
  test("should exclude elements for which the predicate returns truthy", () => {
    const arr = [1, 2, 3, 4, 5];
    const isEven = (num: number) => num % 2 === 0;
    const result = reject(arr, isEven);
    expect(result).toEqual([1, 3, 5]);
  });

  test("should return an empty array if all elements are rejected", () => {
    const arr = [2, 4, 6, 8];
    const isEven = (num: number) => num % 2 === 0;
    const result = reject(arr, isEven);
    expect(result).toEqual([]);
  });

  test("should return the original array if no elements are rejected", () => {
    const arr = [1, 3, 5, 7];
    const isEven = (num: number) => num % 2 === 0;
    const result = reject(arr, isEven);
    expect(result).toEqual(arr);
  });

  test("should handle an empty array", () => {
    const arr: number[] = [];
    const isEven = (num: number) => num % 2 === 0;
    const result = reject(arr, isEven);
    expect(result).toEqual([]);
  });

  test("should handle an array with mixed types", () => {
    const arr = [1, "2", 3, "4", 5];
    const isString = (value: any) => typeof value === "string";
    const result = reject(arr, isString);
    expect(result).toEqual([1, 3, 5]);
  });
});
```
