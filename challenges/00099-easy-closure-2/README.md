<!--info-header-start--><h1>Closure 2 <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23closure-999" alt="#closure"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/00099-easy-closure-2" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,99,undefined&title=99%20-%20Closure%202%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A99+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->