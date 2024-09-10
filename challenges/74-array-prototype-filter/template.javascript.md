```js index.js
export function arrayFilter(array, callback) {
 // Your code here
}
```

```js index.test.js
import { arrayFilter } from './index';

describe('arrayFilter function', () => {
  it('should filter even numbers', () => {
    const isEven = (num) => num % 2 === 0;
    const numbers = [1, 2, 3, 4, 5, 6];
    const evenNumbers = arrayFilter(numbers, isEven);
    expect(evenNumbers).toEqual([2, 4, 6]);
  });

  it('should filter odd numbers', () => {
    const isOdd = (num) => num % 2 !== 0;
    const numbers = [1, 2, 3, 4, 5, 6];
    const oddNumbers = arrayFilter(numbers, isOdd);
    expect(oddNumbers).toEqual([1, 3, 5]);
  });

  it('should return an empty array if no elements match', () => {
    const isGreaterThanTen = (num) => num > 10;
    const numbers = [1, 2, 3, 4, 5, 6];
    const filteredNumbers = arrayFilter(numbers, isGreaterThanTen);
    expect(filteredNumbers).toEqual([]);
  });

  it('should handle an empty array', () => {
    const isEven = (num) => num % 2 === 0;
    const numbers = [];
    const evenNumbers = arrayFilter(numbers, isEven);
    expect(evenNumbers).toEqual([]);
  });

  it('should pass the correct arguments to the callback', () => {
    const mockCallback = jest.fn();
    const numbers = [1, 2, 3];
    arrayFilter(numbers, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(1, 0, numbers);
    expect(mockCallback).toHaveBeenCalledWith(2, 1, numbers);
    expect(mockCallback).toHaveBeenCalledWith(3, 2, numbers);
  });
});

```


