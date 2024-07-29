What will be output of following code:

```js index.js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }
}

console.log(typeof User);
console.log(User.prototype);
console.log(User.prototype.constructor);
console.log(Object.getOwnPropertyNames(User.prototype));
```

This challenge tests your knowledge about how "class" syntax actually do under the hood.
