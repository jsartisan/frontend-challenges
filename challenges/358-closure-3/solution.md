**It shows “Pete”.**

## Why?

1. When `makeWorker()` runs, it creates a **Lexical Environment** for that call with `name = "Pete"`. The function it returns is created **together with a hidden internal property `[[Environment]]`** that stores a reference to this Lexical Environment. That reference is set at creation time.

2. Later, calling `work()` makes a new (empty) Lexical Environment for the call. To resolve variables, it follows the outer reference taken from `work.[[Environment]]`—which points back to the `makeWorker()` environment—so `name` is found there as `"Pete"`, not in the global where `name = "John"`.

```js
work(); // "Pete"
```

That’s exactly what a **closure** is: a function that remembers its outer variables via `[[Environment]]`.
