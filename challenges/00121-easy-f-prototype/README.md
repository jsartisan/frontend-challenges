What would be the output of following code:

```js
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit1 = new Rabbit();

console.log(rabbit1.eats); // ?

Rabbit.prototype = {
  eats: false
};

cont rabbit2 = new Rabbit();

console( rabbit1.eats ); // ?
console( rabbit2.eats ); // ?
```
