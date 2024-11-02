<!--info-header-start--><h1>Is Palindrome <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/> <img src="https://img.shields.io/badge/-%23two--pointers-999" alt="#two-pointers"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/203-is-palindrome" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,203,undefined&title=203%20-%20Is%20Palindrome%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A203+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->