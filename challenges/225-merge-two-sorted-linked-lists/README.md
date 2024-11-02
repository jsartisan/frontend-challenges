You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted linked list and return the head of the new sorted linked list.

The new list should be made up of nodes from `list1` and `list2`.

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
