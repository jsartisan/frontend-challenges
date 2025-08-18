The error occurs because the `Student` class constructor does not call the `super` constructor of the `Person` class. In JavaScript, when a class extends another class, the derived class's constructor must call `super()` before accessing `this`.

To fix this, you need to call `super(name)` in the `Student` constructor before you can use `this`. Here's the corrected code:

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name, studentId) {
    // Call the constructor of the Person class
    super(name);
    this.studentId = studentId;
  }
}

// Works correctly now
let student = new Student("Pawan Kumar", 1);
console.log(student.name); // Output: Pawan Kumar
console.log(student.studentId); // Output: 1
```
