<!--info-header-start--><h1>Valid Binary Search Tree <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--search--tree-999" alt="#binary-search-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/247-valid-binary-search-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given the root of a binary tree, determine if it's a valid binary search tree (BST).

A binary search tree is valid if:

- All nodes in the left subtree have values less than the current node
- All nodes in the right subtree have values greater than the current node
- Both left and right subtrees are also valid BSTs

**Constraints:**

- 1 ≤ Number of nodes ≤ 1000
- -1000 ≤ Node values ≤ 1000

**Examples:**

```typescript
// Example 1:
//     2
//    / \
//   1   3
const root1 = createTree([2, 1, 3]);
console.log(isValidBST(root1));
// Output: true

// Example 2:
//     1
//    / \
//   2   3
const root2 = createTree([1, 2, 3]);
console.log(isValidBST(root2));
// Output: false
// Explanation: Left child (2) is greater than root (1)
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,247,undefined&title=247%20-%20Valid%20Binary%20Search%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A247+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
