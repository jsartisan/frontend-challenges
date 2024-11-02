```ts index.ts 
export function getSum(a: number, b: number): number {
  
}
```

```ts index.test.ts 
import { getSum } from './index';

describe('getSum', () => {
  test('Example 1: Small positive numbers', () => {
    expect(getSum(1, 1)).toBe(2);
  });

  test('Example 2: Larger positive numbers', () => {
    expect(getSum(4, 7)).toBe(11);
  });

  test('Zero and positive', () => {
    expect(getSum(0, 5)).toBe(5);
  });

  test('Zero and zero', () => {
    expect(getSum(0, 0)).toBe(0);
  });

  test('Negative and positive', () => {
    expect(getSum(-1, 2)).toBe(1);
  });

  test('Both negative', () => {
    expect(getSum(-5, -3)).toBe(-8);
  });

  test('Same numbers', () => {
    expect(getSum(3, 3)).toBe(6);
  });

  test('Large numbers', () => {
    expect(getSum(100, 200)).toBe(300);
  });

  test('Negative and zero', () => {
    expect(getSum(-7, 0)).toBe(-7);
  });

  test('Complex case', () => {
    expect(getSum(-14, 16)).toBe(2);
  });
});
```


