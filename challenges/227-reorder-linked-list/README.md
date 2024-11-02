<!--info-header-start--><h1>Reorder Linked List <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23linked--list-999" alt="#linked-list"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/227-reorder-linked-list" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a singly linked list, rearrange its nodes in a specific alternating pattern.

For instance, take a linked list with 7 nodes that starts as:
`[0, 1, 2, 3, 4, 5, 6]`

Your task is to reorganize it into this pattern:
`[0, 6, 1, 5, 2, 4, 3]`

The pattern follows this rule: take nodes from the start and end alternately. For any list of length n, the final arrangement should be:
`[0, n-1, 1, n-2, 2, n-3, ...]`

Important: This reorganization must be done by changing the links between nodes, not by modifying the values stored in each node.

**Constraints:**
- 1 ≤ Length of the list ≤ 1000
- 1 ≤ Node.val ≤ 1000

**Examples:**

```typescript
// Example 1:
const head1 = [2, 4, 6, 8];
console.log(reorderList(head1));
// Output: [2, 8, 4, 6]

// Example 2:
const head2 = [2, 4, 6, 8, 10];
console.log(reorderList(head2));
// Output: [2, 10, 4, 8, 6]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,227,undefined&title=227%20-%20Reorder%20Linked%20List%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A227+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->