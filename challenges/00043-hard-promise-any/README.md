According to the MDN documentation, the Promise.any() method is designed to return a promise as soon as any of the promises in the iterable are resolved. This feature is particularly useful when you have multiple asynchronous operations and are interested in the result of the first one to complete successfully.

```js
const promise1 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('First failed')), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second success'), 500));
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Third failed')), 1500));

Promise.any([promise1, promise2, promise3])
    .then(result => {
        console.log('First resolved promise:', result);
        // This will print "Second success"
    })
    .catch(errors => {
        console.error('All promises rejected:', errors);
        // This will not be reached as promise2 resolves first
    });

```

Implement your own version of the Promise.any() method in JavaScript. This function should take an array of promises as input and return a single Promise. The returned Promise should resolve as soon as any of the input promises resolve, providing the value of the first resolved promise. If all input promises are rejected, the returned Promise should reject with an AggregateError containing all rejection reasons. Ensure your implementation handles both resolved and rejected promises efficiently.
