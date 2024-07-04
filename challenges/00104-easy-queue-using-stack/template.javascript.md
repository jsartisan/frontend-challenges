```js index.js
import { Stack } from "./Stack";

export class QueueUsingStacks {
  // Your code here
}
```

```js Stack.js readOnly
class Stack {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  peek() {
    return this.items.at(-1);
  }

  push(item) {
    return this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.size() === 0;
  }
}

export { Stack };

```

```js index.test.js
import { QueueUsingStacks } from './index';

describe('QueueUsingStacks class', () => {
  let queue;

  beforeEach(() => {
    queue = new QueueUsingStacks();
  });

  test('should enqueue elements to the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
    expect(queue.front()).toBe(1);
  });

  test('should dequeue elements from the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    expect(queue.size()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.size()).toBe(0);
  });

  test('should return undefined when dequeuing from an empty queue', () => {
    expect(queue.dequeue()).toBe(undefined);
  });

  test('should return the front element without removing it', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.front()).toBe(1);
    expect(queue.size()).toBe(2);
  });

  test('should return undefined when peeking the front element of an empty queue', () => {
    expect(queue.front()).toBe(undefined);
  });

  test('should check if the queue is empty', () => {
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
  });

  test('should return the correct size of the queue', () => {
    expect(queue.size()).toBe(0);
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size()).toBe(2);
  });
});
```

```json package.json
{
  "dependencies": {},
  "main": "/index.js",
  "devDependencies": {}
}
```


