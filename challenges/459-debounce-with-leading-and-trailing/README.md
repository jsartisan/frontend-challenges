Build an enhanced `debounce` utility that mirrors Lodash‐style options for **`leading`** and **`trailing`** execution.

A debounced function delays invocation of `fn` until after it has not been called for `wait` milliseconds.  The optional `options` object fine-tunes this behaviour:

| Option    | Default | Description                                                     |
|-----------|---------|-----------------------------------------------------------------|
| `leading` | `false` | If `true`, invoke `fn` **immediately** on the first call.        |
| `trailing`| `true`  | If `true`, invoke `fn` **after** the final call in the window.   |

When **both** `leading` and `trailing` are `false`, `fn` is never executed.

### Signature

```ts
function debounce<F extends (...args: any[]) => any>(
  fn: F,
  wait: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  }
): F & { cancel(): void };
```

### Behaviour Requirements

1. While the debounced wrapper is called repeatedly, schedule / reschedule timers so `fn` conforms to the `leading` and `trailing` semantics.
2. The wrapper returns the **result of the most recent actual execution** of `fn` (or `undefined` if never executed).
3. Provide a `cancel()` method that clears pending trailing invocations and resets internal state.
4. Assume `setTimeout` / `clearTimeout` are available (test harness may provide mocks).

### Timing Examples (wait = 3 ms)

```
Input calls timeline:   ─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G

{leading:false, trailing:true}:          ─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G
{leading:true, trailing:true}:           ─ A ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ E ─ ─ ─ ─ ─ ─ G
{leading:true, trailing:false}:          ─ A ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ E
{leading:false, trailing:false}:         (no output)
```
