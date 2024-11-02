<!--info-header-start--><h1>Same Binary Tree <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--tree-999" alt="#binary-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/239-same-binary-tree" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given the roots of two binary trees `p` and `q`, return `true` if the trees are equivalent, otherwise return `false`.

Two binary trees are considered equivalent if they share the exact same structure and the nodes have the same values.

**Constraints:**
- 0 ≤ Number of nodes in both trees ≤ 100
- -100 ≤ Node value ≤ 100

**Examples:**

```typescript
// Example 1:
//      1         1
//    /   \     /   \
//   2     3   2     3
const p1 = createTree([1, 2, 3]);
const q1 = createTree([1, 2, 3]);
console.log(isSameTree(p1, q1));
// Output: true

// Example 2:
//      4         4
//    /           \
//   7             7
const p2 = createTree([4, 7]);
const q2 = createTree([4, null, 7]);
console.log(isSameTree(p2, q2));
// Output: false

// Example 3:
//      1         1
//    /   \     /   \
//   2     3   3     2
const p3 = createTree([1, 2, 3]);
const q3 = createTree([1, 3, 2]);
console.log(isSameTree(p3, q3));
// Output: false
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,239,undefined&title=239%20-%20Same%20Binary%20Tree%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A239+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->