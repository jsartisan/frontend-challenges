Given an integer array `nums`, find the contiguous subarray with the largest sum and return the sum.

Rules:
- Subarray must be contiguous (elements next to each other)
- Subarray must be non-empty
- Array can contain negative numbers

**Constraints:**
- 1 ≤ nums.length ≤ 1000
- -1000 ≤ nums[i] ≤ 1000

**Examples:**
```typescript
// Example 1:
console.log(maxSubArray([2,-3,4,-2,2,1,-1,4]));
// Output: 8
// Explanation: Subarray [4,-2,2,1,-1,4] sums to 8

// Example 2:
console.log(maxSubArray([-1]));
// Output: -1
// Explanation: Single element array, -1 is the only sum
```
