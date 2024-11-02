You are given an array containing k sorted linked lists, where each list maintains ascending order.

Create and return a new sorted linked list that combines all nodes from the input lists while maintaining the sorted order.

**Constraints:**
- 0 ≤ k (number of lists) ≤ 1000
- 0 ≤ length of each list ≤ 100
- -1000 ≤ value in each node ≤ 1000

**Examples:**

```typescript
// Example 1:
const lists1 = [
  createList([1, 2, 4]),
  createList([1, 3, 5]),
  createList([3, 6])
];
console.log(mergeKLists(lists1));
// Output: [1, 1, 2, 3, 3, 4, 5, 6]

// Example 2:
const lists2: ListNode[] = [];
console.log(mergeKLists(lists2));
// Output: null

// Example 3:
const lists3 = [createList([])];
console.log(mergeKLists(lists3));
// Output: null
```
