Given an integer array `nums`, return an array `output` where `output[i]` is the product of all elements in `nums` except `nums[i]`.

Each product is guaranteed to fit in a 32-bit integer.

**Follow-up:** Could you solve it in O(n) time without using the division operation?

**Constraints:**
- 2 ≤ nums.length ≤ 1000
- -20 ≤ nums[i] ≤ 20

**Examples:**

```typescript
// Example 1:
const nums1 = [1, 2, 4, 6];
console.log(productExceptSelf(nums1));
// Output: [48, 24, 12, 8]

// Example 2:
const nums2 = [-1, 0, 1, 2, 3];
console.log(productExceptSelf(nums2));
// Output: [0, -6, 0, 0, 0]
```
