<!--info-header-start--><h1>Array.prototype.map <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/78-array-prototype-map" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a custom `arrayMap` function that mimics the behavior of the native `map` method.

The `arrayMap` function should take an array and a callback function as arguments. The callback function should be invoked with three arguments: the current element, the index of the current element, and the array itself. The `arrayMap` function should return a new array containing the results of applying the callback function to each element of the original array.

Use the following example to understand how the `arrayMap` function should work:

```javascript
const arrayMap = (array, callback) => {
  // Your implementation here
};

const multiplyByTwo = (num) => num * 2;

const numbers = [1, 2, 3, 4, 5, 6];
const doubledNumbers = arrayMap(numbers, multiplyByTwo);

console.log(doubledNumbers);
// Output: [2, 4, 6, 8, 10, 12]
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,78,undefined&title=78%20-%20Array.prototype.map%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A78+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
