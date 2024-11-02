Given the roots of two binary trees `root` and `subRoot`, return `true` if there exists a subtree of `root` with identical structure and node values as `subRoot`, and `false` otherwise.

A subtree of a binary tree is a tree consisting of a node in the original tree and all of its descendants. The original tree itself is also considered one of its subtrees.

**Constraints:**
- 0 ≤ Number of nodes in both trees ≤ 100
- -100 ≤ Node values ≤ 100

**Examples:**

```typescript
// Example 1:
//      1              2
//    /   \          /   \
//   2     3   and  4     5
//  / \
// 4   5
const root1 = createTree([1, 2, 3, 4, 5]);
const subRoot1 = createTree([2, 4, 5]);
console.log(isSubtree(root1, subRoot1));
// Output: true

// Example 2:
//      1              2
//    /   \          /   \
//   2     3   and  4     5
//  / \
// 4   5
//    /
//   6
const root2 = createTree([1, 2, 3, 4, 5, null, null, 6]);
const subRoot2 = createTree([2, 4, 5]);
console.log(isSubtree(root2, subRoot2));
// Output: false
```
