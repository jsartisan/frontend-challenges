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
