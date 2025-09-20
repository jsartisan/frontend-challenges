A **throttle** function returns a rate-limited wrapper that ensures a target function is **not invoked more often than once every `wait` milliseconds**.  
This specification adds support for the common **`leading`** and **`trailing`** options found in utility libraries such as Lodash.

### Signature

```ts
function throttle<F extends (...args: any[]) => any>(
  fn: F,
  wait: number,
  options?: {
    leading?: boolean;   // invoke on the first call immediately (default true)
    trailing?: boolean;  // invoke after the last call in the period (default true)
  }
): F;
```

### Behaviour Requirements

1. **Rate limiting** – between two allowed executions separated by `wait` ms, additional calls are **ignored** or **deferred** according to the options.
2. **`leading` option** (default `true`) – if `false`, the function is not called on the first trigger within the window.
3. **`trailing` option** (default `true`) – if `true`, the last call in a window is executed after the window ends.
4. **Return value** – the throttled function returns the value from the most recent actual execution of `fn` (or `undefined` if none yet).
5. The throttled function exposes `cancel()` to clear any pending trailing invocation.

### Example

```ts
const fn = jest.fn();
const throttled = throttle(fn, 100, { leading: false, trailing: true });

throttled();   // nothing yet
throttled();   // ignored within 100 ms window
// …after 100 ms → fn is called exactly once
```
