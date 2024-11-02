```ts index.ts 
export function rob(nums: number[]): number {
  
}
```

```ts index.test.ts 
import { rob } from './index';

describe('rob', () => {
  test('Example 1: Four houses', () => {
    expect(rob([1,1,3,3])).toBe(4);
  });

  test('Example 2: Five houses', () => {
    expect(rob([2,9,8,3,6])).toBe(16);
  });

  test('Single house', () => {
    expect(rob([5])).toBe(5);
  });

  test('Two houses', () => {
    expect(rob([3,1])).toBe(3);
  });

  test('Three houses', () => {
    expect(rob([2,1,1])).toBe(2);
  });

  test('All zeros', () => {
    expect(rob([0,0,0,0])).toBe(0);
  });

  test('Alternating values', () => {
    expect(rob([1,5,1,5])).toBe(10);
  });

  test('Increasing values', () => {
    expect(rob([1,2,3,4,5])).toBe(9);
  });

  test('Decreasing values', () => {
    expect(rob([5,4,3,2,1])).toBe(9);
  });

  test('Long sequence', () => {
    expect(rob([1,2,3,1,2,3,1,2,3])).toBe(12);
  });
});
```


