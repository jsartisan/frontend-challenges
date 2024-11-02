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
