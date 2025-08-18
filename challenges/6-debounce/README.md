<!--info-header-start--><h1>Debounce <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23closure-999" alt="#closure"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/6-debounce" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a simple debounce function in JavaScript. The function should take another function as its argument and return a new function that delays invoking the original function until after a specified time has elapsed since the last time the new function was invoked. Ensure that the debounced function is not called more than once within the specified time interval.

**Example**

```js
function originalFunction() {
  console.log("Function invoked!");
}

const debouncedFunction = debounce(originalFunction, 500);

// The original function should be invoked
//only once after 500 milliseconds
debouncedFunction(); // No immediate output
debouncedFunction(); // No immediate output

// Wait for 500 milliseconds
// Output: "Function invoked!"
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,6,undefined&title=6%20-%20Debounce%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A6+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
