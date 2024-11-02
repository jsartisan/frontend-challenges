Given a grid of size `m x n`, count the number of unique paths from top-left to bottom-right corner.

Rules:
- Can only move right or down at each step
- Must reach bottom-right corner
- All paths must be unique
- Result will fit in 32-bit integer

**Constraints:**
- 1 ≤ m, n ≤ 100

**Examples:**
```typescript
// Example 1:
console.log(uniquePaths(3, 6));
// Output: 21
// Explanation: 21 different ways to reach bottom-right

// Example 2:
console.log(uniquePaths(3, 3));
// Output: 6
// Explanation: 6 different ways in 3x3 grid
```
