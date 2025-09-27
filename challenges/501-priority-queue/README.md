Create a `PriorityQueue` class in JavaScript that supports priority-based element ordering. Priority Queue is a commonly used data structure in algorithm problems, especially useful for **Top K** problems with huge amounts of input data, since it could avoid sorting the whole dataset but keep a fixed-length sorted portion of it.

### Requirements

1. **Constructor with comparison function** – Accept a compare function to define priority order
2. **add(element)** – Insert elements in the correct priority order
3. **poll()** – Remove and return the highest priority element
4. **peek()** – Return the highest priority element without removing it
5. **size()** – Return the number of elements in the queue

### Key Behaviors

- **Priority ordering** – Elements closer to index 0 have higher priority
- **Custom comparison** – Support different ordering via comparison functions
- **Efficient operations** – Optimize for insertion and removal performance
- **Flexible priority** – Handle any data type with custom comparison logic

### Example

```js
const pq = new PriorityQueue((a, b) => a - b);
// (a, b) => a - b means smaller numbers are closer to index:0
// which means smaller numbers are to be removed sooner

pq.add(5);
// now 5 is the only element

pq.add(2);
// 2 added

pq.add(1);
// 1 added

pq.peek();
// since smaller numbers are sooner to be removed
// so this gives us 1

pq.poll();
// 1 (1 is removed, 2 and 5 are left)

pq.peek();
// 2 is the smallest now, this returns 2

pq.poll();
// 2 (2 is removed, only 5 is left)
```

### Signature

```ts
class PriorityQueue<T> {
  constructor(compare: (a: T, b: T) => number);
  add(element: T): void;
  poll(): T | undefined;
  peek(): T | undefined;
  size(): number;
}
```

### Key Challenge

The queue must maintain proper priority ordering while efficiently handling insertions and removals. Consider using a heap data structure for optimal performance.
