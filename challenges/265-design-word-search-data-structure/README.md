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
