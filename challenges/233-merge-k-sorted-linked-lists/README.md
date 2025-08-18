<!--info-header-start--><h1>Merge K Sorted Linked Lists <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23linked--list-999" alt="#linked-list"/> <img src="https://img.shields.io/badge/-%23heap-999" alt="#heap"/> <img src="https://img.shields.io/badge/-%23divide--and--conquer-999" alt="#divide-and-conquer"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/233-merge-k-sorted-linked-lists" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Write a function that accepts an array of k linked lists as input, where the nodes in each list are arranged in ascending order.

Your task is to merge all the input lists into a single linked list, ensuring that all nodes remain in sorted ascending order, and return this combined result.

**Constraints:**

- 0 ≤ k (number of lists) ≤ 1000
- 0 ≤ length of each list ≤ 100
- -1000 ≤ value in each node ≤ 1000

**Examples:**

```typescript
// Example 1:
const lists1 = [createList([1, 2, 4]), createList([1, 3, 5]), createList([3, 6])];
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

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,233,undefined&title=233%20-%20Merge%20K%20Sorted%20Linked%20Lists%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A233+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
