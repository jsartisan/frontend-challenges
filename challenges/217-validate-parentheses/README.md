You are given a string `s` consisting of the following characters: '(', ')', '{', '}', '[' and ']'.

The input string `s` is valid if and only if:
1. Every open bracket is closed by the same type of close bracket.
2. Open brackets are closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Return `true` if s is a valid string, and `false` otherwise.

**Constraints:**
- 1 ≤ s.length ≤ 1000
- s consists of parentheses only '()[]{}'

**Examples:**

```typescript
// Example 1:
const s1 = "[]";
console.log(isValid(s1));
// Output: true

// Example 2:
const s2 = "([{}])";
console.log(isValid(s2));
// Output: true

// Example 3:
const s3 = "[(])";
console.log(isValid(s3));
// Output: false
// Explanation: The brackets are not closed in the correct order.
```
