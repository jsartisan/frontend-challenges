```ts index.ts 
export function hasDuplicate(nums: number[]): boolean {
  // Your implementation here
}
```

```ts index.test.ts 
import { hasDuplicate } from './index';

describe('hasDuplicate function', () => {
  test('should return true when there are duplicate values', () => {
    const nums = [1, 2, 3, 3];
    expect(hasDuplicate(nums)).toBe(true);
  });

  test('should return false when all elements are unique', () => {
    const nums = [1, 2, 3, 4];
    expect(hasDuplicate(nums)).toBe(false);
  });

  test('should return false for an empty array', () => {
    const nums: number[] = [];
    expect(hasDuplicate(nums)).toBe(false);
  });

  test('should return true for an array with all duplicate elements', () => {
    const nums = [1, 1, 1, 1];
    expect(hasDuplicate(nums)).toBe(true);
  });

  test('should return false for an array with a single element', () => {
    const nums = [42];
    expect(hasDuplicate(nums)).toBe(false);
  });
});
```


