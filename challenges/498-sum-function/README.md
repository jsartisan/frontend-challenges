Create a `sum()` function that supports currying and chaining. The function should allow partial application and infinite chaining of arguments.

### Requirements

1. **Currying support** – `sum(1)` returns a function that can accept more arguments
2. **Chaining** – `sum(1)(2)(3)` should work and return the total sum
3. **Value comparison** – when compared with `==`, it should return the numeric sum
4. **Flexible arguments** – support any number of arguments in any combination

### Key Behaviors

- **Partial application** – `sum(1)` returns a function
- **Infinite chaining** – `sum(1)(2)(3)...` continues indefinitely
- **Value coercion** – the returned function should coerce to its numeric value
- **Multiple arguments** – each call can accept multiple arguments

### Example

```js
const sum1 = sum(1);
sum1(2) == 3;           // true
sum1(3) == 4;           // true

sum(1)(2)(3) == 6;      // true
sum(5)(-1)(2) == 6;     // true
sum(1, 2)(3) == 6;      // true (if multiple args supported)
```

### Signature

```ts
function sum(...args: number[]): SumFunction;
interface SumFunction {
  (...args: number[]): SumFunction;
  valueOf(): number;
}
```

### Key Challenge

The function needs to return an object that behaves like both a function (for chaining) and a number (for comparison).
