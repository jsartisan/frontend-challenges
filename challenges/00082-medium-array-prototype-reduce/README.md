Implement a custom arrayReduce function that mimics the behavior of the native reduce method.

The arrayReduce function should take an array, a callback function, and an optional initial value. The callback function should be invoked with four arguments: the accumulator, the current element, the index of the current element, and the array itself. The arrayReduce function should return the final accumulated value.

Use the following example to understand how the arrayReduce function should work:

```js index.js
const arrayReduce = (array, callback, initialValue) => {
  // Your implementation here
};

const sum = (acc, curr) => acc + curr;

const numbers = [1, 2, 3, 4];
const result = arrayReduce(numbers, sum, 0);

console.log(result); 
// Output: 10
```
