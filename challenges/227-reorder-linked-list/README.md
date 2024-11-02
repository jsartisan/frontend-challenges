Given a singly linked list, rearrange its nodes in a specific alternating pattern.

For instance, take a linked list with 7 nodes that starts as:
`[0, 1, 2, 3, 4, 5, 6]`

Your task is to reorganize it into this pattern:
`[0, 6, 1, 5, 2, 4, 3]`

The pattern follows this rule: take nodes from the start and end alternately. For any list of length n, the final arrangement should be:
`[0, n-1, 1, n-2, 2, n-3, ...]`

Important: This reorganization must be done by changing the links between nodes, not by modifying the values stored in each node.

**Constraints:**
- 1 ≤ Length of the list ≤ 1000
- 1 ≤ Node.val ≤ 1000

**Examples:**

```typescript
// Example 1:
const head1 = [2, 4, 6, 8];
console.log(reorderList(head1));
// Output: [2, 8, 4, 6]

// Example 2:
const head2 = [2, 4, 6, 8, 10];
console.log(reorderList(head2));
// Output: [2, 10, 4, 8, 6]
```
