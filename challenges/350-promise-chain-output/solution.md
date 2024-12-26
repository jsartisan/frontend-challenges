The output will be: `6`

1. `Promise.resolve(1)` → Initial value is `1`
2. `.then(() => 2)` → Returns `2`
3. `.then(3)` → Ignored because `3` is not a function, passes previous value `2`
4. `.then((value) => value * 3)` → `2 * 3 = 6`
5. `.then(Promise.resolve(4))` → Ignored because it's not a function, passes previous value `6`
6. `.then(console.log)` → Prints `6`

**Key points**:
- If `.then()` receives a non-function (like `3` or `Promise.resolve(4)`), it ignores that handler and passes the previous value through
- Only function handlers are executed in the chain
