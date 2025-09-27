```js index.js 
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  pop() {
    return this.items.pop();
  }

  size() {
    return this.items.length;
  }
}

class Queue {
  constructor() {
    // TODO: Implement me using only Stack
  }

  enqueue(element) {
    // TODO: Implement me
  }

  peek() {
    // TODO: Implement me
  }

  dequeue() {
    // TODO: Implement me
  }

  size() {
    // TODO: Implement me
  }
}

export { Stack, Queue };
```

```js index.test.js 
import { Queue } from './index';

describe('Queue with Stack (JS)', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  it('enqueues and dequeues elements in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  it('peek returns front element without removing', () => {
    queue.enqueue(10);
    queue.enqueue(20);

    expect(queue.peek()).toBe(10);
    expect(queue.size()).toBe(2);
  });

  it('size returns correct count', () => {
    expect(queue.size()).toBe(0);
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });

  it('handles empty queue', () => {
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
  });

  it('works with mixed operations', () => {
    queue.enqueue('a');
    queue.enqueue('b');
    expect(queue.peek()).toBe('a');
    
    queue.dequeue();
    queue.enqueue('c');
    expect(queue.peek()).toBe('b');
    expect(queue.size()).toBe(2);
  });

  it('maintains queue order after multiple operations', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();
    queue.enqueue(3);
    queue.enqueue(4);

    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(4);
  });
});
```

```ts index.ts 
class Stack<T> {
  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  size(): number {
    return this.items.length;
  }
}

class Queue<T> {
  // TODO: Implement me using only Stack
  constructor() {}

  enqueue(element: T): void {
    // TODO: Implement me
  }

  peek(): T | undefined {
    // TODO: Implement me
  }

  dequeue(): T | undefined {
    // TODO: Implement me
  }

  size(): number {
    // TODO: Implement me
  }
}

export { Stack, Queue };
```

```ts index.test.ts 
import { Queue } from './index';

describe('Queue with Stack (TS)', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('enqueues and dequeues in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  it('peek returns front without removing', () => {
    queue.enqueue(10);
    queue.enqueue(20);

    expect(queue.peek()).toBe(10);
    expect(queue.size()).toBe(2);
  });

  it('size tracks elements correctly', () => {
    expect(queue.size()).toBe(0);
    queue.enqueue(1);
    expect(queue.size()).toBe(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });

  it('handles empty queue', () => {
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
    expect(queue.dequeue()).toBeUndefined();
  });

  it('mixed operations work correctly', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    
    queue.dequeue();
    queue.enqueue(3);
    expect(queue.peek()).toBe(2);
    expect(queue.size()).toBe(2);
  });

  it('maintains order through complex operations', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();
    queue.enqueue(3);
    queue.enqueue(4);

    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(4);
  });
});
```


