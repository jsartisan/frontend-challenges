<!--info-header-start--><h1>String encode and decode <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/197-string-encode-and-decode" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Create a function that can convert an array of strings into a single encoded string, and another function that can decode that string back into the original array of strings. The encoding and decoding should be reversible, meaning decoding the encoded string should give back the exact same array that was encoded.

**Constraints:**

- 0 ≤ strs.length < 100
- 0 ≤ strs[i].length < 200
- `strs[i]` contains only UTF-8 characters

**Examples:**

```typescript
// Example 1:
const input1 = ["neet", "code", "love", "you"];
const encoded1 = encode(input1);
console.log(decode(encoded1));
// Output: ["neet", "code", "love", "you"]

// Example 2:
const input2 = ["we", "say", ":", "yes"];
const encoded2 = encode(input2);
console.log(decode(encoded2));
// Output: ["we", "say", ":", "yes"]
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,197,undefined&title=197%20-%20String%20encode%20and%20decode%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A197+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
