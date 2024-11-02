Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) in the tree.

A binary search tree satisfies the following constraints:
- Left subtree contains only values less than node's value
- Right subtree contains only values greater than node's value
- Both subtrees must also be valid BSTs

**Constraints:**
- 1 ≤ k ≤ Number of nodes in tree ≤ 1000
- 0 ≤ Node values ≤ 1000

**Examples:**
```typescript
// Example 1:
//     2
//    / \
//   1   3
const root1 = createTree([2, 1, 3]);
console.log(kthSmallest(root1, 1));
// Output: 1

// Example 2:
//     4
//    / \
//   3   5
//  /
// 2
const root2 = createTree([4, 3, 5, 2]);
console.log(kthSmallest(root2, 4));
// Output: 5
```
