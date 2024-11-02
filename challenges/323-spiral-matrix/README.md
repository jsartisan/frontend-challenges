Given an m x n matrix, return all elements in spiral order (clockwise from outside to inside).

Rules:
- Start from top-left corner
- Move in clockwise direction
- Visit each element exactly once
- Return elements in order visited

**Constraints:**
- 1 ≤ matrix.length, matrix[i].length ≤ 10
- -100 ≤ matrix[i][j] ≤ 100

**Examples:**
```typescript
// Example 1: 2x2 matrix
console.log(spiralOrder([[1,2],[3,4]]));
// Output: [1,2,4,3]

// Example 2: 3x3 matrix
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));
// Output: [1,2,3,6,9,8,7,4,5]

// Example 3: 3x4 matrix
console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]));
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```
