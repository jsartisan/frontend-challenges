<!--info-header-start--><h1>Minimum Window With Characters <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/> <img src="https://img.shields.io/badge/-%23sliding--window-999" alt="#sliding-window"/> <img src="https://img.shields.io/badge/-%23hash--map-999" alt="#hash-map"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/215-minimum-window-with-characters" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Write a function that takes two strings `s` and `t` as input. Find and return the minimum length substring from `s` that contains all characters from `t` (including any duplicate characters). If no such substring exists in `s`, return an empty string `""`.

The problem guarantees that there will be exactly one valid answer when a solution exists.

**Constraints:**

- 1 ≤ s.length ≤ 1000
- 1 ≤ t.length ≤ 1000
- s and t consist of uppercase and lowercase English letters

**Examples:**

```typescript
// Example 1:
const s1 = "OUZODYXAZV";
const t1 = "XYZ";
console.log(minWindow(s1, t1));
// Output: "YXAZ"
// Explanation: "YXAZ" is the shortest substring that includes "X", "Y", and "Z" from string t.

// Example 2:
const s2 = "xyz";
const t2 = "xyz";
console.log(minWindow(s2, t2));
// Output: "xyz"

// Example 3:
const s3 = "x";
const t3 = "xy";
console.log(minWindow(s3, t3));
// Output: ""
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,215,undefined&title=215%20-%20Minimum%20Window%20With%20Characters%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A215+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
