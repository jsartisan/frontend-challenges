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
