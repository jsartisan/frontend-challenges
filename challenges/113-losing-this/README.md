<!--info-header-start--><h1>Losing this <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/113-losing-this" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

In JavaScript, the value of this can be "lost" when a method is passed as a callback or used separately from its object. This often happens with functions like setTimeout.

Consider the following code:

```js index.js
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  },
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

Explain why the output of the above code is undefined instead of "John". Also, Explain what can we do to ensure that `this` inside sayHi refers to the user object, even when passed to setTimeout.

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,113,quiz&title=113%20-%20Losing%20this%20-%20undefined" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A113+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
