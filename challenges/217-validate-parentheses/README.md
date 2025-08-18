<!--info-header-start--><h1>Validate Parentheses <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/> <img src="https://img.shields.io/badge/-%23stack-999" alt="#stack"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/217-validate-parentheses" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Write a function that takes a string `s` containing bracket characters: '(', ')', '{', '}', '[', ']'.

Determine if the string is valid by checking these rules:

1. Each opening bracket must have a matching closing bracket of the same type
2. Brackets must be closed in the proper nested order
3. A closing bracket can only close a matching opening bracket

The function should return `true` for valid bracket strings, and `false` for invalid ones.

**Constraints:**

- 1 ≤ s.length ≤ 1000
- s consists of parentheses only '()[]{}'

**Examples:**

```typescript
// Example 1:
const s1 = "[]";
console.log(isValid(s1));
// Output: true

// Example 2:
const s2 = "([{}])";
console.log(isValid(s2));
// Output: true

// Example 3:
const s3 = "[(])";
console.log(isValid(s3));
// Output: false
// Explanation: The brackets are not closed in the correct order.
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,217,undefined&title=217%20-%20Validate%20Parentheses%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A217+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
