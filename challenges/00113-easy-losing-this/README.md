In JavaScript, the value of this can be "lost" when a method is passed as a callback or used separately from its object. This often happens with functions like setTimeout.

Consider the following code:

```js index.js
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

Explain why the output of the above code is undefined instead of "John". Also, Explain what can we do to ensure that `this` inside sayHi refers to the user object, even when passed to setTimeout.
