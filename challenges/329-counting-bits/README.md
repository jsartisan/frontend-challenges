<!--info-header-start--><h1>Counting Bits <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23bit--manipulation-999" alt="#bit-manipulation"/> <img src="https://img.shields.io/badge/-%23dynamic--programming-999" alt="#dynamic-programming"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/329-counting-bits" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an integer `n`, return an array where `output[i]` is the number of 1's in the binary representation of `i` for all numbers from 0 to n.

Rules:

- Return array of length n+1
- Each element represents count of 1's in binary form of index
- Array starts from 0 and goes up to n

**Constraints:**

- 0 ≤ n ≤ 1000

**Examples:**

```typescript
// Example 1:
console.log(countBits(4));
// Output: [0,1,1,2,1]
// Explanation:
// 0 -> 0     -> 0 ones
// 1 -> 1     -> 1 one
// 2 -> 10    -> 1 one
// 3 -> 11    -> 2 ones
// 4 -> 100   -> 1 one
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,329,undefined&title=329%20-%20Counting%20Bits%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A329+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
