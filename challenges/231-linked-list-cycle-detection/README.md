<!--info-header-start--><h1>Linked List Cycle Detection <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23linked--list-999" alt="#linked-list"/> <img src="https://img.shields.io/badge/-%23two--pointers-999" alt="#two-pointers"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/231-linked-list-cycle-detection" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,231,undefined&title=231%20-%20Linked%20List%20Cycle%20Detection%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A231+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->