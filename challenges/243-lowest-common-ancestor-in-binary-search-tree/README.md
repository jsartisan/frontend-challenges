Given a binary search tree (BST) where all node values are unique, and two nodes `p` and `q`, find their lowest common ancestor (LCA).

The lowest common ancestor of two nodes is defined as the deepest node in the tree that has both nodes as descendants. A node can be considered a descendant of itself.

**Constraints:**
- 2 ≤ Number of nodes in the tree ≤ 100
- -100 ≤ Node values ≤ 100
- p ≠ q
- Both p and q exist in the BST

**Examples:**

```typescript
// Example 1:
//        5
//      /   \
//     3     8
//    / \   / \
//   1   4 7   9
//    \
//     2
const root1 = createTree([5, 3, 8, 1, 4, 7, 9, null, 2]);
const p1 = findNode(root1, 3);
const q1 = findNode(root1, 8);
console.log(lowestCommonAncestor(root1, p1, q1)?.val);
// Output: 5

// Example 2:
//        5
//      /   \
//     3     8
//    / \   / \
//   1   4 7   9
//    \
//     2
const root2 = createTree([5, 3, 8, 1, 4, 7, 9, null, 2]);
const p2 = findNode(root2, 3);
const q2 = findNode(root2, 4);
console.log(lowestCommonAncestor(root2, p2, q2)?.val);
// Output: 3
// Explanation: Node 3 is the LCA since it's the parent of 4
```
