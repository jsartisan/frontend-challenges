<!--info-header-start--><h1>Anagram Groups <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/191-anagram-groups" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

You are given an array of strings `strs`. Write a function that groups all the anagrams together into sublists. Each group should consist of strings that are anagrams of each other. The order of the output does not matter.

An anagram is a word or phrase that contains the exact same characters as another string but in any order.

**Constraints:**
- 1 ≤ `strs.length` ≤ 1000
- 0 ≤ `strs[i].length` ≤ 100
- `strs[i]` consists of lowercase English letters.

**Examples:**

```js
// Example 1
const strs1 = ["act","pots","tops","cat","stop","hat"];
console.log(groupAnagrams(strs1));
// Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]

// Example 2
const strs2 = ["x"];
console.log(groupAnagrams(strs2));
// Output: [["x"]]

// Example 3
const strs3 = [""];
console.log(groupAnagrams(strs3));
// Output: [[""]]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,191,undefined&title=191%20-%20Anagram%20Groups%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A191+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->