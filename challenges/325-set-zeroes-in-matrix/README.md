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
  [0,1],
  [1,1]
];
setZeroes(matrix1);
console.log(matrix1);
// Output: [
//   [0,0],
//   [0,1]
// ]

// Example 2: 3x3 matrix
let matrix2 = [
  [1,2,3],
  [4,0,5],
  [6,7,8]
];
setZeroes(matrix2);
console.log(matrix2);
// Output: [
//   [1,0,3],
//   [0,0,0],
//   [6,0,8]
// ]
```
