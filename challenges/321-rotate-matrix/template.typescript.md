```ts index.ts
/**
 Do not return anything, modify matrix in-place instead.
 */
export function rotate(matrix: number[][]): void {}
```

```ts index.test.ts
import { rotate } from "./index";

describe("rotate", () => {
  test("Example 1: 2x2 matrix", () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    rotate(matrix);
    expect(matrix).toEqual([
      [3, 1],
      [4, 2],
    ]);
  });

  test("Example 2: 3x3 matrix", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    rotate(matrix);
    expect(matrix).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ]);
  });

  test("1x1 matrix", () => {
    const matrix = [[1]];
    rotate(matrix);
    expect(matrix).toEqual([[1]]);
  });

  test("4x4 matrix", () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    rotate(matrix);
    expect(matrix).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ]);
  });

  test("Matrix with negative numbers", () => {
    const matrix = [
      [-1, -2],
      [-3, -4],
    ];
    rotate(matrix);
    expect(matrix).toEqual([
      [-3, -1],
      [-4, -2],
    ]);
  });

  test("Matrix with zeros", () => {
    const matrix = [
      [0, 0],
      [0, 0],
    ];
    rotate(matrix);
    expect(matrix).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  test("Matrix with same numbers", () => {
    const matrix = [
      [1, 1],
      [1, 1],
    ];
    rotate(matrix);
    expect(matrix).toEqual([
      [1, 1],
      [1, 1],
    ]);
  });

  test("5x5 matrix", () => {
    const matrix = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
    rotate(matrix);
    expect(matrix).toEqual([
      [21, 16, 11, 6, 1],
      [22, 17, 12, 7, 2],
      [23, 18, 13, 8, 3],
      [24, 19, 14, 9, 4],
      [25, 20, 15, 10, 5],
    ]);
  });
});
```
