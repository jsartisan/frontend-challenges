<!--info-header-start--><h1>Lowest Common Ancestor in Binary Search Tree <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--search--tree-999" alt="#binary-search-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/243-lowest-common-ancestor-in-binary-search-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a binary search tree (BST) where all node values are unique, and two nodes `p` and `q`, find their lowest common ancestor (LCA).

The lowest common ancestor of two nodes is defined as the deepest node in the tree that has both nodes as descendants. A node can be considered a descendant of itself.

**Constraints:**

- 2 ≤ Number of nodes in the tree ≤ 100
- -100 ≤ Node values ≤ 100
- p ≠ q
- Both p and q exist in the BST

**Examples:**

```typescript
// Example 1:
//        5
//      /   \
//     3     8
//    / \   / \
//   1   4 7   9
//    \
//     2
const root1 = createTree([5, 3, 8, 1, 4, 7, 9, null, 2]);
const p1 = findNode(root1, 3);
const q1 = findNode(root1, 8);
console.log(lowestCommonAncestor(root1, p1, q1)?.val);
// Output: 5

// Example 2:
//        5
//      /   \
//     3     8
//    / \   / \
//   1   4 7   9
//    \
//     2
const root2 = createTree([5, 3, 8, 1, 4, 7, 9, null, 2]);
const p2 = findNode(root2, 3);
const q2 = findNode(root2, 4);
console.log(lowestCommonAncestor(root2, p2, q2)?.val);
// Output: 3
// Explanation: Node 3 is the LCA since it's the parent of 4
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,243,undefined&title=243%20-%20Lowest%20Common%20Ancestor%20in%20Binary%20Search%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A243+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
