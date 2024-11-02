<!--info-header-start--><h1>Binary Tree from Preorder and Inorder Traversal <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23binary--tree-999" alt="#binary-tree"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/251-binary-tree-from-preorder-and-inorder-traversal" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given two integer arrays `preorder` and `inorder` representing traversals of a binary tree:
- `preorder` contains the preorder traversal (root, left, right)
- `inorder` contains the inorder traversal (left, root, right)

Both arrays:
- Have the same length
- Contain unique values
- Represent the same binary tree

Construct and return the original binary tree.

**Constraints:**
- 1 ≤ array length ≤ 1000
- -1000 ≤ array values ≤ 1000
- Arrays contain unique values

**Examples:**
```typescript
// Example 1:
//     1
//    /  \
//   2    3
//         \
//          4
const preorder1 = [1, 2, 3, 4];
const inorder1 = [2, 1, 3, 4];
console.log(buildTree(preorder1, inorder1));
// Output: [1, 2, 3, null, null, null, 4]

// Example 2:
//   1
const preorder2 = [1];
const inorder2 = [1];
console.log(buildTree(preorder2, inorder2));
// Output: [1]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,251,undefined&title=251%20-%20Binary%20Tree%20from%20Preorder%20and%20Inorder%20Traversal%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A251+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->