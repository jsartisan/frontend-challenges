```bash
function
{
  constructor: [Function: User],
  greet: [Function: greet]
}
[Function: User]
['constructor', 'greet']
```

### Explanation

1. `typeof User`:
    - In JavaScript, classes are syntactic sugar over constructor functions, so `typeof User` will return `"function".

2. `User.prototype`:
    - Shows an object with properties `constructor` and `greet`. The `constructor` property references the `User` function itself.

3. `User.prototype.constructor`:
    - Shows the `User` function, indicating that the `constructor` property points to the `User` function.

4. `Object.getOwnPropertyNames(User.prototype)`:
    - Returns an array of the property names directly found on `User.prototype`, which are `constructor` and `greet`.
