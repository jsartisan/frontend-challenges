Given a string `s` containing only digits, return the number of ways it can be decoded according to:
```
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

Rules:
- Each digit or pair of digits must map to a valid letter (1-26)
- No leading zeros allowed in groups
- Multiple valid groupings are counted separately

**Constraints:**
- 1 ≤ s.length ≤ 100
- s contains only digits

**Examples:**
```typescript
// Example 1:
console.log(numDecodings("12"));
// Output: 2
// Explanation: Two ways to decode:
// - 1,2 -> "AB"
// - 12 -> "L"

// Example 2:
console.log(numDecodings("01"));
// Output: 0
// Explanation: Leading zero makes this invalid
```
