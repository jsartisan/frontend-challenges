Implement a utility function `throttle` that limits how often a target function can be invoked, supporting **both** leading and trailing execution.

### Requirements

* Signature:

  ```ts
  function throttle<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    options?: {
      leading?: boolean;  // default = true
      trailing?: boolean; // default = true
    },
  ): (...args: Parameters<T>) => ReturnType<T> | void;
  ```

* **Leading call** — if `leading` is `true`, the target function is invoked immediately on the first call.
* **Trailing call** — if `trailing` is `true`, the target function is invoked once more with the last arguments after the delay elapses.
* Subsequent calls within the `delay` window are ignored except for updating the arguments for the trailing call.
* If both `leading` and `trailing` are `false`, the wrapper should behave as a no-op throttle (simply returning `fn`).
* Return value for throttled calls should match the return type of `fn` when a call is actually executed; otherwise `undefined`.

### Example

```ts
const fn = jest.fn();
const throttled = throttle(fn, 100, { leading: true, trailing: true });

throttled('A'); // executes immediately → fn('A')
throttled('B'); // ignored, but stores args for trailing

// after ~100 ms → fn('B') executes once
```
