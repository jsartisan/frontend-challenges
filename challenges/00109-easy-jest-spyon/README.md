In testing frameworks like Jest, a common feature is spyOn, which allows you to spy on methods of objects to see how they are called, and optionally replace them with a mock implementation.

Can you implement a simple version of spyOn that allows you to track calls to a method on an object?

Your spyOn function should:

- Take an object and the name of the method to spy on.
- Replace the original method with a spy function that records each call.
- Provide a way to restore the original method.

```js index.js

const obj = {
  greet(name) {
    return `Hello, ${name}!`;
  }
};

const spy = spyOn(obj, 'greet');

obj.greet('Alice'); // Call the method

console.log(spy.calls); // Should output: [['Alice']]
console.log(spy.results); // Should output: ['Hello, Alice!']

spy.restore(); // Restore the original method

console.log(obj.greet('Bob')); // Should output: 'Hello, Bob!'
```

Implement the spyOn function and ensure it behaves as described.
