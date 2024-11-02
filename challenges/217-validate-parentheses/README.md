Write a function that takes a string `s` containing bracket characters: '(', ')', '{', '}', '[', ']'.

Determine if the string is valid by checking these rules:
1. Each opening bracket must have a matching closing bracket of the same type
2. Brackets must be closed in the proper nested order
3. A closing bracket can only close a matching opening bracket

The function should return `true` for valid bracket strings, and `false` for invalid ones.

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
