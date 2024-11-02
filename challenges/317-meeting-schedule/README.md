<!--info-header-start--><h1>Meeting Schedule <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23intervals-999" alt="#intervals"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/317-meeting-schedule" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array of meeting intervals where `intervals[i] = [start_i, end_i]`, determine if all meetings can be attended without conflicts.

Rules:
- Meetings with common endpoints don't conflict
- All meetings must be attended
- Start time is always less than end time

**Constraints:**
- 0 ≤ intervals.length ≤ 500
- 0 ≤ start < end ≤ 1,000,000

**Examples:**
```typescript
// Example 1:
console.log(canAttendMeetings([[0,30],[5,10],[15,20]]));
// Output: false
// Explanation: Multiple conflicts:
// - [0,30] conflicts with [5,10]
// - [0,30] conflicts with [15,20]

// Example 2:
console.log(canAttendMeetings([[5,8],[9,15]]));
// Output: true
// Explanation: No conflicts, [5,8] ends before [9,15] starts
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,317,undefined&title=317%20-%20Meeting%20Schedule%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A317+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->