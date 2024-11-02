Write a function that takes the head node of a linked list and checks if the list contains a cycle. Return `true` if a cycle exists, and `false` if not.

A cycle occurs when following the next pointers eventually leads back to a previously visited node, creating a loop in the list.

The implementation uses an internal `index` value that specifies where the cycle begins (if one exists). The last node's next pointer will connect back to the node at position `index`. When `index` is -1, the list ends normally with null and has no cycle.

Important: The `index` value is used internally and is not passed to your function.

**Constraints:**
- 1 ≤ Length of the list ≤ 1000
- -1000 ≤ Node.val ≤ 1000
- index is -1 or a valid index in the linked list

**Examples:**

```typescript
// Example 1:
// List: 1 -> 2 -> 3 -> 4
//           ^---------/
const head1 = createCycleList([1, 2, 3, 4], 1);
console.log(hasCycle(head1));
// Output: true
// Explanation: There is a cycle, where the tail connects to index 1

// Example 2:
// List: 1 -> 2 -> null
const head2 = createCycleList([1, 2], -1);
console.log(hasCycle(head2));
// Output: false
// Explanation: No cycle exists
```
