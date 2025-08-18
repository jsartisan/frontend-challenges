<!--info-header-start--><h1>Promise.any <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23promise-999" alt="#promise"/></h1><blockquote><p>by Nitish Rajput <a href="https://github.com/nitish8899" target="_blank">@nitish8899</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/43-promise-any" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

According to the MDN documentation, the Promise.any() method is designed to return a promise as soon as any of the promises in the iterable are resolved. This feature is particularly useful when you have multiple asynchronous operations and are interested in the result of the first one to complete successfully.

```js
const promise1 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("First failed")), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second success"), 500));
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Third failed")), 1500));

Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log("First resolved promise:", result);
    // This will print "Second success"
  })
  .catch((errors) => {
    console.error("All promises rejected:", errors);
    // This will not be reached as promise2 resolves first
  });
```

Implement your own version of the Promise.any() method in JavaScript. This function should take an array of promises as input and return a single Promise. The returned Promise should resolve as soon as any of the input promises resolve, providing the value of the first resolved promise. If all input promises are rejected, the returned Promise should reject with an AggregateError containing all rejection reasons. Ensure your implementation handles both resolved and rejected promises efficiently.

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,43,undefined&title=43%20-%20Promise.any%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A43+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
