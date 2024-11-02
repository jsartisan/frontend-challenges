```ts index.ts 
export function merge(intervals: number[][]): number[][] {
  
}
```

```ts index.test.ts 
import { merge } from './index';

describe('merge', () => {
  // Helper function to check if intervals are equivalent regardless of order
  function areIntervalsEqual(arr1: number[][], arr2: number[][]): boolean {
    if (arr1.length !== arr2.length) return false;
    
    const sort = (arr: number[][]) => 
      arr.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    
    const sorted1 = sort(arr1);
    const sorted2 = sort(arr2);
    
    return sorted1.every((interval, i) => 
      interval[0] === sorted2[i][0] && interval[1] === sorted2[i][1]
    );
  }

  test('Example 1: Multiple overlapping intervals', () => {
    expect(areIntervalsEqual(merge([[1,3],[1,5],[6,7]]), [[1,5],[6,7]])).toBe(true);
  });

  test('Example 2: Adjacent intervals', () => {
    expect(areIntervalsEqual(merge([[1,2],[2,3]]), [[1,3]])).toBe(true);
  });

  test('Single interval', () => {
    expect(areIntervalsEqual(merge([[1,2]]), [[1,2]])).toBe(true);
  });

  test('No overlap needed', () => {
    expect(areIntervalsEqual(merge([[1,2],[4,5],[7,8]]), [[1,2],[4,5],[7,8]])).toBe(true);
  });

  test('Complete overlap', () => {
    expect(areIntervalsEqual(merge([[1,4],[2,3]]), [[1,4]])).toBe(true);
  });

  test('Multiple merges needed', () => {
    expect(areIntervalsEqual(merge([[1,4],[4,5],[2,3],[3,6]]), [[1,6]])).toBe(true);
  });

  test('Overlapping with gaps', () => {
    expect(areIntervalsEqual(merge([[1,3],[2,6],[8,10],[15,18]]), [[1,6],[8,10],[15,18]])).toBe(true);
  });

  test('All intervals overlap', () => {
    expect(areIntervalsEqual(merge([[1,5],[2,4],[3,6]]), [[1,6]])).toBe(true);
  });

  test('Complex overlapping', () => {
    expect(areIntervalsEqual(merge([[1,3],[2,6],[8,10],[9,11],[15,18]]), [[1,6],[8,11],[15,18]])).toBe(true);
  });

  test('Exact same intervals', () => {
    expect(areIntervalsEqual(merge([[1,2],[1,2]]), [[1,2]])).toBe(true);
  });
});
```


