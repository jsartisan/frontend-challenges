```ts index.ts 
export function findMin(nums: number[]): number {
  
}
```

```ts index.test.ts 
import { findMin } from './index';

describe('findMin', () => {
  test('Example 1: Regular rotated array', () => {
    expect(findMin([3, 4, 5, 6, 1, 2])).toBe(1);
  });

  test('Example 2: Array with zero', () => {
    expect(findMin([4, 5, 0, 1, 2, 3])).toBe(0);
  });

  test('Example 3: Not rotated array', () => {
    expect(findMin([4, 5, 6, 7])).toBe(4);
  });

  test('Single element array', () => {
    expect(findMin([1])).toBe(1);
  });

  test('Two element array', () => {
    expect(findMin([2, 1])).toBe(1);
  });

  test('Array rotated n times', () => {
    expect(findMin([1, 2, 3, 4, 5])).toBe(1);
  });

  test('Array with negative numbers', () => {
    expect(findMin([2, 3, -2, -1, 0, 1])).toBe(-2);
  });
});
```


