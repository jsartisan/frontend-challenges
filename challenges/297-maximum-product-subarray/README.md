Given an integer array `nums`, find the contiguous subarray with the largest product and return the product.

Rules:
- Subarray must be contiguous (elements next to each other)
- Subarray must be non-empty
- Result will fit in 32-bit integer

**Constraints:**
- 1 ≤ nums.length ≤ 1000
- -10 ≤ nums[i] ≤ 10

**Examples:**
```typescript
// Example 1:
console.log(maxProduct([1,2,-3,4]));
// Output: 4
// Explanation: [4] has largest product

// Example 2:
console.log(maxProduct([-2,-1]));
// Output: 2
// Explanation: [-2,-1] product is 2
```
