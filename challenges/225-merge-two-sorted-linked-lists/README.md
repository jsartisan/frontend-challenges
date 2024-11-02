Write a function that takes two sorted linked lists as input parameters. The function should combine these lists into a single sorted linked list by interweaving their nodes in ascending order.

Your task is to return the head node of the resulting merged list, which should maintain sorted order and incorporate all nodes from both input lists.

The merged result should preserve the original nodes, just relinked in the correct order.

**Constraints:**
- 0 ≤ The length of each list ≤ 100
- -100 ≤ Node.val ≤ 100
- Both `list1` and `list2` are sorted in non-decreasing order

**Examples:**

```typescript
// Example 1:
const list1 = [1, 2, 4];
const list2 = [1, 3, 5];
console.log(mergeTwoLists(list1, list2));
// Output: [1, 1, 2, 3, 4, 5]

// Example 2:
const list1 = [];
const list2 = [1, 2];
console.log(mergeTwoLists(list1, list2));
// Output: [1, 2]

// Example 3:
const list1 = [];
const list2 = [];
console.log(mergeTwoLists(list1, list2));
// Output: []
```
