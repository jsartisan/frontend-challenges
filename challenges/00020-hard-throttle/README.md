<!--info-header-start--><h1>throttle <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23utility-999" alt="#utility"/> <img src="https://img.shields.io/badge/-%23lodash-999" alt="#lodash"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/00020-hard-throttle" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a simple throttle function in JavaScript. The function should accept another function as its argument and return a new function that limits the rate at which the original function can be invoked. This means that the original function will be called at most once within a specified time window, regardless of how many times the throttled function is invoked during that period.

Ensure that the throttled function does not call the original function more than once within the specified time interval.

For example:

```javascript
function originalFunction() {
  console.log("Function invoked!");
}

const throttledFunction = throttle(originalFunction, 500);

// The original function should be invoked 
// at most once within every 500 milliseconds
throttledFunction(); // Output: "Function invoked!"
throttledFunction(); // No immediate output
throttledFunction(); // No immediate output

// Wait for 500 milliseconds
throttledFunction(); // Output: "Function invoked!"
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?labels=answer,20,undefined&title=20%20-%20throttle&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A20+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->