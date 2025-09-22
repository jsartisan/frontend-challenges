```js index.js 
/**
 * Creates a debounced version of fn.
 * @param {Function} fn
 * @param {number} wait - milliseconds
 * @param {{leading?: boolean, trailing?: boolean}} [options]
 * @returns {Function & {cancel(): void}}
 */
export function debounce(fn, wait, options = {}) {
  // TODO: Implement me
}
```

```js index.test.js 
import { debounce } from './index';

jest.useFakeTimers();

describe('debounce with leading & trailing (JS)', () => {
  it('default behaviour is trailing only', () => {
    const spy = jest.fn();
    const d = debounce(spy, 100);

    d(); d(); d();
    jest.advanceTimersByTime(99);
    expect(spy).toBeCalledTimes(0);
    jest.advanceTimersByTime(1);
    expect(spy).toBeCalledTimes(1);
  });

  it('leading true fires immediately', () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: true, trailing: false });
    d();
    expect(spy).toBeCalledTimes(1);
    d(); d();
    jest.advanceTimersByTime(100);
    expect(spy).toBeCalledTimes(1);
  });

  it('leading + trailing both true', () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: true, trailing: true });
    d(); // leading
    jest.advanceTimersByTime(50);
    d(); // schedule trailing
    jest.advanceTimersByTime(100);
    expect(spy).toBeCalledTimes(2);
  });

  it('leading false, trailing false does nothing', () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: false, trailing: false });
    d(); d();
    jest.advanceTimersByTime(200);
    expect(spy).toBeCalledTimes(0);
  });

  it('cancel prevents trailing call', () => {
    const spy = jest.fn();
    const d = debounce(spy, 100, { leading: false, trailing: true });
    d();
    d.cancel();
    jest.advanceTimersByTime(100);
    expect(spy).toBeCalledTimes(0);
  });
});
```

```ts index.ts 
export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface Debounced<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): ReturnType<F> | undefined;
  cancel(): void;
}

export function debounce<F extends (...args: any[]) => any>(
  fn: F,
  wait: number,
  options: DebounceOptions = {}
): Debounced<F> {
  // TODO: Implement me
  return undefined as any;
}
```

```ts index.test.ts 
import { debounce } from './index';

jest.useFakeTimers();

describe('debounce with leading & trailing (TS)', () => {
  it('trailing only by default', () => {
    const spy = jest.fn();
    const d = debounce(spy, 50);
    d(); d();
    jest.advanceTimersByTime(49);
    expect(spy).toBeCalledTimes(0);
    jest.advanceTimersByTime(1);
    expect(spy).toBeCalledTimes(1);
  });

  it('leading only', () => {
    const spy = jest.fn();
    const d = debounce(spy, 50, { leading: true, trailing: false });
    d(); d();
    expect(spy).toBeCalledTimes(1);
    jest.advanceTimersByTime(50);
    expect(spy).toBeCalledTimes(1);
  });

  it('leading & trailing', () => {
    const spy = jest.fn();
    const d = debounce(spy, 50, { leading: true, trailing: true });
    d();
    jest.advanceTimersByTime(25);
    d();
    jest.advanceTimersByTime(50);
    expect(spy).toBeCalledTimes(2);
  });

  it('leading false, trailing false => no call', () => {
    const spy = jest.fn();
    const d = debounce(spy, 50, { leading: false, trailing: false });
    d();
    jest.advanceTimersByTime(100);
    expect(spy).toBeCalledTimes(0);
  });

  it('cancel prevents trailing call', () => {
    const spy = jest.fn();
    const d = debounce(spy, 50);
    d();
    d.cancel();
    jest.advanceTimersByTime(50);
    expect(spy).toBeCalledTimes(0);
  });
});
```


