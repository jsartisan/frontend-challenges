Given the root of a non-empty binary tree, find the maximum path sum of any non-empty path.

A path in a binary tree:
- Is a sequence of nodes where each pair of adjacent nodes is connected
- Each node can appear only once
- Does not need to pass through the root
- Can start and end at any nodes

The path sum is the sum of all node values in the path.

**Constraints:**
- 1 ≤ Number of nodes ≤ 1000
- -1000 ≤ Node values ≤ 1000

**Examples:**
```typescript
// Example 1:
//     1
//    / \
//   2   3
const root1 = createTree([1, 2, 3]);
console.log(maxPathSum(root1));
// Output: 6
// Explanation: Path 2 -> 1 -> 3 gives sum 2 + 1 + 3 = 6

// Example 2:
//      -15
//      /  \
//    10    20
//         /  \
//       15    5
//      /
//    -5
const root2 = createTree([-15, 10, 20, null, null, 15, 5, -5]);
console.log(maxPathSum(root2));
// Output: 40
// Explanation: Path 15 -> 20 -> 5 gives sum 15 + 20 + 5 = 40
```
