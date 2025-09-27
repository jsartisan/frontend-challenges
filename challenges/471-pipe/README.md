Function composition is a powerful technique where you combine multiple functions into a single function that executes them in sequence. Create a `pipe` utility that chains functions together from left to right.

### Signature

```ts
function pipe<T>(functions: Array<(arg: T) => T>): (arg: T) => T
```

### Behavior

1. **Input**: An array of functions that each accept one argument and return a value of the same type.
2. **Output**: A new function that applies each function in sequence, passing the result of one as input to the next.
3. **Execution**: Functions are applied from left to right (first to last in the array).

### Examples

```ts
const times = (y) => (x) => x * y;
const plus = (y) => (x) => x + y;
const subtract = (y) => (x) => x - y;
const divide = (y) => (x) => x / y;

const multiplyBy6 = pipe([times(2), times(3)]);
multiplyBy6(4); // (4 * 2) * 3 = 24

const complex = pipe([times(2), plus(3), times(4)]);
complex(5); // ((5 * 2) + 3) * 4 = 52
```

Further reading: https://whatthefuck.is/composition
