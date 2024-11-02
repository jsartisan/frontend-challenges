<!--info-header-start--><h1>Binary Tree Maximum Path Sum <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--tree-999" alt="#binary-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/253-binary-tree-maximum-path-sum" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given the root of a non-empty binary tree, find the maximum path sum of any non-empty path.

A path in a binary tree:
- Is a sequence of nodes where each pair of adjacent nodes is connected
- Each node can appear only once
- Does not need to pass through the root
- Can start and end at any nodes

The path sum is the sum of all node values in the path.

**Constraints:**
- 1 ≤ Number of nodes ≤ 1000
- -1000 ≤ Node values ≤ 1000

**Examples:**
```typescript
// Example 1:
//     1
//    / \
//   2   3
const root1 = createTree([1, 2, 3]);
console.log(maxPathSum(root1));
// Output: 6
// Explanation: Path 2 -> 1 -> 3 gives sum 2 + 1 + 3 = 6

// Example 2:
//      -15
//      /  \
//    10    20
//         /  \
//       15    5
//      /
//    -5
const root2 = createTree([-15, 10, 20, null, null, 15, 5, -5]);
console.log(maxPathSum(root2));
// Output: 40
// Explanation: Path 15 -> 20 -> 5 gives sum 15 + 20 + 5 = 40
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,253,undefined&title=253%20-%20Binary%20Tree%20Maximum%20Path%20Sum%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A253+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->