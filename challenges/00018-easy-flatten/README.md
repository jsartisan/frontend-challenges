Lodash has a flatten utility that simplifies the process of flattening nested arrays. Could you create a custom function similar to Lodash's flatten?

Here's how Lodash's flatten works:

```javascript
_.flatten(array);
```

It takes an array and returns a new array with all nested arrays flattened to a single level.

Now, considering the following example:

```javascript
const arr = [1, [2], [3, [4]]];
```

Implement a function named `flatten` that mimics Lodash's flatten behavior. The function should accept an array and an optional depth parameter, which determines the level of flattening. If no depth is provided, the default depth should be assumed as 1.

For example:

```javascript
flatten(arr);
// Expected output: [1, 2, 3, [4]]

flatten(arr, 1);
// Expected output: [1, 2, 3, [4]]

flatten(arr, 2);
// Expected output: [1, 2, 3, 4]
```
