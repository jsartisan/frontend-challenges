<!--info-header-start--><h1>Queue using Stack <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/104-queue-using-stack" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a `Queue` class using only a `Stack` class. A queue follows the FIFO (First In, First Out) principle, while a stack follows LIFO (Last In, First Out).

You must use the provided `Stack` class and **cannot** use arrays or other data structures directly.

### Stack Interface

```ts
class Stack {
  push(element): void;   // add element to top
  peek(): any;          // get top element without removing
  pop(): any;           // remove and return top element
  size(): number;       // count of elements
}
```

### Queue Interface

```ts
class Queue {
  enqueue(element): void;  // add element to rear (like Array.push)
  peek(): any;            // get front element without removing
  dequeue(): any;         // remove and return front element (like Array.shift)
  size(): number;         // count of elements
}
```

### Example

```ts
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

queue.peek();    // 1 (front element)
queue.dequeue(); // 1
queue.dequeue(); // 2
queue.size();    // 1
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,104,undefined&title=104%20-%20Queue%20using%20Stack%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A104+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
