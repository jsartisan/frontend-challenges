```ts index.ts
export function missingNumber(nums: number[]): number {}
```

```ts index.test.ts
import { missingNumber } from "./index";

describe("missingNumber", () => {
  test("Example 1: Missing first number", () => {
    expect(missingNumber([1, 2, 3])).toBe(0);
  });

  test("Example 2: Missing middle number", () => {
    expect(missingNumber([0, 2])).toBe(1);
  });

  test("Single element missing 0", () => {
    expect(missingNumber([1])).toBe(0);
  });

  test("Single element missing 1", () => {
    expect(missingNumber([0])).toBe(1);
  });

  test("Missing last number", () => {
    expect(missingNumber([0, 1, 2])).toBe(3);
  });

  test("Larger sequence", () => {
    expect(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])).toBe(8);
  });

  test("Missing middle in larger sequence", () => {
    expect(missingNumber([0, 1, 2, 3, 5, 6, 7, 8, 9])).toBe(4);
  });

  test("Unordered sequence", () => {
    expect(missingNumber([3, 0, 1])).toBe(2);
  });

  test("All but last", () => {
    expect(missingNumber([0, 1, 2, 3, 4])).toBe(5);
  });

  test("Complex unordered sequence", () => {
    expect(missingNumber([5, 3, 2, 1, 0, 7, 6, 4, 9])).toBe(8);
  });
});
```
