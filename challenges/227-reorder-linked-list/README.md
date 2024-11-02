You are given the head of a singly linked-list.

The positions of a linked list of length = 7 for example, can initially be represented as:
`[0, 1, 2, 3, 4, 5, 6]`

Reorder the nodes of the linked list to be in the following order:
`[0, 6, 1, 5, 2, 4, 3]`

Notice that in the general case for a list of length = n the nodes are reordered to be in the following order:
`[0, n-1, 1, n-2, 2, n-3, ...]`

You may not modify the values in the list's nodes, but instead you must reorder the nodes themselves.

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
