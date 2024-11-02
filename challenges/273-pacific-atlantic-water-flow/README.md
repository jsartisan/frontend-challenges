Given a rectangular island represented by a matrix `heights` where `heights[r][c]` represents the height above sea level at position (r,c).

The island is surrounded by:
- Pacific Ocean: top and left edges
- Atlantic Ocean: bottom and right edges

Water flow rules:
- Can flow in four directions (up, down, left, right)
- Can only flow to cells of equal or lower height
- Can flow into oceans from adjacent cells

Return all cells where water can flow to both oceans, represented as `[row, col]` coordinates.

**Constraints:**
- 1 ≤ matrix dimensions ≤ 100
- 0 ≤ height values ≤ 1000

**Examples:**
```typescript
// Example 1:
const heights1 = [
  [4,2,7,3,4],
  [7,4,6,4,7],
  [6,3,5,3,6]
];
console.log(pacificAtlantic(heights1));
// Output: [[0,2],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[2,0]]
// Explanation: These cells can flow to both oceans

// Example 2:
const heights2 = [[1],[1]];
console.log(pacificAtlantic(heights2));
// Output: [[0,0],[1,0]]
// Explanation: Both cells can flow to both oceans
```
