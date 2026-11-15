Dashboards and reports constantly need to bucket a flat list: orders by status, logs by day, products by category. Write a function `groupBy(items, iteratee)` that splits an array into groups and returns an object that maps each group key to the items in it.

`iteratee` decides the key for each item. It is either:

- a **function** `(item, index) => key`, or
- a **property name**, in which case the key is `item[propertyName]`.

```ts
groupBy(["one", "two", "three", "four"], (word) => word.length);
// { "3": ["one", "two"], "4": ["four"], "5": ["three"] }

const orders = [
  { id: "a1", status: "shipped" },
  { id: "b2", status: "pending" },
  { id: "c3", status: "shipped" },
];
groupBy(orders, "status");
// {
//   shipped: [{ id: "a1", ... }, { id: "c3", ... }],
//   pending: [{ id: "b2", ... }],
// }
```

**Rules**

- Every key is converted to a string, so `1`, `true`, `null` and `undefined` become `"1"`, `"true"`, `"null"` and `"undefined"`.
- Items in each group keep their original order and are the same references as in the input (no copies).
- Do not mutate the input array. An empty array gives `{}`.
- Any string can be a key, including ones like `"constructor"`, `"toString"` or `"__proto__"`. Each of them must end up as its own group holding an array, not clash with something the result object inherits.
