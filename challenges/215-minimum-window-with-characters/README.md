Write a function that takes two strings `s` and `t` as input. Find and return the minimum length substring from `s` that contains all characters from `t` (including any duplicate characters). If no such substring exists in `s`, return an empty string `""`.

The problem guarantees that there will be exactly one valid answer when a solution exists.

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
