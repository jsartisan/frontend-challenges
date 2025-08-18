<!--info-header-start--><h1>Word Break <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23dynamic--programming-999" alt="#dynamic-programming"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/299-word-break" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a string `s` and a dictionary of strings `wordDict`, determine if `s` can be segmented into a space-separated sequence of dictionary words.

Rules:

- Dictionary words can be reused unlimited times
- All dictionary words are unique
- Not all dictionary words must be used

**Constraints:**

- 1 ≤ s.length ≤ 200
- 1 ≤ wordDict.length ≤ 100
- 1 ≤ wordDict[i].length ≤ 20
- All strings contain only lowercase English letters

**Examples:**

```typescript
// Example 1:
console.log(wordBreak("neetcode", ["neet", "code"]));
// Output: true
// Explanation: "neetcode" = "neet" + "code"

// Example 2:
console.log(wordBreak("applepenapple", ["apple", "pen"]));
// Output: true
// Explanation: "applepenapple" = "apple" + "pen" + "apple"

// Example 3:
console.log(wordBreak("catsincars", ["cats", "cat", "sin", "in", "car"]));
// Output: false
// Explanation: Cannot be segmented with given words
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,299,undefined&title=299%20-%20Word%20Break%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A299+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
