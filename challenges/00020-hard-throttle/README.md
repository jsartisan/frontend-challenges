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
