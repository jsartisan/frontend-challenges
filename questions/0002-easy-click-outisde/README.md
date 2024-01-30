<!--info-header-start--><h1>useClickOutside <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23react-999" alt="#react"/> <img src="https://img.shields.io/badge/-%23event%20listeners-999" alt="#event listeners"/> <img src="https://img.shields.io/badge/-%23hooks-999" alt="#hooks"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://localhost:8080/0002-easy-click-outisde" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a custom hook useClickOutside to handle the click outside of the passed ref element. The hook takes a callback function which will be invoked when the user clicks outside of the passed ref element.

```js
const ref = useRef(null);

useClickOutside(ref, () => {
  console.log("clicked outside");
});
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?labels=answer,2,undefined&title=2%20-%20useClickOutside&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A2+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
