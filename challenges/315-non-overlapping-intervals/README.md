<!--info-header-start--><h1>Non-overlapping Intervals <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23intervals-999" alt="#intervals"/> <img src="https://img.shields.io/badge/-%23greedy-999" alt="#greedy"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/315-non-overlapping-intervals" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array of intervals where `intervals[i] = [start_i, end_i]`, find the minimum number of intervals to remove to make the remaining intervals non-overlapping.

Rules:

- Intervals with common endpoints are considered non-overlapping
- Must remove minimum number of intervals
- Intervals overlap if they share any points except endpoints

**Constraints:**

- 1 ≤ intervals.length ≤ 1000
- intervals[i].length == 2
- -50000 ≤ start < end ≤ 50000

**Examples:**

```typescript
// Example 1:
console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 4],
    [1, 4],
  ]),
);
// Output: 1
// Explanation: Remove [1,4] to make non-overlapping

// Example 2:
console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 4],
  ]),
);
// Output: 0
// Explanation: Already non-overlapping
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,315,undefined&title=315%20-%20Non-overlapping%20Intervals%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A315+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
