```js index.js 
/**
 * PriorityQueue class that maintains elements in priority order
 * @param {Function} compare - Comparison function defining priority order
 */
class PriorityQueue {
  constructor(compare) {
    // TODO: Implement me
  }

  /**
   * Add a new element to the queue in the right order
   * @param {*} element - Element to add
   */
  add(element) {
    // TODO: Implement me
  }

  /**
   * Remove the head element and return it
   * @returns {*} The highest priority element
   */
  poll() {
    // TODO: Implement me
  }

  /**
   * Get the head element without removing it
   * @returns {*} The highest priority element
   */
  peek() {
    // TODO: Implement me
  }

  /**
   * Get the amount of items in the queue
   * @returns {number} Queue size
   */
  size() {
    // TODO: Implement me
  }
}

export { PriorityQueue };
```

```js index.test.js 
import { PriorityQueue } from './index';

describe('PriorityQueue', () => {
  it('creates a priority queue with min-heap ordering', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    expect(pq.size()).toBe(0);
  });

  it('adds elements in correct priority order', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    pq.add(5);
    pq.add(2);
    pq.add(1);
    expect(pq.peek()).toBe(1);
  });

  it('removes elements in priority order', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    pq.add(5);
    pq.add(2);
    pq.add(1);
    
    expect(pq.poll()).toBe(1);
    expect(pq.poll()).toBe(2);
    expect(pq.poll()).toBe(5);
  });

  it('peek returns highest priority without removal', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    pq.add(3);
    pq.add(1);
    pq.add(2);
    
    expect(pq.peek()).toBe(1);
    expect(pq.size()).toBe(3);
    expect(pq.peek()).toBe(1); // Still 1 after peek
  });

  it('handles empty queue operations', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    expect(pq.peek()).toBeUndefined();
    expect(pq.poll()).toBeUndefined();
    expect(pq.size()).toBe(0);
  });

  it('works with max-heap ordering', () => {
    const pq = new PriorityQueue((a, b) => b - a);
    pq.add(1);
    pq.add(3);
    pq.add(2);
    
    expect(pq.peek()).toBe(3);
    expect(pq.poll()).toBe(3);
    expect(pq.poll()).toBe(2);
  });

  it('handles custom objects with priority', () => {
    const pq = new PriorityQueue((a, b) => a.priority - b.priority);
    pq.add({ value: 'task1', priority: 3 });
    pq.add({ value: 'task2', priority: 1 });
    pq.add({ value: 'task3', priority: 2 });
    
    expect(pq.peek().value).toBe('task2');
    expect(pq.poll().value).toBe('task2');
  });

  it('maintains correct size after operations', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    expect(pq.size()).toBe(0);
    
    pq.add(1);
    expect(pq.size()).toBe(1);
    
    pq.add(2);
    expect(pq.size()).toBe(2);
    
    pq.poll();
    expect(pq.size()).toBe(1);
    
    pq.poll();
    expect(pq.size()).toBe(0);
  });

  it('handles duplicate values', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    pq.add(2);
    pq.add(1);
    pq.add(2);
    pq.add(1);
    
    expect(pq.poll()).toBe(1);
    expect(pq.poll()).toBe(1);
    expect(pq.poll()).toBe(2);
    expect(pq.poll()).toBe(2);
  });

  it('works with negative numbers', () => {
    const pq = new PriorityQueue((a, b) => a - b);
    pq.add(-3);
    pq.add(-1);
    pq.add(-2);
    
    expect(pq.peek()).toBe(-3);
    expect(pq.poll()).toBe(-3);
    expect(pq.poll()).toBe(-2);
  });
});
```


