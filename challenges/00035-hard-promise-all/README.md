<!--info-header-start--><h1>Promise.all <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/00035-hard-promise-all" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

According to the MDN documentation, the Promise.all() method is designed to handle an iterable of promises as input and produces a single Promise. This Promise resolves into an array containing the results of all the input promises. This functionality proves valuable when managing multiple asynchronous operations that must be completed before advancing to subsequent tasks. Here's a practical example to illustrate its usage:

```
const promise1 = new Promise(resolve => setTimeout(() => resolve('Apple'), 500));
const promise2 = 'Banana';
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve("Orange");
  }, 1000);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
}).catch(error => {
  console.error('At least one promise rejected:', error.message);
});

// The above code will give output: ["Apple", "Banana", "Orange"]
```

Implement your own version of the `Promise.all()` method in JavaScript. This function should take an array of promises as input and return a single Promise that resolves to an array containing the results of all input promises. Remember that Promise.all() should reject if any of the input promises are rejected, with the first rejection message or error. Ensure your implementation handles asynchronous operations correctly and maintains the order of the input promises.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,35,undefined&title=35%20-%20Promise.all&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A35+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->