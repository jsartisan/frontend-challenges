```ts index.ts 
/**
 Do not return anything, modify matrix in-place instead.
 */
export function setZeroes(matrix: number[][]): void {
  
}
```

```ts index.test.ts 
import { setZeroes } from './index';

describe('setZeroes', () => {
  test('Example 1: 2x2 matrix with zero', () => {
    const matrix = [[0,1],[1,1]];
    setZeroes(matrix);
    expect(matrix).toEqual([[0,0],[0,1]]);
  });

  test('Example 2: 3x3 matrix with zero', () => {
    const matrix = [[1,2,3],[4,0,5],[6,7,8]];
    setZeroes(matrix);
    expect(matrix).toEqual([[1,0,3],[0,0,0],[6,0,8]]);
  });

  test('1x1 matrix', () => {
    const matrix = [[1]];
    setZeroes(matrix);
    expect(matrix).toEqual([[1]]);
  });

  test('Matrix with no zeros', () => {
    const matrix = [[1,2],[3,4]];
    setZeroes(matrix);
    expect(matrix).toEqual([[1,2],[3,4]]);
  });

  test('Matrix with all zeros', () => {
    const matrix = [[0,0],[0,0]];
    setZeroes(matrix);
    expect(matrix).toEqual([[0,0],[0,0]]);
  });

  test('Matrix with multiple zeros', () => {
    const matrix = [[1,0,1],[1,1,1],[1,0,1]];
    setZeroes(matrix);
    expect(matrix).toEqual([[0,0,0],[1,0,1],[0,0,0]]);
  });

  test('Rectangular matrix', () => {
    const matrix = [[1,2,3],[4,0,6]];
    setZeroes(matrix);
    expect(matrix).toEqual([[1,0,3],[0,0,0]]);
  });

  test('Large matrix', () => {
    const matrix = [
      [1,2,3,4],
      [5,0,7,8],
      [9,10,11,12],
      [13,14,0,16]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual([
      [1,0,0,4],
      [0,0,0,0],
      [9,0,0,12],
      [0,0,0,0]
    ]);
  });

  test('Matrix with negative numbers', () => {
    const matrix = [[-1,2,0],[-4,-5,-6],[7,8,9]];
    setZeroes(matrix);
    expect(matrix).toEqual([[0,0,0],[-4,0,0],[7,8,0]]);
  });

  test('Single row matrix', () => {
    const matrix = [[1,0,3]];
    setZeroes(matrix);
    expect(matrix).toEqual([[0,0,0]]);
  });
});
```


