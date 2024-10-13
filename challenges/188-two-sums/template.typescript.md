```ts index.ts 
export function twoSum(nums: number[], target: number): number[] {
 // your implementation code
}
```

```ts index.test.ts 
import { twoSum } from './index';

describe('twoSum function', () => {
  test('Example 1', () => {
    const nums = [3, 4, 5, 6];
    const target = 7;
    expect(twoSum(nums, target)).toEqual([0, 1]);
  });

  test('Example 2', () => {
    const nums = [4, 5, 6];
    const target = 10;
    expect(twoSum(nums, target)).toEqual([0, 2]);
  });

  test('Example 3', () => {
    const nums = [5, 5];
    const target = 10;
    expect(twoSum(nums, target)).toEqual([0, 1]);
  });

  test('Negative numbers', () => {
    const nums = [-3, 4, 3, 90];
    const target = 0;
    expect(twoSum(nums, target)).toEqual([0, 2]);
  });

  test('Different number order', () => {
    const nums = [1, 5, 7, 3, 8];
    const target = 10;
    expect(twoSum(nums, target)).toEqual([1, 3]);
  });
});
```


