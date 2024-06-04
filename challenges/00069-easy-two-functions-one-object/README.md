Is it possible to create two constructor functions, A and B, such that new A() is equal to new B() when compared using the == operator?

Given the following setup:

```js
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert(a == b); // true
```

Provide the implementations for A and B that satisfy the condition a == b.
