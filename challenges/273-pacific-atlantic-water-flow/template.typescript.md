```ts index.ts 
export function pacificAtlantic(heights: number[][]): number[][] {
  
}
```

```ts index.test.ts 
import { pacificAtlantic } from './index';

describe('pacificAtlantic', () => {
  // Helper function to compare arrays regardless of order
  function compareResults(actual: number[][], expected: number[][]): boolean {
    if (actual.length !== expected.length) return false;
    
    const stringify = (arr: number[][]) => 
      arr.map(coord => coord.join(',')).sort().join('|');
    
    return stringify(actual) === stringify(expected);
  }

  test('Example 1: Regular matrix', () => {
    const heights = [
      [4,2,7,3,4],
      [7,4,6,4,7],
      [6,3,5,3,6]
    ];
    const expected = [[0,2],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0]];
    expect(compareResults(pacificAtlantic(heights), expected)).toBe(true);
  });

  test('Example 2: Single column matrix', () => {
    const heights = [[1],[1]];
    const expected = [[0,0],[1,0]];
    expect(compareResults(pacificAtlantic(heights), expected)).toBe(true);
  });

  test('Single cell matrix', () => {
    const heights = [[5]];
    const expected = [[0,0]];
    expect(compareResults(pacificAtlantic(heights), expected)).toBe(true);
  });

  test('All cells with same height', () => {
    const heights = [
      [1,1,1],
      [1,1,1],
      [1,1,1]
    ];
    const expected = [
      [0,0],[0,1],[0,2],
      [1,0],[1,1],[1,2],
      [2,0],[2,1],[2,2]
    ];
    expect(compareResults(pacificAtlantic(heights), expected)).toBe(true);
  });

  test('Increasing heights from corner', () => {
    const heights = [
      [1,2,3],
      [2,3,4],
      [3,4,5]
    ];
    const expected = [
      [0,0],[0,1],[0,2],
      [1,0],[1,1],[1,2],
      [2,0],[2,1],[2,2]
    ];
    expect(compareResults(pacificAtlantic(heights), expected)).toBe(true);
  });

  test('Valley pattern', () => {
    const heights = [
      [3,3,3],
      [3,1,3],
      [3,3,3]
    ];
    const expected = [
      [0,0],[0,1],[0,2],
      [1,0],[1,2],
      [2,0],[2,1],[2,2]
    ];
    expect(compareResults(pacificAtlantic(heights), expected)).toBe(true);
  });

  test('Peak pattern', () => {
    const heights = [
      [1,2,1],
      [2,3,2],
      [1,2,1]
    ];
    const expected = [[1,1]];
    expect(compareResults(pacificAtlantic(heights), expected)).toBe(true);
  });
});
```


