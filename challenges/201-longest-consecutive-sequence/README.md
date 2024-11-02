Write a function that takes an array of integers `nums` and finds the longest chain of consecutive numbers within it.

A chain of consecutive numbers means each number in the sequence is exactly one more than the number before it (like 1,2,3,4).

Your solution needs to have O(n) time complexity.

**Constraints:**
- 0 ≤ nums.length ≤ 1000
- -10⁹ ≤ nums[i] ≤ 10⁹

**Examples:**

```typescript
// Example 1:
const nums1 = [2, 20, 4, 10, 3, 4, 5];
console.log(longestConsecutive(nums1));
// Output: 4
// Explanation: The longest consecutive sequence is [2, 3, 4, 5]

// Example 2:
const nums2 = [0, 3, 2, 5, 4, 6, 1, 1];
console.log(longestConsecutive(nums2));
// Output: 7
```
