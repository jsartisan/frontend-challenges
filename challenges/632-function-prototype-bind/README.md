`bind` is how you hand a method to someone else (an event listener, a timer, a callback prop) without losing its `this`. It looks tiny, but a faithful version has to cover pre-filled arguments, re-binding and being used as a constructor with `new`.

Write a function `bind(fn, thisArg, ...boundArgs)` that behaves like `fn.bind(thisArg, ...boundArgs)`, **without** calling the built-in `Function.prototype.bind`.

```ts
const cart = {
  currency: "EUR",
  total(this: { currency: string }, base: number, tax: number) {
    return `${base + tax} ${this.currency}`;
  },
};

const withBase = bind(cart.total, cart, 100);
withBase(21); // "121 EUR"

setTimeout(withBase, 0, 5); // "105 EUR", `this` is still `cart`

function User(this: any, role: string, name: string) {
  this.role = role;
  this.name = name;
}
const Admin = bind(User, null, "admin");
const ana = new Admin("Ana"); // { role: "admin", name: "Ana" }
ana instanceof User; // true
```

**Rules**

- The returned function calls `fn` with `this` set to `thisArg` and with `boundArgs` placed before the arguments it receives.
- The bound `this` is final: `call`, `apply` or calling it as a method of another object does not change it. Binding an already bound function again keeps the first `this` but still adds the new arguments.
- It returns whatever `fn` returns and lets errors thrown by `fn` propagate.
- When the bound function is called with `new`, ignore `thisArg`: create a fresh instance whose prototype is `fn.prototype`, run `fn` on it with the combined arguments, and return the instance (or the object `fn` returned, if it returned one). The result must pass `instanceof fn`.
- Throw a `TypeError` if `fn` is not a function.

Related: [this](https://frontend-challenges.com/challenges/66-this) and [Losing this](https://frontend-challenges.com/challenges/113-losing-this).
