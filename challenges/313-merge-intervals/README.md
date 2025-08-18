<!--info-header-start--><h1>Merge Intervals <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23intervals-999" alt="#intervals"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/313-merge-intervals" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals.

Rules:

- Merge any intervals that overlap
- Return array of non-overlapping intervals
- Result covers all input intervals
- Result can be in any order

**Constraints:**

- 1 ≤ intervals.length ≤ 1000
- intervals[i].length == 2
- 0 ≤ start ≤ end ≤ 1000

**Examples:**

```typescript
// Example 1:
console.log(
  merge([
    [1, 3],
    [1, 5],
    [6, 7],
  ]),
);
// Output: [[1,5],[6,7]]
// Explanation: First two intervals overlap

// Example 2:
console.log(
  merge([
    [1, 2],
    [2, 3],
  ]),
);
// Output: [[1,3]]
// Explanation: Adjacent intervals merge
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,313,undefined&title=313%20-%20Merge%20Intervals%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A313+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
