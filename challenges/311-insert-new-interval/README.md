<!--info-header-start--><h1>Insert New Interval <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23intervals-999" alt="#intervals"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/311-insert-new-interval" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given:

- Array of non-overlapping intervals `intervals` where intervals[i] = [start_i, end_i]
- A new interval `newInterval = [start, end]`
- intervals is sorted by start time

Insert newInterval into intervals such that:

- Result remains sorted by start time
- No overlapping intervals (merge if needed)
- Return the resulting intervals array

**Constraints:**

- 0 ≤ intervals.length ≤ 1000
- newInterval.length == intervals[i].length == 2
- 0 ≤ start ≤ end ≤ 1000

**Examples:**

```typescript
// Example 1:
console.log(
  insert(
    [
      [1, 3],
      [4, 6],
    ],
    [2, 5],
  ),
);
// Output: [[1,6]]
// Explanation: [2,5] overlaps with both intervals

// Example 2:
console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [9, 10],
    ],
    [6, 7],
  ),
);
// Output: [[1,2],[3,5],[6,7],[9,10]]
// Explanation: [6,7] fits between existing intervals
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,311,undefined&title=311%20-%20Insert%20New%20Interval%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A311+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
