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


