Implement a **sampling function** in TypeScript.
The function should take two arguments:

1. A callback function.
2. A number `count`.

The returned function should only execute the callback **once every `count` calls**, and ignore execution on other calls.

### Example

```ts
const fn = () => console.log("Hello");
const sampled = sampling(fn, 3);

sampled(); // not executed
sampled(); // not executed
sampled(); // executed -> "Hello"
sampled(); // not executed
sampled(); // not executed
sampled(); // executed -> "Hello"
```

In this example, the callback executes only on every 3rd call.
