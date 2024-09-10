```js index.js
export function flatten(arr, depth = 1) {
  // write your logic here
}
```

```js index.test.js
import { flatten } from './index';

describe('flatten function', () => {
  test('should flatten the array by default depth', () => {
    const arr = [1, [2], [3, [4]]];
    expect(flatten(arr)).toEqual([1, 2, 3, [4]]);
  });

  test('should flatten the array by specified depth', () => {
    const arr = [1, [2], [3, [4]]];
    expect(flatten(arr, 1)).toEqual([1, 2, 3, [4]]);
    expect(flatten(arr, 2)).toEqual([1, 2, 3, 4]);
    expect(flatten(arr, 0)).toEqual([1, [2], [3, [4]]]);
  });

  test('should handle Infinity depth', () => {
    const arr = [1, [2], [3, [4]]];
    expect(flatten(arr, Infinity)).toEqual([1, 2, 3, 4]);
  });

  test('should handle deeply nested arrays', () => {
    const arr = [1, [2, [3, [4, [5]]]]];
    expect(flatten(arr, 3)).toEqual([1, 2, 3, 4, [5]]);
  });
});
```


