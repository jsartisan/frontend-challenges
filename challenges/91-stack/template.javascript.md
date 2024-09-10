```js index.js
class Stack {
 
}

export { Stack };
```

```js index.test.js
import { Stack } from './index';

describe('Stack class', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test('should push elements to the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  test('should pop elements from the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
    expect(stack.pop()).toBe(1);
    expect(stack.size()).toBe(0);
  });

  test('should return undefined when popping from an empty stack', () => {
    expect(stack.pop()).toBe(undefined);
  });

  test('should peek the top element without removing it', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(2);
  });

  test('should return undefined when peeking an empty stack', () => {
    expect(stack.peek()).toBe(undefined);
  });

  test('should check if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  test('should return the correct size of the stack', () => {
    expect(stack.size()).toBe(0);
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });
});

```


