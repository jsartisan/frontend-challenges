```ts index.ts 
/**
 * PriorityQueue class that maintains elements in priority order
 */
export class PriorityQueue<T> {
  constructor(compare: (a: T, b: T) => number) {
    // TODO: Implement me
  }

  /**
   * Add a new element to the queue in the right order
   */
  add(element: T): void {
    // TODO: Implement me
  }

  /**
   * Remove the head element and return it
   */
  poll(): T | undefined {
    // TODO: Implement me
  }

  /**
   * Get the head element without removing it
   */
  peek(): T | undefined {
    // TODO: Implement me
  }

  /**
   * Get the amount of items in the queue
   */
  size(): number {
    // TODO: Implement me
  }
}
```

```ts index.test.ts 
import { PriorityQueue } from './index';

describe('PriorityQueue', () => {
  it('creates a priority queue with min-heap ordering', () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    expect(pq.size()).toBe(0);
  });

  it('adds elements in correct priority order', () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    pq.add(5);
    pq.add(2);
    pq.add(1);
    expect(pq.peek()).toBe(1);
  });

  it('removes elements in priority order', () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    pq.add(5);
    pq.add(2);
    pq.add(1);
    
    expect(pq.poll()).toBe(1);
    expect(pq.poll()).toBe(2);
    expect(pq.poll()).toBe(5);
  });

  it('peek returns highest priority without removal', () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    pq.add(3);
    pq.add(1);
    pq.add(2);
    
    expect(pq.peek()).toBe(1);
    expect(pq.size()).toBe(3);
    expect(pq.peek()).toBe(1); // Still 1 after peek
  });

  it('handles empty queue operations', () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
    expect(pq.peek()).toBeUndefined();
    expect(pq.poll()).toBeUndefined();
    expect(pq.size()).toBe(0);
  });

  it('works with max-heap ordering', () => {
    const pq = new PriorityQueue<number>((a, b) => b - a);
    pq.add(1);
    pq.add(3);
    pq.add(2);
    
    expect(pq.peek()).toBe(3);
    expect(pq.poll()).toBe(3);
    expect(pq.poll()).toBe(2);
  });

  it('handles custom objects with priority', () => {
    interface Task {
      value: string;
      priority: number;
    }
    
    const pq = new PriorityQueue<Task>((a, b) => a.priority - b.priority);
    pq.add({ value: 'task1', priority: 3 });
    pq.add({ value: 'task2', priority: 1 });
    pq.add({ value: 'task3', priority: 2 });
    
    expect(pq.peek()?.value).toBe('task2');
    expect(pq.poll()?.value).toBe('task2');
  });

  it('maintains correct size after operations', () => {
    const pq = new PriorityQueue<number>((a, b) => a - b);
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
    const pq = new PriorityQueue<number>((a, b) => a - b);
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
    const pq = new PriorityQueue<number>((a, b) => a - b);
    pq.add(-3);
    pq.add(-1);
    pq.add(-2);
    
    expect(pq.peek()).toBe(-3);
    expect(pq.poll()).toBe(-3);
    expect(pq.poll()).toBe(-2);
  });
});
```


