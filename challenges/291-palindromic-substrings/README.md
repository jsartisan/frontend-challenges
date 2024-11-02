Given a string `s`, count the number of palindromic substrings within it.

Rules:
- A palindrome reads the same forwards and backwards
- Each substring is counted separately even if content is same
- Single characters are considered palindromes

**Constraints:**
- 1 ≤ s.length ≤ 1000
- s contains only lowercase English letters

**Examples:**
```typescript
// Example 1:
console.log(countSubstrings("abc"));
// Output: 3
// Explanation: Three palindromes: "a", "b", "c"

// Example 2:
console.log(countSubstrings("aaa"));
// Output: 6
// Explanation: Six palindromes:
// - Single chars: "a", "a", "a"
// - Two chars: "aa", "aa"
// - Three chars: "aaa"
```
