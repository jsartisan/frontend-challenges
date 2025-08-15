What will be the output in console for the following code:

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

let work = makeWorker();

work(); // what will it show?
```
