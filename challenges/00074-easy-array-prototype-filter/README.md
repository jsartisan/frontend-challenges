Implement a custom `arrayFilter` function that mimics the behavior of the native `filter` method.

#### Arguments
The `arrayFilter` function should take an array and a callback function as arguments. The callback function should be invoked with three arguments: the current element, the index of the current element, and the array itself. 

#### Return Value
The `arrayFilter` function should return a new array containing all the elements for which the callback function returns a truthy value.

Use the following example to understand how the arrayFilter function should work:

```js index.js
const arrayFilter = (array, callback) => {
  // Your implementation here
};

const isEven = (num) => num % 2 === 0;

const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = arrayFilter(numbers, isEven);

console.log(evenNumbers);
// Output: [2, 4, 6]
```
