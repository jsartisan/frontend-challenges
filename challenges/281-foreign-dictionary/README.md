<!--info-header-start--><h1>Foreign Dictionary <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23graph-999" alt="#graph"/> <img src="https://img.shields.io/badge/-%23topological--sort-999" alt="#topological-sort"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/281-foreign-dictionary" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a list of words sorted lexicographically in a foreign language that uses lowercase latin letters in a different order, determine the ordering of the letters in that language.

Rules:
- Words are sorted lexicographically where:
  - First different letter determines order (smaller letter comes first)
  - If no different letters found, shorter word comes first
- Return empty string if order is invalid
- If multiple valid orders exist, return any of them

**Constraints:**
- 1 ≤ words.length ≤ 100
- 1 ≤ words[i].length ≤ 100
- Words contain only lowercase letters a-z

**Examples:**
```typescript
// Example 1:
const words1 = ["z", "o"];
console.log(alienOrder(words1));
// Output: "zo"
// Explanation: 'z' comes before 'o' in this language

// Example 2:
const words2 = ["hrn","hrf","er","enn","rfnn"];
console.log(alienOrder(words2));
// Output: "hernf"
// Explanation: 
// hrn vs hrf: n < f
// hrf vs er: h < e
// er vs enn: r < n
// enn vs rfnn: e < r
// One valid order is "hernf"
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,281,undefined&title=281%20-%20Foreign%20Dictionary%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A281+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->