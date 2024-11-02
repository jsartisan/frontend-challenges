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
