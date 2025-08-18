```ts index.ts
export function maxProduct(nums: number[]): number {}
```

```ts index.test.ts
import { maxProduct } from "./index";

describe("maxProduct", () => {
  test("Example 1: Mixed positive and negative", () => {
    expect(maxProduct([1, 2, -3, 4])).toBe(4);
  });

  test("Example 2: All negative", () => {
    expect(maxProduct([-2, -1])).toBe(2);
  });

  test("Single element", () => {
    expect(maxProduct([5])).toBe(5);
  });

  test("All positive", () => {
    expect(maxProduct([1, 2, 3, 4])).toBe(24);
  });

  test("Contains zero", () => {
    expect(maxProduct([2, 3, 0, 4])).toBe(6);
  });

  test("Multiple zeros", () => {
    expect(maxProduct([2, 0, 3, 0, 4])).toBe(4);
  });

  test("Negative numbers with zero", () => {
    expect(maxProduct([-2, 0, -1])).toBe(0);
  });

  test("All negative numbers", () => {
    expect(maxProduct([-1, -2, -3, -4])).toBe(24);
  });

  test("Mixed with larger numbers", () => {
    expect(maxProduct([-2, 3, -4])).toBe(24);
  });

  test("Complex sequence", () => {
    expect(maxProduct([-2, 3, -2, 4, -1])).toBe(48);
  });
});
```
