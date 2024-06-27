```js index.js
class Queue {
  
}

export { Queue }


```

```js index.test.js
import { Queue } from './index';

describe('Queue class', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
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


