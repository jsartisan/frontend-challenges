<!--info-header-start--><h1>memo <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23performance-999" alt="#performance"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/55-memo" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,55,undefined&title=55%20-%20memo%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A55+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->