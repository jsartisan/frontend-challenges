<!--info-header-start--><h1>Meeting Schedule II <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23intervals-999" alt="#intervals"/> <img src="https://img.shields.io/badge/-%23greedy-999" alt="#greedy"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/319-meeting-schedule-ii" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array of meeting intervals where `intervals[i] = [start_i, end_i]`, find the minimum number of days needed to schedule all meetings without conflicts.

Rules:
- Multiple meetings can be scheduled on the same day if they don't conflict
- Meetings with common endpoints don't conflict
- All meetings must be scheduled
- Start time is always less than end time

**Constraints:**
- 0 ≤ intervals.length ≤ 500
- 0 ≤ start < end ≤ 1,000,000

**Examples:**
```typescript
// Example 1:
console.log(minMeetingDays([[0,40],[5,10],[15,20]]));
// Output: 2
// Explanation:
// Day 1: [0,40]
// Day 2: [5,10], [15,20]

// Example 2:
console.log(minMeetingDays([[4,9]]));
// Output: 1
// Explanation: Only one day needed for one meeting
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,319,undefined&title=319%20-%20Meeting%20Schedule%20II%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A319+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->