<!--info-header-start--><h1>jest.spyOn <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/109-jest-spyon" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,109,undefined&title=109%20-%20jest.spyOn%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A109+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->