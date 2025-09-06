Most JavaScript projects use testing frameworks like **Jest** or **Mocha** that provide functions such as `test` and `expect`.

Your task is to implement a **very minimal testing utility** that mimics this behavior:

### Requirements

* Implement a global `test(name, fn)` function that:

  * Runs the function `fn`.
  * Logs ✅ if the test passes.
  * Logs ❌ if the test fails.
* Implement a global `expect(received)` function that returns an object with:

  * `toBe(expected)` → asserts strict equality.
  * `toEqual(expected)` → asserts deep equality (recursive object/array check).

### Example

```js
test('addition works', () => {
  expect(1 + 2).toBe(3);
});

test('array equality', () => {
  expect([1, 2, 3]).toEqual([1, 2, 3]);
});
```

Output:

```
✅ addition works
✅ array equality
```

If a test fails, it should show ❌ with the test name.

### Constraints

* Do not use external libraries.
* Focus only on `toBe` and `toEqual`.
