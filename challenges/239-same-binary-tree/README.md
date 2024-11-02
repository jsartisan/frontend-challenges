Given the roots of two binary trees `p` and `q`, return `true` if the trees are equivalent, otherwise return `false`.

Two binary trees are considered equivalent if they share the exact same structure and the nodes have the same values.

**Constraints:**
- 0 ≤ Number of nodes in both trees ≤ 100
- -100 ≤ Node value ≤ 100

**Examples:**

```typescript
// Example 1:
//      1         1
//    /   \     /   \
//   2     3   2     3
const p1 = createTree([1, 2, 3]);
const q1 = createTree([1, 2, 3]);
console.log(isSameTree(p1, q1));
// Output: true

// Example 2:
//      4         4
//    /           \
//   7             7
const p2 = createTree([4, 7]);
const q2 = createTree([4, null, 7]);
console.log(isSameTree(p2, q2));
// Output: false

// Example 3:
//      1         1
//    /   \     /   \
//   2     3   3     2
const p3 = createTree([1, 2, 3]);
const q3 = createTree([1, 3, 2]);
console.log(isSameTree(p3, q3));
// Output: false
```
