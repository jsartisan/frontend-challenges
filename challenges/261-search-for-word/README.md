<!--info-header-start--><h1>Search for Word <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23backtracking-999" alt="#backtracking"/> <img src="https://img.shields.io/badge/-%23matrix-999" alt="#matrix"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/261-search-for-word" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a 2D board of characters and a word, determine if the word exists in the board.

Rules for word existence:
- Word can be constructed from letters of adjacent cells
- Adjacent means horizontally or vertically neighboring
- Same cell cannot be used more than once
- Board contains only English letters (case-sensitive)

**Constraints:**
- 1 ≤ board dimensions ≤ 5
- 1 ≤ word.length ≤ 10
- Board and word contain only English letters

**Examples:**
```typescript
// Example 1:
const board1 = [
  ["A","B","C","D"],
  ["S","A","A","T"],
  ["A","C","A","E"]
];
console.log(exist(board1, "CAT"));
// Output: true
// Explanation: Can form "CAT" using adjacent cells

// Example 2:
const board2 = [
  ["A","B","C","D"],
  ["S","A","A","T"],
  ["A","C","A","E"]
];
console.log(exist(board2, "BAT"));
// Output: false
// Explanation: Cannot form "BAT" using adjacent cells
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,261,undefined&title=261%20-%20Search%20for%20Word%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A261+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->