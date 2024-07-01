The following code creates an array of functions. Every function is meant to output its number. But something is wrong:

```js index.js
function createFunctions() {
  let functions = [];

 let i = 0;
  while (i < 10) {
    let func = function() {
      console.log(i);
    };
    functions.push(func); 
    i++;
  }

  return functions;
}

const funcs = createFunctions();

// all functions show 10 instead of their numbers 0, 1, 2, 3...
funcs[0](); // 10 from the function at index 0
funcs[1](); // 10 from the function at index 1
funcs[2](); // 10 ...and so on.
```

Why do all of the functions show the same value?

Fix the code so that they work as intended.
