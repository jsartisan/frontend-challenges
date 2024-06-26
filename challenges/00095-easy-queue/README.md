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
