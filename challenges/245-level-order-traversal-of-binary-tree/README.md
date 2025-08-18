<!--info-header-start--><h1>Level Order Traversal of Binary Tree <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--tree-999" alt="#binary-tree"/> <img src="https://img.shields.io/badge/-%23bfs-999" alt="#bfs"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/245-level-order-traversal-of-binary-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a binary tree `root`, return its level order traversal as a nested array, where each subarray contains the values of nodes at a particular level in the tree, from left to right.

**Constraints:**

- 0 ≤ Number of nodes in the tree ≤ 1000
- -1000 ≤ Node values ≤ 1000

**Examples:**

```typescript
// Example 1:
//        1
//      /   \
//     2     3
//    / \   / \
//   4   5 6   7
const root1 = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(levelOrder(root1));
// Output: [[1], [2, 3], [4, 5, 6, 7]]

// Example 2:
//   1
const root2 = createTree([1]);
console.log(levelOrder(root2));
// Output: [[1]]

// Example 3:
const root3 = createTree([]);
console.log(levelOrder(root3));
// Output: []

// Example 4:
//        1
//      /   \
//     2     3
//      \     \
//       4     5
const root4 = createTree([1, 2, 3, null, 4, null, 5]);
console.log(levelOrder(root4));
// Output: [[1], [2, 3], [4, 5]]
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,245,undefined&title=245%20-%20Level%20Order%20Traversal%20of%20Binary%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A245+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
