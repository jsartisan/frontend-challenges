```
1
2
undefined
3
undefined
4
undefined
undefined
```

Here's why:

1. `1` - First promise resolves with 1
2. `2` - Second .then gets 1+1
3. `undefined` - Third .then gets undefined (since previous .then had no return)
4. `3` - From the nested Promise.resolve(3)
5. `undefined` - Next .then gets undefined (nested promise had no return)
6. `4` - From Promise.reject(4) caught in catch
7. `undefined` - From finally (finally always receives undefined)
8. `undefined` - Last .then gets undefined (finally's return value is ignored)

Key points:

- If a .then doesn't return anything, the next .then receives `undefined`
- finally() always receives `undefined` and its return value is ignored
- The chain continues after catch() with undefined
