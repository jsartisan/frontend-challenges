```ts index.ts 
export function productExceptSelf(nums: number[]): number[] {
    
}
```

```ts index.test.ts 
import { productExceptSelf } from './index';

describe('productExceptSelf', () => {
  test('Example 1: Basic positive numbers', () => {
    expect(productExceptSelf([1, 2, 4, 6]))
      .toEqual([48, 24, 12, 8]);
  });

  test('Example 2: Array with zero', () => {
    expect(productExceptSelf([-1, 0, 1, 2, 3]))
      .toEqual([0, -6, 0, 0, 0]);
  });

  test('Array with two elements', () => {
    expect(productExceptSelf([2, 3]))
      .toEqual([3, 2]);
  });

  test('Array with negative numbers', () => {
    expect(productExceptSelf([-2, -3, -4]))
      .toEqual([12, 8, 6]);
  });

  test('Array with multiple zeros', () => {
    expect(productExceptSelf([0, 0, 2]))
      .toEqual([0, 0, 0]);
  });
});
```


