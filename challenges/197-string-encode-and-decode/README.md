Create a function that can convert an array of strings into a single encoded string, and another function that can decode that string back into the original array of strings. The encoding and decoding should be reversible, meaning decoding the encoded string should give back the exact same array that was encoded.

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
