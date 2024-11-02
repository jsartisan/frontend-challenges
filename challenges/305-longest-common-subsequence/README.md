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
