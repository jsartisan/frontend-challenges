```ts index.ts 
export interface ThrottleOptions {
  leading?: boolean; // default true
  trailing?: boolean; // default true
}

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: ThrottleOptions = {},
): (...args: Parameters<T>) => ReturnType<T> | void {
  const { leading = true, trailing = true } = options;
  // TODO: Implement throttle with leading and trailing behaviour
  return (..._args: Parameters<T>) => {
    /* implementation */
  };
}
```

```ts index.test.ts 
import { throttle } from './index';

jest.useFakeTimers();

describe('throttle', () => {
  it('calls function immediately when leading is true', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled('A');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('A');
  });

  it('waits before next call within delay', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled('A');
    throttled('B');

    expect(fn).toHaveBeenCalledTimes(1); // only leading so far

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('B');
  });

  it('supports disabling leading', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { leading: false });

    throttled('A'); // should not call immediately
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('A');
  });

  it('supports disabling trailing', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { trailing: false });

    throttled('A'); // leading call
    throttled('B');

    jest.advanceTimersByTime(100);
    // trailing disabled, so only leading executed
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('A');
  });
});
```


