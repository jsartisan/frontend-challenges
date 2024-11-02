<!--info-header-start--><h1>Rotate Matrix <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23matrix-999" alt="#matrix"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/321-rotate-matrix" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an n x n matrix, rotate it 90 degrees clockwise in-place.

Rules:
- Matrix is square (n x n)
- Must modify original matrix (in-place)
- Do not create another 2D matrix
- Rotate clockwise (90 degrees)

**Constraints:**
- n == matrix.length == matrix[i].length
- 1 ≤ n ≤ 20
- -1000 ≤ matrix[i][j] ≤ 1000

**Examples:**
```typescript
// Example 1: 2x2 matrix
let matrix1 = [
  [1,2],
  [3,4]
];
rotate(matrix1);
console.log(matrix1);
// Output: [
//   [3,1],
//   [4,2]
// ]

// Example 2: 3x3 matrix
let matrix2 = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
rotate(matrix2);
console.log(matrix2);
// Output: [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,321,undefined&title=321%20-%20Rotate%20Matrix%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A321+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->