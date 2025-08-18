<!--info-header-start--><h1>Remove Node From End of Linked List <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23linked--list-999" alt="#linked-list"/> <img src="https://img.shields.io/badge/-%23two--pointers-999" alt="#two-pointers"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/229-remove-node-from-end-of-linked-list" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Write a function that takes two parameters: a linked list starting at node `head`, and a number `n`.

Your task is to delete the node that is `n` positions from the tail of the list, then return the modified list's head node.

**Constraints:**

- The number of nodes in the list is sz
- 1 ≤ sz ≤ 30
- 0 ≤ Node.val ≤ 100
- 1 ≤ n ≤ sz

**Examples:**

```typescript
// Example 1:
const head1 = [1, 2, 3, 4];
const n1 = 2;
console.log(removeNthFromEnd(head1, n1));
// Output: [1, 2, 4]

// Example 2:
const head2 = [5];
const n2 = 1;
console.log(removeNthFromEnd(head2, n2));
// Output: []

// Example 3:
const head3 = [1, 2];
const n3 = 2;
console.log(removeNthFromEnd(head3, n3));
// Output: [2]
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,229,undefined&title=229%20-%20Remove%20Node%20From%20End%20of%20Linked%20List%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A229+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
