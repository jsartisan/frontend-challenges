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
