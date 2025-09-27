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
