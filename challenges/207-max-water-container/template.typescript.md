```ts index.ts
export function maxArea(height: number[]): number {}
```

```ts index.test.ts
import { maxArea } from "./index";

describe("maxArea", () => {
  test("Example 1: Regular case", () => {
    expect(maxArea([1, 7, 2, 5, 4, 7, 3, 6])).toBe(36);
  });

  test("Example 2: All same height", () => {
    expect(maxArea([2, 2, 2])).toBe(4);
  });

  test("Minimum length array", () => {
    expect(maxArea([1, 2])).toBe(1);
  });

  test("Increasing heights", () => {
    expect(maxArea([1, 2, 3, 4, 5])).toBe(6);
  });

  test("Decreasing heights", () => {
    expect(maxArea([5, 4, 3, 2, 1])).toBe(6);
  });

  test("Zero height included", () => {
    expect(maxArea([0, 7, 0, 7])).toBe(14);
  });

  test("Large difference in heights", () => {
    expect(maxArea([1, 1000, 1, 1000, 1])).toBe(3000);
  });
});
```
