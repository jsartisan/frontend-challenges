```ts index.ts
export function canJump(nums: number[]): boolean {}
```

```ts index.test.ts
import { canJump } from "./index";

describe("canJump", () => {
  test("Example 1: Can reach end", () => {
    expect(canJump([1, 2, 0, 1, 0])).toBe(true);
  });

  test("Example 2: Cannot reach end", () => {
    expect(canJump([1, 2, 1, 0, 1])).toBe(false);
  });

  test("Single element", () => {
    expect(canJump([0])).toBe(true);
  });

  test("All zeros except first", () => {
    expect(canJump([2, 0, 0])).toBe(true);
  });

  test("Need to use full jumps", () => {
    expect(canJump([3, 2, 1])).toBe(true);
  });

  test("Trapped by zero", () => {
    expect(canJump([1, 0, 1, 0])).toBe(false);
  });

  test("Multiple possible paths", () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true);
  });

  test("Exactly enough jumps", () => {
    expect(canJump([1, 1, 1, 1])).toBe(true);
  });

  test("Zero at start", () => {
    expect(canJump([0, 1, 1])).toBe(false);
  });

  test("Long sequence", () => {
    expect(canJump([2, 0, 2, 0, 4, 0, 0, 0, 4])).toBe(false);
  });
});
```
