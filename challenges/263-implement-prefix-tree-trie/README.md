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
