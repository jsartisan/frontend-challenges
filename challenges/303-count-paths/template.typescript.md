```ts index.ts
export function uniquePaths(m: number, n: number): number {}
```

```ts index.test.ts
import { uniquePaths } from "./index";

describe("uniquePaths", () => {
  test("Example 1: 3x6 grid", () => {
    expect(uniquePaths(3, 6)).toBe(21);
  });

  test("Example 2: 3x3 grid", () => {
    expect(uniquePaths(3, 3)).toBe(6);
  });

  test("1x1 grid", () => {
    expect(uniquePaths(1, 1)).toBe(1);
  });

  test("2x2 grid", () => {
    expect(uniquePaths(2, 2)).toBe(2);
  });

  test("1xN grid", () => {
    expect(uniquePaths(1, 5)).toBe(1);
  });

  test("Nx1 grid", () => {
    expect(uniquePaths(5, 1)).toBe(1);
  });

  test("4x4 grid", () => {
    expect(uniquePaths(4, 4)).toBe(20);
  });

  test("5x4 grid", () => {
    expect(uniquePaths(5, 4)).toBe(35);
  });

  test("Large square grid", () => {
    expect(uniquePaths(10, 10)).toBe(48620);
  });

  test("Large rectangular grid", () => {
    expect(uniquePaths(7, 8)).toBe(28);
  });
});
```
