<!--info-header-start--><h1>Stack <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/91-stack" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a stack data structure in JavaScript. A stack is a collection that follows the Last-In-First-Out (LIFO) principle. Your stack should have the following methods:

- `push(element)`: Adds an element to the top of the stack.
- `pop()`: Removes the top element from the stack and returns it. Returns `undefined` if the stack is empty.
- `peek()`: Returns the top element of the stack without removing it. Returns `undefined` if the stack is empty.
- `isEmpty()`: Returns `true` if the stack is empty, otherwise returns `false`.
- `size()`: Returns the number of elements in the stack.

Use the following example to understand how the stack should work:

```js index.js
class Stack {
  // Your implementation here
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.peek()); // 2
console.log(stack.pop());  // 2
console.log(stack.size()); // 1
console.log(stack.isEmpty()); // false
stack.pop();
console.log(stack.isEmpty()); // true
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,91,undefined&title=91%20-%20Stack%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A91+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->