<!--info-header-start--><h1>Decode Ways <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23dynamic--programming-999" alt="#dynamic-programming"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/293-decode-ways" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a string `s` containing only digits, return the number of ways it can be decoded according to:

```
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

Rules:

- Each digit or pair of digits must map to a valid letter (1-26)
- No leading zeros allowed in groups
- Multiple valid groupings are counted separately

**Constraints:**

- 1 ≤ s.length ≤ 100
- s contains only digits

**Examples:**

```typescript
// Example 1:
console.log(numDecodings("12"));
// Output: 2
// Explanation: Two ways to decode:
// - 1,2 -> "AB"
// - 12 -> "L"

// Example 2:
console.log(numDecodings("01"));
// Output: 0
// Explanation: Leading zero makes this invalid
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,293,undefined&title=293%20-%20Decode%20Ways%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A293+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
