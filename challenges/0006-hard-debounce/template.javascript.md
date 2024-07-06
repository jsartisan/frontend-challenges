```js index.js
export function debounce(func, delay) {
  // write your code here
}

```

```js index.test.js 
import { debounce } from './index';

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

describe('Debounce Function', () => {
  it('should not be invoked immediately', async () => {
    const originalFunction1 = jest.fn();
    const debouncedFunction1 = debounce(originalFunction1, 300);
    debouncedFunction1();
    expect(originalFunction1).not.toBeCalled();
  });

  it('should be invoked after the specified delay', async () => {
    const originalFunction2 = jest.fn();
    const debouncedFunction2 = debounce(originalFunction2, 500);
    debouncedFunction2();
    await wait(499);
    expect(originalFunction2).not.toBeCalled();
    await wait(1);
    expect(originalFunction2).toBeCalled();
  });

  it('should reset the delay timer on multiple invocations', async () => {
    const originalFunction3 = jest.fn();
    const debouncedFunction3 = debounce(originalFunction3, 200);
    debouncedFunction3();
    await wait(100);
    debouncedFunction3(); // Should reset the delay timer
    await wait(200);
    expect(originalFunction3).toBeCalled();
  });

  it('should receive the latest arguments', async () => {
    const originalFunction4 = jest.fn();
    const debouncedFunction4 = debounce(originalFunction4, 300);
    debouncedFunction4(1);
    debouncedFunction4(2);
    debouncedFunction4(3);
    await wait(300);
    expect(originalFunction4).not.toBeCalledWith(1);
    expect(originalFunction4).not.toBeCalledWith(2);
    expect(originalFunction4).toBeCalledWith(3);
  });
});
```


