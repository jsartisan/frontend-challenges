You are given a string `s` consisting of only uppercase English characters and an integer `k`. You can choose up to `k` characters of the string and replace them with any other uppercase English character.

After performing at most k replacements, return the length of the longest substring which contains only one distinct character.

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
