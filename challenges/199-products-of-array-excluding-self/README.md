Write a function that takes an array of integers `nums` and returns a new array where each element at index `i` contains the result of multiplying all numbers in the input array together, excluding the number at index `i`.

You can assume that none of the multiplication results will exceed the maximum value that can be stored in a 32-bit integer.

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
