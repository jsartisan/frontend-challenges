```ts index.ts
export function climbStairs(n: number): number {}
```

```ts index.test.ts
import { climbStairs } from "./index";

describe("climbStairs", () => {
  test("Example 1: n = 2", () => {
    expect(climbStairs(2)).toBe(2);
  });

  test("Example 2: n = 3", () => {
    expect(climbStairs(3)).toBe(3);
  });

  test("Single step", () => {
    expect(climbStairs(1)).toBe(1);
  });

  test("Four steps", () => {
    expect(climbStairs(4)).toBe(5);
  });

  test("Five steps", () => {
    expect(climbStairs(5)).toBe(8);
  });

  test("Six steps", () => {
    expect(climbStairs(6)).toBe(13);
  });

  test("Ten steps", () => {
    expect(climbStairs(10)).toBe(89);
  });

  test("Edge case: minimum input", () => {
    expect(climbStairs(1)).toBe(1);
  });

  test("Medium size input", () => {
    expect(climbStairs(15)).toBe(987);
  });

  test("Large input within constraints", () => {
    expect(climbStairs(25)).toBe(75025);
  });
});
```
