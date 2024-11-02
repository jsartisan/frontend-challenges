Given an integer `n`, return an array where `output[i]` is the number of 1's in the binary representation of `i` for all numbers from 0 to n.

Rules:
- Return array of length n+1
- Each element represents count of 1's in binary form of index
- Array starts from 0 and goes up to n

**Constraints:**
- 0 ≤ n ≤ 1000

**Examples:**
```typescript
// Example 1:
console.log(countBits(4));
// Output: [0,1,1,2,1]
// Explanation:
// 0 -> 0     -> 0 ones
// 1 -> 1     -> 1 one
// 2 -> 10    -> 1 one
// 3 -> 11    -> 2 ones
// 4 -> 100   -> 1 one
```
