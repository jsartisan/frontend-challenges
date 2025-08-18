Output will be:

```bash
'John'
true
'Pete'
false
```

#### Explanation:

1. **`user1.name`**:

   - `user1` is created with the `name` 'John'.
   - Output: `'John'`

2. **`user1.constructor === User`**:

   - By default, an instance's `constructor` property points to the constructor function that created it.
   - Output: `true`

3. **`User.prototype = {};`**:

   - This line changes the prototype of `User` to a new, empty object.
   - This affects new instances, not existing ones.

4. **`user1.constructor('Pete')`**:

   - Despite the prototype change, `user1.constructor` still points to the original `User` function.
   - `user2` is created with the `name` 'Pete'.
   - Output for `user2.name`: `'Pete'`

5. **`user2.constructor === User`**:
   - After the prototype change, new objects created from `User` have `constructor` set to `Object`, because the new prototype is an empty object `{}` which defaults to `Object`.
   - Output: `false`
