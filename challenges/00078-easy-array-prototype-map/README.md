Implement a custom `arrayMap` function that mimics the behavior of the native `map` method.

The `arrayMap` function should take an array and a callback function as arguments. The callback function should be invoked with three arguments: the current element, the index of the current element, and the array itself. The `arrayMap` function should return a new array containing the results of applying the callback function to each element of the original array.

Use the following example to understand how the `arrayMap` function should work:

```javascript
const arrayMap = (array, callback) => {
  // Your implementation here
};

const multiplyByTwo = (num) => num * 2;

const numbers = [1, 2, 3, 4, 5, 6];
const doubledNumbers = arrayMap(numbers, multiplyByTwo);

console.log(doubledNumbers);
// Output: [2, 4, 6, 8, 10, 12]
```
