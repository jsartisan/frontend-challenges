Implement a `clearAllTimeout()` function that cancels all active timers created with `setTimeout()`. This is particularly useful for cleaning up timers before page transitions or when you need to cancel all pending asynchronous operations.

### Requirements

1. **Track all timers** – Keep track of every timer ID created by `setTimeout()`
2. **Clear all timers** – Provide a function to cancel all active timers at once
3. **Preserve original API** – Maintain the same interface for `setTimeout()` and `clearTimeout()`
4. **Handle edge cases** – Work correctly when no timers exist or when called multiple times
5. **Global functionality** – Replace the global `setTimeout()` and `clearTimeout()` functions

### Key Behaviors

- **Timer tracking** – Store all timer IDs internally for batch clearing
- **Original functionality** – `setTimeout()` and `clearTimeout()` work exactly as before
- **Batch clearing** – `clearAllTimeout()` cancels all pending timers
- **No side effects** – Clearing doesn't affect the original timer API behavior
- **Memory management** – Properly clean up timer references after clearing

### Example

```js
// Replace global setTimeout and clearTimeout
setTimeout(func1, 10000);
setTimeout(func2, 10000);
setTimeout(func3, 10000);

// All 3 functions are scheduled 10 seconds later
clearAllTimeout();

// All scheduled tasks are cancelled

// Original API still works
const timerId = setTimeout(() => console.log('delayed'), 1000);
clearTimeout(timerId); // This specific timer is cleared
```

### Key Challenge

The function must intercept and track all `setTimeout()` calls while preserving the original API behavior and providing a way to clear all timers at once.
