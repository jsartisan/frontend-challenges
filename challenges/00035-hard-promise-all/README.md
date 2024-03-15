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
