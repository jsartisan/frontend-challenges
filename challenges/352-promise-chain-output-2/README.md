What will be the order of the following code: 

```js
Promise.resolve(1)
  .then((val) => {
    console.log(val)
    return val + 1
  }).then((val) => {
    console.log(val)
  }).then((val) => {
    console.log(val)
    return Promise.resolve(3)
      .then((val) => {
        console.log(val)
      })
  }).then((val) => {
    console.log(val)
    return Promise.reject(4)
  }).catch((val) => {
    console.log(val)
  }).finally((val) => {
    console.log(val)
    return 10
  }).then((val) => {
    console.log(val)
  })
```
