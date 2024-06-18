<!--info-header-start--><h1>Array.prototype.filter <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/00074-easy-array-prototype-filter" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a custom `arrayFilter` function that mimics the behavior of the native `filter` method.

#### Arguments
The `arrayFilter` function should take an array and a callback function as arguments. The callback function should be invoked with three arguments: the current element, the index of the current element, and the array itself. 

#### Return Value
The `arrayFilter` function should return a new array containing all the elements for which the callback function returns a truthy value.

Use the following example to understand how the arrayFilter function should work:

```js index.js
const arrayFilter = (array, callback) => {
  // Your implementation here
};

const isEven = (num) => num % 2 === 0;

const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = arrayFilter(numbers, isEven);

console.log(evenNumbers);
// Output: [2, 4, 6]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,74,undefined&title=74%20-%20Array.prototype.filter%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A74+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->