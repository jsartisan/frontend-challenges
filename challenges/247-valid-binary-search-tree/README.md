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
