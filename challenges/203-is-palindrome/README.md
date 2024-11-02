Write a function that checks if a given string `s` is a palindrome and outputs `true` or `false` accordingly.

For this challenge, a palindrome is defined as text that remains unchanged when reversed - for example "mom" or "race car". The check should ignore letter casing (uppercase/lowercase) and skip any characters that aren't letters or numbers.

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
