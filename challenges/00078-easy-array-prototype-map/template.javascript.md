```js index.js
export function arrayMap(array, callback) {
  // your code here
}
```

```js index.test.js
import { arrayMap } from './';

describe('arrayMap function', () => {
  it('should double the numbers', () => {
    const multiplyByTwo = (num) => num * 2;
    const numbers = [1, 2, 3, 4, 5, 6];
    const doubledNumbers = arrayMap(numbers, multiplyByTwo);
    expect(doubledNumbers).toEqual([2, 4, 6, 8, 10, 12]);
  });

  it('should add index to each number', () => {
    const addIndex = (num, index) => num + index;
    const numbers = [1, 2, 3, 4, 5, 6];
    const indexedNumbers = arrayMap(numbers, addIndex);
    expect(indexedNumbers).toEqual([1, 3, 5, 7, 9, 11]);
  });

  it('should return an empty array when the input array is empty', () => {
    const multiplyByTwo = (num) => num * 2;
    const numbers = [];
    const doubledNumbers = arrayMap(numbers, multiplyByTwo);
    expect(doubledNumbers).toEqual([]);
  });

  it('should pass the correct arguments to the callback', () => {
    const mockCallback = jest.fn();
    const numbers = [1, 2, 3];
    arrayMap(numbers, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(1, 0, numbers);
    expect(mockCallback).toHaveBeenCalledWith(2, 1, numbers);
    expect(mockCallback).toHaveBeenCalledWith(3, 2, numbers);
  });

  it('should transform elements to strings', () => {
    const toString = (num) => num.toString();
    const numbers = [1, 2, 3, 4, 5, 6];
    const stringNumbers = arrayMap(numbers, toString);
    expect(stringNumbers).toEqual(['1', '2', '3', '4', '5', '6']);
  });
});
```


