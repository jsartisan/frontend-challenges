```ts index.ts 
export function lengthOfLIS(nums: number[]): number {
  
}
```

```ts index.test.ts 
import { lengthOfLIS } from './index';

describe('lengthOfLIS', () => {
  test('Example 1: Mixed sequence', () => {
    expect(lengthOfLIS([9,1,4,2,3,3,7])).toBe(4);
  });

  test('Example 2: Multiple valid solutions', () => {
    expect(lengthOfLIS([0,3,1,3,2,3])).toBe(4);
  });

  test('Single element', () => {
    expect(lengthOfLIS([5])).toBe(1);
  });

  test('Already sorted', () => {
    expect(lengthOfLIS([1,2,3,4,5])).toBe(5);
  });

  test('Decreasing sequence', () => {
    expect(lengthOfLIS([5,4,3,2,1])).toBe(1);
  });

  test('All same numbers', () => {
    expect(lengthOfLIS([1,1,1,1])).toBe(1);
  });

  test('Two increasing numbers', () => {
    expect(lengthOfLIS([1,2])).toBe(2);
  });

  test('Complex sequence', () => {
    expect(lengthOfLIS([3,10,2,1,20])).toBe(3);
  });

  test('Sequence with negatives', () => {
    expect(lengthOfLIS([-2,-1,0,1])).toBe(4);
  });

  test('Long sequence', () => {
    expect(lengthOfLIS([1,3,6,7,9,4,10,5,6])).toBe(6);
  });
});
```


