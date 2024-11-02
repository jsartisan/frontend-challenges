You are given the beginning of a linked list `head`, and an integer `n`.

Remove the nth node from the end of the list and return the beginning of the list.

**Constraints:**
- The number of nodes in the list is sz
- 1 ≤ sz ≤ 30
- 0 ≤ Node.val ≤ 100
- 1 ≤ n ≤ sz

**Examples:**

```typescript
// Example 1:
const head1 = [1, 2, 3, 4];
const n1 = 2;
console.log(removeNthFromEnd(head1, n1));
// Output: [1, 2, 4]

// Example 2:
const head2 = [5];
const n2 = 1;
console.log(removeNthFromEnd(head2, n2));
// Output: []

// Example 3:
const head3 = [1, 2];
const n3 = 2;
console.log(removeNthFromEnd(head3, n3));
// Output: [2]
```
