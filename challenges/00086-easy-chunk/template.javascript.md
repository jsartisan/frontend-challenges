```js index.js
export function chunk(array, size) {
  // your code here
}

```

```js index.test.js
import { chunk } from './index';

describe('chunk function', () => {
  test('should split an array into chunks of specified size', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const result = chunk(arr, 3);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  test('should handle arrays that can be split evenly', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const result = chunk(arr, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });

  test('should return an empty array if input array is empty', () => {
    const arr = [];
    const result = chunk(arr, 3);
    expect(result).toEqual([]);
  });

  test('should handle chunk size larger than array length', () => {
    const arr = [1, 2, 3];
    const result = chunk(arr, 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  test('should throw an error if first argument is not an array', () => {
    expect(() => chunk('not an array', 3)).toThrow(TypeError);
  });

  test('should throw an error if second argument is not a positive number', () => {
    expect(() => chunk([1, 2, 3], -1)).toThrow(TypeError);
    expect(() => chunk([1, 2, 3], '3')).toThrow(TypeError);
    expect(() => chunk([1, 2, 3], 0)).toThrow(TypeError);
  });
});
```


