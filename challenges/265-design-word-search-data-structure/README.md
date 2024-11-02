<!--info-header-start--><h1>Design Word Search Data Structure <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23trie-999" alt="#trie"/> <img src="https://img.shields.io/badge/-%23data--structure-999" alt="#data-structure"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/265-design-word-search-data-structure" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Design a data structure that supports adding words and searching with wildcards.

The `WordDictionary` class should support:
- `addWord(word)`: Adds a word to the dictionary
- `search(word)`: Returns true if any stored word matches the pattern
  - Pattern can contain dots '.' that match any letter

**Constraints:**
- 1 ≤ word.length ≤ 20
- addWord: word contains only lowercase letters
- search: word contains only dots or lowercase letters

**Examples:**
```typescript
const dict = new WordDictionary();
dict.addWord("day");
dict.addWord("bay");
dict.addWord("may");
dict.search("say");   // returns false
dict.search("day");   // returns true
dict.search(".ay");   // returns true (matches day, bay, may)
dict.search("b..");   // returns true (matches bay)
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,265,undefined&title=265%20-%20Design%20Word%20Search%20Data%20Structure%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A265+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->