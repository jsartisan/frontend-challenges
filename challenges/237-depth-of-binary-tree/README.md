Given the root of a binary tree, return its depth.

The depth of a binary tree is defined as the number of nodes along the longest path from the root node down to the farthest leaf node.

**Constraints:**
- 0 ≤ Number of nodes in the tree ≤ 100
- -100 ≤ Node value ≤ 100

**Examples:**

```typescript
// Example 1:
//      1
//    /   \
//   2     3
//         /
//        4
const root1 = createTree([1, 2, 3, null, null, 4]);
console.log(maxDepth(root1));
// Output: 3

// Example 2:
const root2 = createTree([]);
console.log(maxDepth(root2));
// Output: 0

// Example 3:
//      1
//    /   \
//   2     3
//  / \   / \
// 4   5 6   7
const root3 = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(maxDepth(root3));
// Output: 3
```
