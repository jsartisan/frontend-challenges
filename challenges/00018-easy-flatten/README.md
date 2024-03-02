<!--info-header-start--><h1>flatten <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23utility-999" alt="#utility"/> <img src="https://img.shields.io/badge/-%23lodash-999" alt="#lodash"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/00018-easy-flatten" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Lodash has a flatten utility that simplifies the process of flattening nested arrays. Could you create a custom function similar to Lodash's flatten?

Here's how Lodash's flatten works:

```javascript
_.flatten(array);
```

It takes an array and returns a new array with all nested arrays flattened to a single level.

Now, considering the following example:

```javascript
const arr = [1, [2], [3, [4]]];
```

Implement a function named `flatten` that mimics Lodash's flatten behavior. The function should accept an array and an optional depth parameter, which determines the level of flattening. If no depth is provided, the default depth should be assumed as 1.

For example:

```javascript
flatten(arr);
// Expected output: [1, 2, 3, [4]]

flatten(arr, 1);
// Expected output: [1, 2, 3, [4]]

flatten(arr, 2);
// Expected output: [1, 2, 3, 4]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,18,undefined&title=18%20-%20flatten&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A18+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->