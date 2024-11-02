Write a function that takes a string `s` and returns the length of the longest possible substring that has no duplicate characters.

A substring refers to any continuous part of the original string, formed by taking a sequence of consecutive characters.

**Constraints:**
- 0 ≤ s.length ≤ 5 × 10⁴
- s consists of English letters, digits, symbols and spaces

**Examples:**

```typescript
// Example 1:
const s1 = "abcabcbb";
console.log(lengthOfLongestSubstring(s1));
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// Example 2:
const s2 = "bbbbb";
console.log(lengthOfLongestSubstring(s2));
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Example 3:
const s3 = "pwwkew";
console.log(lengthOfLongestSubstring(s3));
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Note that "pwke" is a subsequence and not a substring.
```
