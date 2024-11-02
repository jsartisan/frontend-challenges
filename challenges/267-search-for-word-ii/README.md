<!--info-header-start--><h1>Search for Word II <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23trie-999" alt="#trie"/> <img src="https://img.shields.io/badge/-%23backtracking-999" alt="#backtracking"/> <img src="https://img.shields.io/badge/-%23matrix-999" alt="#matrix"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/267-search-for-word-ii" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a 2D board of characters and a list of words, find all words that exist in the board.

Rules for word existence:
- Word can be constructed from letters of adjacent cells
- Adjacent means horizontally or vertically neighboring
- Same cell cannot be used more than once in a word
- All inputs contain only lowercase English letters

**Constraints:**
- 1 ≤ board dimensions ≤ 10
- 1 ≤ words.length ≤ 100
- 1 ≤ word length ≤ 10
- All words are distinct
- Board and words contain only lowercase letters

**Examples:**
```typescript
// Example 1:
const board1 = [
  ["a","b","c","d"],
  ["s","a","a","t"],
  ["a","c","k","e"],
  ["a","c","d","n"]
];
const words1 = ["bat","cat","back","backend","stack"];
console.log(findWords(board1, words1));
// Output: ["cat","back","backend"]

// Example 2:
const board2 = [
  ["x","o"],
  ["x","o"]
];
const words2 = ["xoxo"];
console.log(findWords(board2, words2));
// Output: []
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,267,undefined&title=267%20-%20Search%20for%20Word%20II%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A267+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->