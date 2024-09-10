<!--info-header-start--><h1>reject <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/161-reject" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a `reject` function similar to `_.reject` from the Lodash library. The `reject` function takes an array and a predicate function, and returns a new array that excludes all elements for which the predicate function returns truthy.

**Requirements:**
1. The function should be named `reject`.
2. The function should take two arguments:
   - An array of elements.
   - A predicate function to test each element of the array.
3. The function should return a new array that excludes all elements for which the predicate function returns truthy.

**Example Usage:**

```js
const arr = [1, 2, 3, 4, 5];
const isEven = (num) => num % 2 === 0;
const result = reject(arr, isEven);
console.log(result); // [1, 3, 5]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,161,undefined&title=161%20-%20reject%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A161+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->