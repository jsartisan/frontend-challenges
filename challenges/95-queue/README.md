<!--info-header-start--><h1>Queue <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/95-queue" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a queue data structure in JavaScript. A queue follows the First-In-First-Out (FIFO) principle. Your queue should have the following methods:

- `enqueue(element)`: Adds an element to the end of the queue.
- `dequeue()`: Removes the first element from the queue and returns it. Returns `undefined` if the queue is empty.
- `front()`: Returns the first element of the queue without removing it. Returns `undefined` if the queue is empty.
- `isEmpty()`: Returns `true` if the queue is empty, otherwise returns `false`.
- `size()`: Returns the number of elements in the queue.

Use the following example to understand how the queue should work:

```javascript
class Queue {
  // Your implementation here
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.front()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.size()); // 1
console.log(queue.isEmpty()); // false
queue.dequeue();
console.log(queue.isEmpty()); // true
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,95,undefined&title=95%20-%20Queue%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A95+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
