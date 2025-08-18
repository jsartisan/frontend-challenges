```ts index.ts
export function search(nums: number[], target: number): number {}
```

```ts index.test.ts
import { search } from "./index";

describe("search", () => {
  test("Example 1: Target exists in array", () => {
    expect(search([3, 4, 5, 6, 1, 2], 1)).toBe(4);
  });

  test("Example 2: Target does not exist", () => {
    expect(search([3, 5, 6, 0, 1, 2], 4)).toBe(-1);
  });

  test("Single element array with target", () => {
    expect(search([1], 1)).toBe(0);
  });

  test("Single element array without target", () => {
    expect(search([1], 2)).toBe(-1);
  });

  test("Not rotated array", () => {
    expect(search([1, 2, 3, 4, 5], 3)).toBe(2);
  });

  test("Target at start", () => {
    expect(search([5, 1, 2, 3, 4], 5)).toBe(0);
  });

  test("Target at end", () => {
    expect(search([3, 4, 5, 1, 2], 2)).toBe(4);
  });

  test("Array with negative numbers", () => {
    expect(search([2, 3, -2, -1, 0, 1], -2)).toBe(2);
  });
});
```
