```ts index.ts
export function spiralOrder(matrix: number[][]): number[] {}
```

```ts index.test.ts
import { spiralOrder } from "./index";

describe("spiralOrder", () => {
  test("Example 1: 2x2 matrix", () => {
    expect(
      spiralOrder([
        [1, 2],
        [3, 4],
      ]),
    ).toEqual([1, 2, 4, 3]);
  });

  test("Example 2: 3x3 matrix", () => {
    expect(
      spiralOrder([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]),
    ).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
  });

  test("Example 3: 3x4 matrix", () => {
    expect(
      spiralOrder([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ]),
    ).toEqual([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
  });

  test("1x1 matrix", () => {
    expect(spiralOrder([[7]])).toEqual([7]);
  });

  test("1xn matrix", () => {
    expect(spiralOrder([[1, 2, 3]])).toEqual([1, 2, 3]);
  });

  test("nx1 matrix", () => {
    expect(spiralOrder([[1], [2], [3]])).toEqual([1, 2, 3]);
  });

  test("4x4 matrix", () => {
    expect(
      spiralOrder([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ]),
    ).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  });

  test("Matrix with negative numbers", () => {
    expect(
      spiralOrder([
        [-1, -2],
        [-3, -4],
      ]),
    ).toEqual([-1, -2, -4, -3]);
  });

  test("2x3 matrix", () => {
    expect(
      spiralOrder([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ).toEqual([1, 2, 3, 6, 5, 4]);
  });

  test("3x2 matrix", () => {
    expect(
      spiralOrder([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toEqual([1, 2, 4, 6, 5, 3]);
  });
});
```
