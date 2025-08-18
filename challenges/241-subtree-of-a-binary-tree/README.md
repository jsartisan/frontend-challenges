<!--info-header-start--><h1>Subtree of a Binary Tree <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--tree-999" alt="#binary-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/241-subtree-of-a-binary-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given the roots of two binary trees `root` and `subRoot`, return `true` if there exists a subtree of `root` with identical structure and node values as `subRoot`, and `false` otherwise.

A subtree of a binary tree is a tree consisting of a node in the original tree and all of its descendants. The original tree itself is also considered one of its subtrees.

**Constraints:**

- 0 ≤ Number of nodes in both trees ≤ 100
- -100 ≤ Node values ≤ 100

**Examples:**

```typescript
// Example 1:
//      1              2
//    /   \          /   \
//   2     3   and  4     5
//  / \
// 4   5
const root1 = createTree([1, 2, 3, 4, 5]);
const subRoot1 = createTree([2, 4, 5]);
console.log(isSubtree(root1, subRoot1));
// Output: true

// Example 2:
//      1              2
//    /   \          /   \
//   2     3   and  4     5
//  / \
// 4   5
//    /
//   6
const root2 = createTree([1, 2, 3, 4, 5, null, null, 6]);
const subRoot2 = createTree([2, 4, 5]);
console.log(isSubtree(root2, subRoot2));
// Output: false
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,241,undefined&title=241%20-%20Subtree%20of%20a%20Binary%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A241+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
