Consider the following code:

```js
function createUser() {
  return {
    name: "John Doe",
    ref: this
  };
}

let user = createUser();

alert( user.ref.name ); // What's the result?
```

What is the result of accessing its ref? Why?
