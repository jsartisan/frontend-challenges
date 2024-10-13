Write a function that takes two strings `s` and `t` and returns `true` if the two strings are anagrams of each other, and `false` otherwise.

An anagram is a word or phrase formed by rearranging the letters of another, such as "racecar" and "carrace". Both strings must contain the same characters with the same frequency, but in any order.

**Constraints:**
- Both `s` and `t` consist of lowercase English letters.

**Requirements:**
1. The function should take two arguments:
   - A string `s`.
   - A string `t`.
2. The function should return:
   - `true` if `s` and `t` are anagrams.
   - `false` otherwise.

**Example Usage:**

```js
// Example 1
const s1 = "racecar";
const t1 = "carrace";
console.log(areAnagrams(s1, t1)); // Output: true

// Example 2
const s2 = "jar";
const t2 = "jam";
console.log(areAnagrams(s2, t2)); // Output: false
```
