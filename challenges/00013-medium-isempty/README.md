Write a JavaScript function called `isEmpty` that takes a single argument and checks if it represents an empty object, collection, map, or set. The function should return `true` if the input is empty and `false` otherwise.

**Example:**

```javascript
isEmpty({}); // true
isEmpty([]); // true
isEmpty(new Map()); // true
isEmpty(new Set()); // true

isEmpty({name: 'John'}); // false
isEmpty([1, 2, 3]); // false
isEmpty(new Map([['a', 1], ['b', 2]])); // false
isEmpty(new Set([1, 2, 3])); // false
```
