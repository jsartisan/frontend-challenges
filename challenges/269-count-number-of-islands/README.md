<!--info-header-start--><h1>Count Number of Islands <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23matrix-999" alt="#matrix"/> <img src="https://img.shields.io/badge/-%23dfs-999" alt="#dfs"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/269-count-number-of-islands" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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
  ["0", "1", "1", "1", "0"],
  ["0", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
];
console.log(numIslands(grid1));
// Output: 1
// Explanation: One island connected horizontally and vertically

// Example 2:
const grid2 = [
  ["1", "1", "0", "0", "1"],
  ["1", "1", "0", "0", "1"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];
console.log(numIslands(grid2));
// Output: 4
// Explanation: Four separate islands
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,269,undefined&title=269%20-%20Count%20Number%20of%20Islands%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A269+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
