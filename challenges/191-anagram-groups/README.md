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
