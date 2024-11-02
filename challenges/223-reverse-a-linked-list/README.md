Write a function that accepts the head node of a singly linked list as input. Your task is to flip the order of the list so that it goes from end to start, then return the new head node that begins the reversed list.

**Constraints:**
- 0 ≤ The length of the list ≤ 1000
- -1000 ≤ Node.val ≤ 1000

**Examples:**

```typescript
// Example 1:
const head1 = [0, 1, 2, 3];
console.log(reverseList(head1));
// Output: [3, 2, 1, 0]

// Example 2:
const head2 = [];
console.log(reverseList(head2));
// Output: []
```
