<!--info-header-start--><h1>Longest Repeating Substring With Replacement <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/> <img src="https://img.shields.io/badge/-%23sliding--window-999" alt="#sliding-window"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/213-longest-repeating-substring-with-replacement" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a string `s` made up of only capital letters A-Z and a number `k`, you can pick up to `k` positions in the string and change those letters to any other capital letter A-Z.

Your task is to find the longest substring containing exactly one unique letter after making at most k letter changes, and return its length.

**Constraints:**

- 1 ≤ s.length ≤ 1000
- 0 ≤ k ≤ s.length

**Examples:**

```typescript
// Example 1:
const s1 = "XYYX";
const k1 = 2;
console.log(characterReplacement(s1, k1));
// Output: 4
// Explanation: Either replace the 'X's with 'Y's, or replace the 'Y's with 'X's.

// Example 2:
const s2 = "AAABABB";
const k2 = 1;
console.log(characterReplacement(s2, k2));
// Output: 5
// Explanation: Replace the 'B' at index 3 with 'A'.
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,213,undefined&title=213%20-%20Longest%20Repeating%20Substring%20With%20Replacement%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A213+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
