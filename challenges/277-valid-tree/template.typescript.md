```ts index.ts 
export function validTree(n: number, edges: number[][]): boolean {
  
}
```

```ts index.test.ts 
import { validTree } from './index';

describe('validTree', () => {
  test('Example 1: Valid tree', () => {
    expect(validTree(5, [[0,1], [0,2], [0,3], [1,4]])).toBe(true);
  });

  test('Example 2: Invalid tree with cycle', () => {
    expect(validTree(5, [[0,1], [1,2], [2,3], [1,3], [1,4]])).toBe(false);
  });

  test('Single node', () => {
    expect(validTree(1, [])).toBe(true);
  });

  test('Two nodes connected', () => {
    expect(validTree(2, [[0,1]])).toBe(true);
  });

  test('Two nodes not connected', () => {
    expect(validTree(2, [])).toBe(false);
  });

  test('Linear tree', () => {
    expect(validTree(4, [[0,1], [1,2], [2,3]])).toBe(true);
  });

  test('Star shaped tree', () => {
    expect(validTree(4, [[0,1], [0,2], [0,3]])).toBe(true);
  });

  test('Cycle only', () => {
    expect(validTree(3, [[0,1], [1,2], [2,0]])).toBe(false);
  });

  test('Disconnected components', () => {
    expect(validTree(4, [[0,1], [2,3]])).toBe(false);
  });

  test('Too many edges', () => {
    expect(validTree(3, [[0,1], [1,2], [2,0], [0,2]])).toBe(false);
  });

  test('Complex valid tree', () => {
    expect(validTree(6, [[0,1], [0,2], [2,3], [2,4], [2,5]])).toBe(true);
  });
});
```


