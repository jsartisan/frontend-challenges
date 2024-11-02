<!--info-header-start--><h1>Kth Smallest Integer in BST <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--search--tree-999" alt="#binary-search-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/249-kth-smallest-integer-in-bst" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) in the tree.

A binary search tree satisfies the following constraints:
- Left subtree contains only values less than node's value
- Right subtree contains only values greater than node's value
- Both subtrees must also be valid BSTs

**Constraints:**
- 1 ≤ k ≤ Number of nodes in tree ≤ 1000
- 0 ≤ Node values ≤ 1000

**Examples:**
```typescript
// Example 1:
//     2
//    / \
//   1   3
const root1 = createTree([2, 1, 3]);
console.log(kthSmallest(root1, 1));
// Output: 1

// Example 2:
//     4
//    / \
//   3   5
//  /
// 2
const root2 = createTree([4, 3, 5, 2]);
console.log(kthSmallest(root2, 4));
// Output: 5
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,249,undefined&title=249%20-%20Kth%20Smallest%20Integer%20in%20BST%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A249+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->