<!--info-header-start--><h1>minBy <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/00145-easy-minby" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a function similar to `_.minBy` from the Lodash library. The function `minBy` takes an array of objects and an iteratee (a function that extracts the value to be compared from each object) and returns the object with the minimum value. If the array is empty, it should return `undefined`.

**Example Usage**:
```js
const users = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 1 }
];

const youngest = minBy(users, o => o.age);
console.log(youngest); // { user: 'pebbles', age: 1 }
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,145,undefined&title=145%20-%20minBy%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A145+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->