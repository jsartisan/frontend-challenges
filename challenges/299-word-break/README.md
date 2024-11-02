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
console.log(wordBreak("neetcode", ["neet","code"]));
// Output: true
// Explanation: "neetcode" = "neet" + "code"

// Example 2:
console.log(wordBreak("applepenapple", ["apple","pen"]));
// Output: true
// Explanation: "applepenapple" = "apple" + "pen" + "apple"

// Example 3:
console.log(wordBreak("catsincars", ["cats","cat","sin","in","car"]));
// Output: false
// Explanation: Cannot be segmented with given words
```
