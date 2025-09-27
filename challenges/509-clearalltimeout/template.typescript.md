```ts index.ts 
export function clearAllTimeout(): void {
  // TODO: Implement me
}
```

```ts index.test.ts 
import './index';

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('clearAllTimeout', () => {
  afterEach(() => {
    clearAllTimeout();
  });

  it('should clear all active timers', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    setTimeout(callback1, 50);
    setTimeout(callback2, 100);
    setTimeout(callback3, 150);

    clearAllTimeout();

    await wait(200);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });

  it('should work when no timers exist', () => {
    expect(() => clearAllTimeout()).not.toThrow();
  });

  it('should preserve original setTimeout behavior', async () => {
    const callback = jest.fn();
    setTimeout(callback, 50);

    await wait(100);
    expect(callback).toHaveBeenCalled();
  });

  it('should preserve original clearTimeout behavior', async () => {
    const callback = jest.fn();
    const timerId = setTimeout(callback, 50);

    clearTimeout(timerId);

    await wait(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle mixed clearTimeout and clearAllTimeout', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    const timerId1 = setTimeout(callback1, 50);
    setTimeout(callback2, 100);
    const timerId3 = setTimeout(callback3, 150);

    clearTimeout(timerId1);
    clearAllTimeout();

    await wait(200);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });

  it('should work with multiple clearAllTimeout calls', async () => {
    const callback = jest.fn();
    setTimeout(callback, 50);

    clearAllTimeout();
    clearAllTimeout();

    await wait(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle timers with different delays', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    setTimeout(callback1, 50);
    setTimeout(callback2, 100);
    setTimeout(callback3, 150);

    clearAllTimeout();

    await wait(200);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });

  it('should handle immediate timers (delay 0)', async () => {
    const callback = jest.fn();
    setTimeout(callback, 0);

    clearAllTimeout();

    await wait(50);
    expect(callback).not.toHaveBeenCalled();
  });
});
```


