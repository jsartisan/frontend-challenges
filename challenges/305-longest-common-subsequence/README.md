<!--info-header-start--><h1>Longest Common Subsequence <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23dynamic--programming-999" alt="#dynamic-programming"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/305-longest-common-subsequence" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given two strings `text1` and `text2`, find the length of their longest common subsequence.

Rules:
- Subsequence can skip characters (doesn't need to be contiguous)
- Must maintain relative order of characters
- Common subsequence must exist in both strings
- Return 0 if no common subsequence exists

**Constraints:**
- 1 ≤ text1.length, text2.length ≤ 1000
- Strings contain only lowercase English letters

**Examples:**
```typescript
// Example 1:
console.log(longestCommonSubsequence("cat", "crabt"));
// Output: 3
// Explanation: "cat" is common subsequence

// Example 2:
console.log(longestCommonSubsequence("abcd", "abcd"));
// Output: 4
// Explanation: Entire string is common

// Example 3:
console.log(longestCommonSubsequence("abcd", "efgh"));
// Output: 0
// Explanation: No common subsequence
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,305,undefined&title=305%20-%20Longest%20Common%20Subsequence%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A305+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->