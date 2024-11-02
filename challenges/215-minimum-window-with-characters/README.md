Given two strings `s` and `t`, return the shortest substring of `s` such that every character in `t`, including duplicates, is present in the substring. If such a substring does not exist, return an empty string `""`.

You may assume that the correct output is always unique.

**Constraints:**
- 1 ≤ s.length ≤ 1000
- 1 ≤ t.length ≤ 1000
- s and t consist of uppercase and lowercase English letters

**Examples:**

```typescript
// Example 1:
const s1 = "OUZODYXAZV";
const t1 = "XYZ";
console.log(minWindow(s1, t1));
// Output: "YXAZ"
// Explanation: "YXAZ" is the shortest substring that includes "X", "Y", and "Z" from string t.

// Example 2:
const s2 = "xyz";
const t2 = "xyz";
console.log(minWindow(s2, t2));
// Output: "xyz"

// Example 3:
const s3 = "x";
const t3 = "xy";
console.log(minWindow(s3, t3));
// Output: ""
```
