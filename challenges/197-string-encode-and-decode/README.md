Design an algorithm to encode a list of strings to a single string and decode it back to the original list of strings.

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
