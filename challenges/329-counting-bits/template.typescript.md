```ts index.ts 
export function countBits(n: number): number[] {
  
}
```

```ts index.test.ts 
import { countBits } from './index';

describe('countBits', () => {
  test('Example 1: n = 4', () => {
    expect(countBits(4)).toEqual([0,1,1,2,1]);
  });

  test('n = 0', () => {
    expect(countBits(0)).toEqual([0]);
  });

  test('n = 1', () => {
    expect(countBits(1)).toEqual([0,1]);
  });

  test('n = 2', () => {
    expect(countBits(2)).toEqual([0,1,1]);
  });

  test('n = 5', () => {
    expect(countBits(5)).toEqual([0,1,1,2,1,2]);
  });

  test('n = 7', () => {
    expect(countBits(7)).toEqual([0,1,1,2,1,2,2,3]);
  });

  test('n = 8', () => {
    expect(countBits(8)).toEqual([0,1,1,2,1,2,2,3,1]);
  });

  test('n = 10', () => {
    expect(countBits(10)).toEqual([0,1,1,2,1,2,2,3,1,2,2]);
  });

  test('n = 15', () => {
    expect(countBits(15)).toEqual([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4]);
  });

  test('n = 16', () => {
    expect(countBits(16)).toEqual([0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1]);
  });
});
```


