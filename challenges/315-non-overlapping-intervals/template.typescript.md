```ts index.ts
export function eraseOverlapIntervals(intervals: number[][]): number {}
```

```ts index.test.ts
import { eraseOverlapIntervals } from "./index";

describe("eraseOverlapIntervals", () => {
  test("Example 1: One removal needed", () => {
    expect(
      eraseOverlapIntervals([
        [1, 2],
        [2, 4],
        [1, 4],
      ]),
    ).toBe(1);
  });

  test("Example 2: No removal needed", () => {
    expect(
      eraseOverlapIntervals([
        [1, 2],
        [2, 4],
      ]),
    ).toBe(0);
  });

  test("Single interval", () => {
    expect(eraseOverlapIntervals([[1, 2]])).toBe(0);
  });

  test("All overlapping", () => {
    expect(
      eraseOverlapIntervals([
        [1, 2],
        [1, 2],
        [1, 2],
      ]),
    ).toBe(2);
  });

  test("Multiple overlaps", () => {
    expect(
      eraseOverlapIntervals([
        [1, 4],
        [2, 3],
        [3, 4],
        [1, 2],
      ]),
    ).toBe(1);
  });

  test("No overlaps", () => {
    expect(
      eraseOverlapIntervals([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toBe(0);
  });

  test("Complex overlapping", () => {
    expect(
      eraseOverlapIntervals([
        [1, 5],
        [2, 3],
        [3, 4],
        [4, 5],
      ]),
    ).toBe(1);
  });

  test("Negative intervals", () => {
    expect(
      eraseOverlapIntervals([
        [-3, -2],
        [-2, -1],
        [-1, 0],
      ]),
    ).toBe(0);
  });

  test("Mixed positive and negative", () => {
    expect(
      eraseOverlapIntervals([
        [-1, 1],
        [0, 2],
        [1, 3],
        [2, 4],
      ]),
    ).toBe(1);
  });

  test("Large intervals", () => {
    expect(
      eraseOverlapIntervals([
        [1, 100],
        [2, 3],
        [4, 5],
      ]),
    ).toBe(1);
  });
});
```
