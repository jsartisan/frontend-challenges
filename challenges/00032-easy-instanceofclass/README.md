Implement a function that verifies whether an object is an instance of a particular class. This function should take both the object and the class as parameters.

```
class A {}
class B extends A {}

let objB = new B()
instanceOfClass(objB , B) // true
instanceOfClass(objB, A) // true

class C {}
instanceOfClass(objB, C) // false
```
