<!--info-header-start--><h1>Jump Game <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23dynamic--programming-999" alt="#dynamic-programming"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/> <img src="https://img.shields.io/badge/-%23greedy-999" alt="#greedy"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/309-jump-game" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array `nums` where each element represents the maximum jump length at that position, determine if you can reach the last index starting from index 0.

Rules:

- Start at first position (index 0)
- At each position i, can jump up to nums[i] steps forward
- Must reach last index exactly
- Cannot jump backward

**Constraints:**

- 1 ≤ nums.length ≤ 1000
- 0 ≤ nums[i] ≤ 1000

**Examples:**

```typescript
// Example 1:
console.log(canJump([1, 2, 0, 1, 0]));
// Output: true
// Explanation: Jump path: 0->1->3->4

// Example 2:
console.log(canJump([1, 2, 1, 0, 1]));
// Output: false
// Explanation: Can't reach last index
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,309,undefined&title=309%20-%20Jump%20Game%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A309+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
