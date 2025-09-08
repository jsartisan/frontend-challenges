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
import { throttle } from "./index";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("throttle", () => {
  it("calls function immediately when leading is true", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled("A");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
  });

  it("waits before next call within delay", async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled("A");
    throttled("B");

    expect(fn).toHaveBeenCalledTimes(1); // only leading so far

    await wait(120); // wait for throttle delay to pass

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("B");
  });

  it("supports disabling leading", async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { leading: false });

    throttled("A"); // should not call immediately
    expect(fn).not.toHaveBeenCalled();

    await wait(120);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
  });

  it("supports disabling trailing", async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { trailing: false });

    throttled("A"); // leading call
    throttled("B");

    await wait(120);

    // trailing disabled, so only leading executed
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
  });
});
```


