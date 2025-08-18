<!--info-header-start--><h1>Merge Two Sorted Linked Lists <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23linked--list-999" alt="#linked-list"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/225-merge-two-sorted-linked-lists" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,225,undefined&title=225%20-%20Merge%20Two%20Sorted%20Linked%20Lists%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A225+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
