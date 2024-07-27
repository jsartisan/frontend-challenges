We have a "User" constructor function that accepts name and date of birth. 

```js index.js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}
```

Now, we want to add an age property as well but this should be calcuated based on the date of birth. What is the most efficient way of doing it so that the following code works:

```
let pawan = new User("Pawan Kumar", new Date(1993, 29, 1));

console.log( pawan.age ); // 31
```
