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
