Given a string `s`, return `true` if it is a palindrome, otherwise return `false`.

A palindrome is a string that reads the same forward and backward. It is also case-insensitive and ignores all non-alphanumeric characters.

**Constraints:**
- 1 ≤ s.length ≤ 1000
- s is made up of only printable ASCII characters

**Examples:**

```typescript
// Example 1:
const s1 = "Was it a car or a cat I saw?";
console.log(isPalindrome(s1));
// Output: true
// Explanation: After considering only alphanumerical characters we have "wasitacaroracatisaw", which is a palindrome.

// Example 2:
const s2 = "tab a cat";
console.log(isPalindrome(s2));
// Output: false
// Explanation: "tabacat" is not a palindrome.
```
