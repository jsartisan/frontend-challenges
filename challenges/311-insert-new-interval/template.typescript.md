```ts index.ts
export function insert(intervals: number[][], newInterval: number[]): number[][] {}
```

```ts index.test.ts
import { insert } from "./index";

describe("insert", () => {
  test("Example 1: Merge overlapping intervals", () => {
    expect(
      insert(
        [
          [1, 3],
          [4, 6],
        ],
        [2, 5],
      ),
    ).toEqual([[1, 6]]);
  });

  test("Example 2: Insert between intervals", () => {
    expect(
      insert(
        [
          [1, 2],
          [3, 5],
          [9, 10],
        ],
        [6, 7],
      ),
    ).toEqual([
      [1, 2],
      [3, 5],
      [6, 7],
      [9, 10],
    ]);
  });

  test("Empty intervals array", () => {
    expect(insert([], [5, 7])).toEqual([[5, 7]]);
  });

  test("Insert at start", () => {
    expect(
      insert(
        [
          [3, 5],
          [6, 7],
        ],
        [1, 2],
      ),
    ).toEqual([
      [1, 2],
      [3, 5],
      [6, 7],
    ]);
  });

  test("Insert at end", () => {
    expect(
      insert(
        [
          [1, 2],
          [3, 5],
        ],
        [6, 8],
      ),
    ).toEqual([
      [1, 2],
      [3, 5],
      [6, 8],
    ]);
  });

  test("Complete overlap", () => {
    expect(insert([[1, 5]], [2, 3])).toEqual([[1, 5]]);
  });

  test("Multiple merges", () => {
    expect(
      insert(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [4, 8],
      ),
    ).toEqual([
      [1, 2],
      [3, 10],
      [12, 16],
    ]);
  });

  test("Exact match with existing interval", () => {
    expect(
      insert(
        [
          [1, 3],
          [6, 9],
        ],
        [6, 9],
      ),
    ).toEqual([
      [1, 3],
      [6, 9],
    ]);
  });

  test("Adjacent intervals", () => {
    expect(
      insert(
        [
          [1, 2],
          [3, 4],
        ],
        [2, 3],
      ),
    ).toEqual([[1, 4]]);
  });

  test("No overlap needed", () => {
    expect(
      insert(
        [
          [1, 2],
          [4, 5],
          [7, 8],
        ],
        [10, 11],
      ),
    ).toEqual([
      [1, 2],
      [4, 5],
      [7, 8],
      [10, 11],
    ]);
  });
});
```
