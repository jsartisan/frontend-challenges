Currying is a functional-programming technique that transforms a function with **N** parameters into a series of functions that each take one or more of those parameters.  
In everyday JavaScript development, currying enables elegant composition patterns and partial application.

Your task is to write a generic `curry` helper.

### Function signature

```ts
function curry<F extends (...args: any[]) => any>(fn: F): Curried<F>;
```

`Curried<F>` must satisfy these rules at runtime:

1. The returned function keeps accepting arguments until it has received **all** parameters required by the original `fn`.
2. Each call may supply **one or more** arguments.
3. Once the total argument count is met, invoke `fn` and return its result.
4. Additional calls after completion are out of scope and may be ignored.

### Examples

```ts
const join = (a: string | number, b: string | number, c: string | number) => `${a}_${b}_${c}`;
const curriedJoin = curry(join);

curriedJoin(1, 2, 3);     // '1_2_3'
curriedJoin(1)(2, 3);      // '1_2_3'
curriedJoin(1, 2)(3);      // '1_2_3'
```

Further reading:
- https://en.wikipedia.org/wiki/Currying
- https://javascript.info/currying-partials
- https://lodash.com/docs/#curry
