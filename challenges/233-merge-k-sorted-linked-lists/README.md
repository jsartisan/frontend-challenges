Write a function that accepts an array of k linked lists as input, where the nodes in each list are arranged in ascending order.

Your task is to merge all the input lists into a single linked list, ensuring that all nodes remain in sorted ascending order, and return this combined result.

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
