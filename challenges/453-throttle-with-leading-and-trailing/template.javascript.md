```js index.js 
/**
 * Creates a throttled version of fn.
 * @param {Function} fn
 * @param {number} wait - milliseconds
 * @param {{leading?: boolean, trailing?: boolean}} [options]
 * @returns {Function & {cancel(): void}}
 */
export function throttle(fn, wait, options = {}) {
  // TODO: Implement me
}
```

```js index.test.js 
import { throttle } from './index';

jest.useFakeTimers();

describe('throttle (JavaScript)', () => {
  it('respects leading: false, trailing: true', () => {
    const spy = jest.fn();
    const t = throttle(spy, 100, { leading: false, trailing: true });

    t();
    t();
    expect(spy).not.toBeCalled();

    jest.advanceTimersByTime(100);
    expect(spy).toBeCalledTimes(1);
  });

  it('respects leading: true, trailing: false', () => {
    const spy = jest.fn();
    const t = throttle(spy, 100, { leading: true, trailing: false });

    t(); // immediate
    t(); // ignored
    expect(spy).toBeCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(spy).toBeCalledTimes(1);
  });

  it('cancel() prevents trailing call', () => {
    const spy = jest.fn();
    const t = throttle(spy, 100);
    t();
    t.cancel();
    jest.advanceTimersByTime(100);
    expect(spy).toBeCalledTimes(1); // only leading call
  });
});
```

```ts index.ts 
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface Throttled<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): ReturnType<F> | undefined;
  cancel(): void;
}

export function throttle<F extends (...args: any[]) => any>(
  fn: F,
  wait: number,
  options: ThrottleOptions = {}
): Throttled<F> {
  // TODO: Implement me
  return undefined as any;
}
```

```ts index.test.ts 
import { throttle } from './index';

jest.useFakeTimers();

describe('throttle (TypeScript)', () => {
  it('invokes on leading edge by default', () => {
    const spy = jest.fn();
    const t = throttle(spy, 50);
    t();
    expect(spy).toBeCalledTimes(1);
  });

  it('supports trailing execution', () => {
    const spy = jest.fn();
    const t = throttle(spy, 50, { leading: false, trailing: true });
    t();
    expect(spy).toBeCalledTimes(0);
    jest.advanceTimersByTime(50);
    expect(spy).toBeCalledTimes(1);
  });

  it('cancel clears pending trailing call', () => {
    const spy = jest.fn();
    const t = throttle(spy, 50);
    t(); // leading
    t(); // schedules trailing
    t.cancel();
    jest.advanceTimersByTime(50);
    expect(spy).toBeCalledTimes(1);
  });
});
```


