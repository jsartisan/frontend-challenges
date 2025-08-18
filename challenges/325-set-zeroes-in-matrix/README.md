<!--info-header-start--><h1>Set Zeroes in Matrix <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23matrix-999" alt="#matrix"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/325-set-zeroes-in-matrix" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an m x n matrix, if an element is 0, set its entire row and column to 0's in-place.

Rules:

- Must modify original matrix (in-place)
- Set entire row and column to 0 for each 0 found
- Try to use O(1) extra space
- Original non-zero values remain unchanged if not in affected rows/columns

**Constraints:**

- 1 ≤ matrix.length, matrix[0].length ≤ 100
- -2^31 ≤ matrix[i][j] ≤ 2^31 - 1

**Examples:**

```typescript
// Example 1: 2x2 matrix
let matrix1 = [
  [0, 1],
  [1, 1],
];
setZeroes(matrix1);
console.log(matrix1);
// Output: [
//   [0,0],
//   [0,1]
// ]

// Example 2: 3x3 matrix
let matrix2 = [
  [1, 2, 3],
  [4, 0, 5],
  [6, 7, 8],
];
setZeroes(matrix2);
console.log(matrix2);
// Output: [
//   [1,0,3],
//   [0,0,0],
//   [6,0,8]
// ]
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,325,undefined&title=325%20-%20Set%20Zeroes%20in%20Matrix%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A325+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
