<!--info-header-start--><h1>Invert a Binary Tree <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--tree-999" alt="#binary-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/235-invert-a-binary-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

You are given the root of a binary tree. Transform the tree by flipping it horizontally (mirror image) and return its root.

To invert the tree, each node's left and right children should be swapped.

**Constraints:**
- 0 ≤ Number of nodes in the tree ≤ 100
- -100 ≤ Node value ≤ 100

**Examples:**

```typescript
// Example 1:
//      1              1
//    /   \          /   \
//   2     3   =>   3     2
//  / \   / \      / \   / \
// 4   5 6   7    7   6 5   4
const root1 = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(invertTree(root1));
// Output: [1, 3, 2, 7, 6, 5, 4]

// Example 2:
//   3        3
//  / \  =>  / \
// 2   1    1   2
const root2 = createTree([3, 2, 1]);
console.log(invertTree(root2));
// Output: [3, 1, 2]

// Example 3:
const root3 = createTree([]);
console.log(invertTree(root3));
// Output: []
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,235,undefined&title=235%20-%20Invert%20a%20Binary%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A235+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->