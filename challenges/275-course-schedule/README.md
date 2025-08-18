<!--info-header-start--><h1>Course Schedule <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23graph-999" alt="#graph"/> <img src="https://img.shields.io/badge/-%23topological--sort-999" alt="#topological-sort"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/275-course-schedule" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given `numCourses` courses (labeled 0 to numCourses-1) and prerequisites where `prerequisites[i] = [a, b]` means:

- You must take course `b` before taking course `a`

Determine if it's possible to finish all courses.

**Constraints:**

- 1 ≤ numCourses ≤ 1000
- 0 ≤ prerequisites.length ≤ 1000
- All prerequisite pairs are unique
- prerequisites[i].length == 2

**Examples:**

```typescript
// Example 1:
const numCourses1 = 2;
const prerequisites1 = [[0, 1]];
console.log(canFinish(numCourses1, prerequisites1));
// Output: true
// Explanation: Take course 1 first, then course 0

// Example 2:
const numCourses2 = 2;
const prerequisites2 = [
  [0, 1],
  [1, 0],
];
console.log(canFinish(numCourses2, prerequisites2));
// Output: false
// Explanation: Courses 0 and 1 form a cycle, impossible
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,275,undefined&title=275%20-%20Course%20Schedule%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A275+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
