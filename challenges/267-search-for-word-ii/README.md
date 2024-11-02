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
