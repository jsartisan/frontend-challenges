<!--info-header-start--><h1>Implement Prefix Tree (Trie) <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23trie-999" alt="#trie"/> <img src="https://img.shields.io/badge/-%23data--structure-999" alt="#data-structure"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/263-implement-prefix-tree-trie" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a prefix tree (trie) that supports string insertion and search operations.

The `PrefixTree` class should support:
- `insert(word)`: Adds a word to the trie
- `search(word)`: Returns true if word exists in trie
- `startsWith(prefix)`: Returns true if any word starts with prefix

**Constraints:**
- 1 ≤ word.length, prefix.length ≤ 1000
- All strings contain only lowercase English letters

**Examples:**
```typescript
const trie = new PrefixTree();
trie.insert("dog");
trie.search("dog");     // returns true
trie.search("do");      // returns false
trie.startsWith("do"); // returns true
trie.insert("do");
trie.search("do");      // returns true
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,263,undefined&title=263%20-%20Implement%20Prefix%20Tree%20(Trie)%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A263+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->