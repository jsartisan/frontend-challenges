Given a 2D grid where:
- '1' represents land
- '0' represents water

Count the number of islands. An island is:
- Formed by connecting adjacent lands horizontally or vertically
- Surrounded by water
- Edges of the grid are considered water

**Constraints:**
- 1 ≤ grid dimensions ≤ 100
- grid cells contain only '0' or '1'

**Examples:**
```typescript
// Example 1:
const grid1 = [
  ["0","1","1","1","0"],
  ["0","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
console.log(numIslands(grid1));
// Output: 1
// Explanation: One island connected horizontally and vertically

// Example 2:
const grid2 = [
  ["1","1","0","0","1"],
  ["1","1","0","0","1"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];
console.log(numIslands(grid2));
// Output: 4
// Explanation: Four separate islands
```
