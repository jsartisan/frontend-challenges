```ts index.ts 
export function longestConsecutive(nums: number[]): number {
  
}
```

```ts index.test.ts 
import { longestConsecutive } from './index';

describe('longestConsecutive', () => {
  test('Example 1: Basic sequence', () => {
    expect(longestConsecutive([2, 20, 4, 10, 3, 4, 5])).toBe(4);
  });

  test('Example 2: Sequence with duplicates', () => {
    expect(longestConsecutive([0, 3, 2, 5, 4, 6, 1, 1])).toBe(7);
  });

  test('Empty array', () => {
    expect(longestConsecutive([])).toBe(0);
  });

  test('Single element array', () => {
    expect(longestConsecutive([1])).toBe(1);
  });

  test('No consecutive sequence', () => {
    expect(longestConsecutive([2, 4, 6, 8])).toBe(1);
  });

  test('Negative numbers', () => {
    expect(longestConsecutive([-5, -4, -3, -2, 0, 1])).toBe(4);
  });
});
```


