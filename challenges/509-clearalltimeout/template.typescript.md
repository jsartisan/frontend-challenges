```ts index.ts 
// Replace the global setTimeout and clearTimeout
(window as any).setTimeout = function(callback: Function, delay?: number): number {
  // TODO: Implement me
};

(window as any).clearTimeout = function(timerId: number): void {
  // TODO: Implement me
};

export function clearAllTimeout(): void {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { clearAllTimeout } from './index';

describe('clearAllTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should clear all active timers', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    setTimeout(callback1, 1000);
    setTimeout(callback2, 2000);
    setTimeout(callback3, 3000);

    clearAllTimeout();

    jest.advanceTimersByTime(5000);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });

  it('should work when no timers exist', () => {
    expect(() => clearAllTimeout()).not.toThrow();
  });

  it('should preserve original setTimeout behavior', () => {
    const callback = jest.fn();
    const timerId = setTimeout(callback, 1000);

    expect(typeof timerId).toBe('number');
    
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  it('should preserve original clearTimeout behavior', () => {
    const callback = jest.fn();
    const timerId = setTimeout(callback, 1000);

    clearTimeout(timerId);

    jest.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle mixed clearTimeout and clearAllTimeout', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    const timerId1 = setTimeout(callback1, 1000);
    setTimeout(callback2, 2000);
    const timerId3 = setTimeout(callback3, 3000);

    clearTimeout(timerId1);
    clearAllTimeout();

    jest.advanceTimersByTime(5000);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });

  it('should work with multiple clearAllTimeout calls', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);

    clearAllTimeout();
    clearAllTimeout();

    jest.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle timers with different delays', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    setTimeout(callback1, 100);
    setTimeout(callback2, 500);
    setTimeout(callback3, 1000);

    clearAllTimeout();

    jest.advanceTimersByTime(2000);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    expect(callback3).not.toHaveBeenCalled();
  });

  it('should handle immediate timers (delay 0)', () => {
    const callback = jest.fn();
    setTimeout(callback, 0);

    clearAllTimeout();

    jest.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });
});
```


