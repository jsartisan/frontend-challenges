Memoization is a widely used technique in programming to optimize performance by caching the results of expensive function calls. Implement a general memo function in JavaScript that caches the results of function calls based on the arguments passed in. The memo function should return the cached result if the same arguments are provided again, without re-evaluating the function.

Use the following function as an example:

```js index.js
const factorial = (n) => {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

const memoedFactorial = memo(factorial);

console.log(memoedFactorial(5)); 
// Output: 120 (factorial is called)

console.log(memoedFactorial(5)); 
// Output: 120 (returned right away without calling factorial)

console.log(memoedFactorial(6));
// Output: 720 (new argument, so factorial is called)
```

Your task is to complete the implementation of the memo function and ensure it behaves as described above.
