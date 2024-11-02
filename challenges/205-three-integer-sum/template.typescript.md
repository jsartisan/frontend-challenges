```ts index.ts 
export function threeSum(nums: number[]): number[][] {
  
}
```

```ts index.test.ts 
import { threeSum } from './index';

describe('threeSum', () => {
  test('Example 1: Multiple valid triplets', () => {
    const result = threeSum([-1, 0, 1, 2, -1, -4]);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([-1, -1, 2]);
    expect(result).toContainEqual([-1, 0, 1]);
  });

  test('Example 2: No valid triplets', () => {
    expect(threeSum([0, 1, 1])).toEqual([]);
  });

  test('Example 3: All zeros', () => {
    expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  test('Array with duplicates', () => {
    const result = threeSum([-2, 0, 1, 1, 2]);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([-2, 0, 2]);
    expect(result).toContainEqual([-2, 1, 1]);
  });

  test('Minimum length array', () => {
    expect(threeSum([1, 2, -3])).toEqual([[1, 2, -3]].filter(triplet => 
      triplet.reduce((a, b) => a + b, 0) === 0
    ));
  });

  test('Array with negative numbers', () => {
    const result = threeSum([-1, -1, -1, 2, 2, 2]);
    expect(result).toContainEqual([-1, -1, 2]);
  });
});
```


