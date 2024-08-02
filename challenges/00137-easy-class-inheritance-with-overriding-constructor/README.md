Consider the following code:

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, studentId) {
    this.name = name;
    this.studentId = studentId;
  }
}

// Doesn't work!
let student = new Student("Pawan Kumar", 1); // Error: this is not defined.
```

Why there is an error when creating object of student class? How to fix it?
