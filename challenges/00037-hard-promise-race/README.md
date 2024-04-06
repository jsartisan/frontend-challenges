<!--info-header-start--><h1>Promise.race <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Ashutosh Barthwal <a href="https://github.com/ashutoshbarthwal" target="_blank">@ashutoshbarthwal</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/00037-hard-promise-race" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

According to the MDN documentation, the `Promise.race()` method is used to return a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise. This feature is particularly useful when you have multiple asynchronous operations and only need the result of the first one to complete.

For e.g:

```js
const promise1 = new Promise(resolve => setTimeout(() => resolve('First'), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second'), 500));
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Third')), 2000));

Promise.race([promise1, promise2, promise3])
    .then(result => {
        console.log('First promise to resolve:', result);
        // This will print "Second"
    })
    .catch(error => {
        console.error('First promise to reject:', error.message);
        // This will not be reached as promise2 resolves first
    });
```

Your task is to implement your own version of the `Promise.race()` method in JavaScript. This function should take an array of promises as input and return a single Promise that resolves or rejects as soon as the first promise in the array resolves or rejects, providing the value or reason from that promise. Ensure your implementation correctly handles both resolved and rejected promises, maintaining the order of completion.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,37,undefined&title=37%20-%20Promise.race%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A37+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->