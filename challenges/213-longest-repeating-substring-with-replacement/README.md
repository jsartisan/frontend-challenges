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
