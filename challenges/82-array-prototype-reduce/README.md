<!--info-header-start--><h1>Array.prototype.reduce <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/82-array-prototype-reduce" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a custom arrayReduce function that mimics the behavior of the native reduce method.

The arrayReduce function should take an array, a callback function, and an optional initial value. The callback function should be invoked with four arguments: the accumulator, the current element, the index of the current element, and the array itself. The arrayReduce function should return the final accumulated value.

Use the following example to understand how the arrayReduce function should work:

```js index.js
const arrayReduce = (array, callback, initialValue) => {
  // Your implementation here
};

const sum = (acc, curr) => acc + curr;

const numbers = [1, 2, 3, 4];
const result = arrayReduce(numbers, sum, 0);

console.log(result);
// Output: 10
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,82,undefined&title=82%20-%20Array.prototype.reduce%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A82+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
