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
