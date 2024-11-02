Given a string `s`, find the longest substring that is a palindrome.

Rules:
- A palindrome reads the same forwards and backwards
- If multiple palindromes have same length, return any one
- String contains only letters and digits

**Constraints:**
- 1 ≤ s.length ≤ 1000
- s contains only digits and English letters

**Examples:**
```typescript
// Example 1:
console.log(longestPalindrome("ababd"));
// Output: "bab"
// Explanation: "aba" would also be valid

// Example 2:
console.log(longestPalindrome("abbc"));
// Output: "bb"
// Explanation: Only palindrome of length 2
```
