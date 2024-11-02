Given a list of words sorted lexicographically in a foreign language that uses lowercase latin letters in a different order, determine the ordering of the letters in that language.

Rules:
- Words are sorted lexicographically where:
  - First different letter determines order (smaller letter comes first)
  - If no different letters found, shorter word comes first
- Return empty string if order is invalid
- If multiple valid orders exist, return any of them

**Constraints:**
- 1 ≤ words.length ≤ 100
- 1 ≤ words[i].length ≤ 100
- Words contain only lowercase letters a-z

**Examples:**
```typescript
// Example 1:
const words1 = ["z", "o"];
console.log(alienOrder(words1));
// Output: "zo"
// Explanation: 'z' comes before 'o' in this language

// Example 2:
const words2 = ["hrn","hrf","er","enn","rfnn"];
console.log(alienOrder(words2));
// Output: "hernf"
// Explanation: 
// hrn vs hrf: n < f
// hrf vs er: h < e
// er vs enn: r < n
// enn vs rfnn: e < r
// One valid order is "hernf"
```
