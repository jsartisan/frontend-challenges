What will be output of following code:

```js
function User(name) {
  this.name = name;
}

let user1 = new User('John');

console.log(user1.name); // ?
console.log(user1.constructor === User); // ?

User.prototype = {}; 

let user2 = new user1.constructor('Pete');

console.log( user2.name ); // ?
console.log(user12constructor === User) // ?
```
