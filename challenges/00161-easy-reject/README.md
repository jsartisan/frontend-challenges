Implement a `reject` function similar to `_.reject` from the Lodash library. The `reject` function takes an array and a predicate function, and returns a new array that excludes all elements for which the predicate function returns truthy.

**Requirements:**
1. The function should be named `reject`.
2. The function should take two arguments:
   - An array of elements.
   - A predicate function to test each element of the array.
3. The function should return a new array that excludes all elements for which the predicate function returns truthy.

**Example Usage:**

```js
const arr = [1, 2, 3, 4, 5];
const isEven = (num) => num % 2 === 0;
const result = reject(arr, isEven);
console.log(result); // [1, 3, 5]
```
