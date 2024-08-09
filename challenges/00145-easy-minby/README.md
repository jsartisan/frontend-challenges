Implement a function similar to `_.minBy` from the Lodash library. The function `minBy` takes an array of objects and an iteratee (a function that extracts the value to be compared from each object) and returns the object with the minimum value. If the array is empty, it should return `undefined`.

**Example Usage**:
```js
const users = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 1 }
];

const youngest = minBy(users, o => o.age);
console.log(youngest); // { user: 'pebbles', age: 1 }
```
