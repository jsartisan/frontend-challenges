```js index.js
export const arrayReduce = (array, callback, initialValue) => {
  // your code here
};
```

```js index.test.js
import { arrayReduce } from './index';

describe('arrayReduce function', () => {
  it('should sum an array of numbers with initial value', () => {
    const sum = (acc, curr) => acc + curr;
    const numbers = [1, 2, 3, 4];
    const result = arrayReduce(numbers, sum, 0);
    expect(result).toBe(10);
  });

  it('should sum an array of numbers without initial value', () => {
    const sum = (acc, curr) => acc + curr;
    const numbers = [1, 2, 3, 4];
    const result = arrayReduce(numbers, sum);
    expect(result).toBe(10);
  });

  it('should concatenate an array of strings', () => {
    const concat = (acc, curr) => acc + curr;
    const strings = ['a', 'b', 'c', 'd'];
    const result = arrayReduce(strings, concat, '');
    expect(result).toBe('abcd');
  });

  it('should handle array with one element and no initial value', () => {
    const sum = (acc, curr) => acc + curr;
    const numbers = [5];
    const result = arrayReduce(numbers, sum);
    expect(result).toBe(5);
  });

  it('should handle array with one element and initial value', () => {
    const sum = (acc, curr) => acc + curr;
    const numbers = [5];
    const result = arrayReduce(numbers, sum, 10);
    expect(result).toBe(15);
  });

  it('should throw an error when called on null or undefined', () => {
    expect(() => {
      arrayReduce(null, () => {});
    }).toThrow(TypeError);

    expect(() => {
      arrayReduce(undefined, () => {});
    }).toThrow(TypeError);
  });

  it('should throw an error when reducing an empty array without initial value', () => {
    expect(() => {
      arrayReduce([], (acc, curr) => acc + curr);
    }).toThrow(TypeError);
  });

  it('should pass the correct arguments to the callback', () => {
    const mockCallback = jest.fn((acc, curr) => acc + curr);
    const numbers = [1, 2, 3];
    arrayReduce(numbers, mockCallback, 0);
    expect(mockCallback).toHaveBeenCalledWith(0, 1, 0, numbers);
    expect(mockCallback).toHaveBeenCalledWith(1, 2, 1, numbers);
    expect(mockCallback).toHaveBeenCalledWith(3, 3, 2, numbers);
  });
});

```


