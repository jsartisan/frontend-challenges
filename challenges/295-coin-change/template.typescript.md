```ts index.ts 
export function coinChange(coins: number[], amount: number): number {
  
}
```

```ts index.test.ts 
import { coinChange } from './index';

describe('coinChange', () => {
  test('Example 1: Multiple coins', () => {
    expect(coinChange([1,5,10], 12)).toBe(3);
  });

  test('Example 2: Impossible amount', () => {
    expect(coinChange([2], 3)).toBe(-1);
  });

  test('Example 3: Zero amount', () => {
    expect(coinChange([1], 0)).toBe(0);
  });

  test('Single coin type that works', () => {
    expect(coinChange([5], 15)).toBe(3);
  });

  test('Multiple ways possible', () => {
    expect(coinChange([1,2,5], 11)).toBe(3);
  });

  test('Large amount', () => {
    expect(coinChange([1,2,5], 100)).toBe(20);
  });

  test('No small coins', () => {
    expect(coinChange([186,419,83,408], 6249)).toBe(20);
  });

  test('All large denominations', () => {
    expect(coinChange([186,419,83,408], 54)).toBe(-1);
  });

  test('One coin exact match', () => {
    expect(coinChange([1,3,4,5], 4)).toBe(1);
  });

  test('Multiple same value solutions', () => {
    expect(coinChange([2,5,10,1], 27)).toBe(4);
  });
});
```


