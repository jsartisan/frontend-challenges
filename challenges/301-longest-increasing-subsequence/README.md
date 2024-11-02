Given an integer array `nums`, find the length of the longest strictly increasing subsequence.

Rules:
- Subsequence can skip elements (doesn't need to be contiguous)
- Must be strictly increasing (each number must be larger than previous)
- Elements must maintain relative order from original array

**Constraints:**
- 1 ≤ nums.length ≤ 1000
- -1000 ≤ nums[i] ≤ 1000

**Examples:**
```typescript
// Example 1:
console.log(lengthOfLIS([9,1,4,2,3,3,7]));
// Output: 4
// Explanation: [1,2,3,7] is longest increasing subsequence

// Example 2:
console.log(lengthOfLIS([0,3,1,3,2,3]));
// Output: 4
// Explanation: [0,1,2,3] is one possible answer
```
