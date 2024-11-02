Given the beginning of a linked list `head`, return `true` if there is a cycle in the linked list. Otherwise, return `false`.

There is a cycle in a linked list if at least one node in the list can be visited again by following the next pointer.

Internally, `index` determines the index of the beginning of the cycle, if it exists. The tail node of the list will set its next pointer to the index-th node. If index = -1, then the tail node points to null and no cycle exists.

Note: `index` is not given to you as a parameter.

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
