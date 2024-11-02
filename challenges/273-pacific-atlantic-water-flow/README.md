<!--info-header-start--><h1>Pacific Atlantic Water Flow <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23matrix-999" alt="#matrix"/> <img src="https://img.shields.io/badge/-%23dfs-999" alt="#dfs"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/273-pacific-atlantic-water-flow" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,273,undefined&title=273%20-%20Pacific%20Atlantic%20Water%20Flow%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A273+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->