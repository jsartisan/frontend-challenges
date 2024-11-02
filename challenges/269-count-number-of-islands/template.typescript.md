```ts index.ts 
export function numIslands(grid: string[][]): number {
  
}
```

```ts index.test.ts 
import { numIslands } from './index';

describe('numIslands', () => {
  test('Example 1: Single island', () => {
    const grid = [
      ["0","1","1","1","0"],
      ["0","1","0","1","0"],
      ["1","1","0","0","0"],
      ["0","0","0","0","0"]
    ];
    expect(numIslands(grid)).toBe(1);
  });

  test('Example 2: Multiple islands', () => {
    const grid = [
      ["1","1","0","0","1"],
      ["1","1","0","0","1"],
      ["0","0","1","0","0"],
      ["0","0","0","1","1"]
    ];
    expect(numIslands(grid)).toBe(4);
  });

  test('No islands', () => {
    const grid = [
      ["0","0","0"],
      ["0","0","0"],
      ["0","0","0"]
    ];
    expect(numIslands(grid)).toBe(0);
  });

  test('All lands', () => {
    const grid = [
      ["1","1","1"],
      ["1","1","1"],
      ["1","1","1"]
    ];
    expect(numIslands(grid)).toBe(1);
  });

  test('Single cell island', () => {
    const grid = [
      ["1","0","1"],
      ["0","1","0"],
      ["1","0","1"]
    ];
    expect(numIslands(grid)).toBe(5);
  });

  test('Diagonal lands', () => {
    const grid = [
      ["1","0","0"],
      ["0","1","0"],
      ["0","0","1"]
    ];
    expect(numIslands(grid)).toBe(3);
  });

  test('Complex shape island', () => {
    const grid = [
      ["1","1","0","0","0"],
      ["1","1","0","0","0"],
      ["0","0","1","0","0"],
      ["0","0","0","1","1"]
    ];
    expect(numIslands(grid)).toBe(3);
  });

  test('Single row', () => {
    const grid = [["1","0","1","0","1"]];
    expect(numIslands(grid)).toBe(3);
  });

  test('Single column', () => {
    const grid = [
      ["1"],
      ["0"],
      ["1"],
      ["0"]
    ];
    expect(numIslands(grid)).toBe(2);
  });
});
```


