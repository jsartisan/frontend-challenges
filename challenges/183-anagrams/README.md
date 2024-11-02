<!--info-header-start--><h1>Anagrams <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23javascrip-999" alt="#javascrip"/> <img src="https://img.shields.io/badge/-%23arrays-999" alt="#arrays"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/183-anagrams" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Create a function that accepts two string parameters `s` and `t`. The function should output `true` when the strings are anagrams of one another, and `false` if they're not.

Two strings are considered anagrams if you can shuffle the letters of one to create the other. For instance, "listen" and "silent" are anagrams because they use exactly the same letters the same number of times, just arranged differently.

**Constraints:**
- Both `s` and `t` consist of lowercase English letters.

**Requirements:**
1. The function should take two arguments:
   - A string `s`.
   - A string `t`.
2. The function should return:
   - `true` if `s` and `t` are anagrams.
   - `false` otherwise.

**Example Usage:**

```js
// Example 1
const s1 = "racecar";
const t1 = "carrace";
console.log(areAnagrams(s1, t1)); // Output: true

// Example 2
const s2 = "jar";
const t2 = "jam";
console.log(areAnagrams(s2, t2)); // Output: false
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,183,undefined&title=183%20-%20Anagrams%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A183+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->