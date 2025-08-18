```ts index.ts
export function maxSubArray(nums: number[]): number {}
```

```ts index.test.ts
import { maxSubArray } from "./index";

describe("maxSubArray", () => {
  test("Example 1: Mixed positive and negative", () => {
    expect(maxSubArray([2, -3, 4, -2, 2, 1, -1, 4])).toBe(8);
  });

  test("Example 2: Single negative number", () => {
    expect(maxSubArray([-1])).toBe(-1);
  });

  test("All positive numbers", () => {
    expect(maxSubArray([1, 2, 3, 4])).toBe(10);
  });

  test("All negative numbers", () => {
    expect(maxSubArray([-2, -3, -1, -4])).toBe(-1);
  });

  test("Single positive number", () => {
    expect(maxSubArray([5])).toBe(5);
  });

  test("Alternating positive and negative", () => {
    expect(maxSubArray([1, -1, 2, -2, 3])).toBe(3);
  });

  test("Zero included", () => {
    expect(maxSubArray([-2, 0, 3, -1, 4])).toBe(6);
  });

  test("Large negative followed by positives", () => {
    expect(maxSubArray([-10, 1, 2, 3, 4])).toBe(10);
  });

  test("Complex sequence", () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });

  test("Long sequence", () => {
    expect(maxSubArray([1, -1, 1, -1, 1, -1, 1, -1, 2])).toBe(2);
  });
});
```
