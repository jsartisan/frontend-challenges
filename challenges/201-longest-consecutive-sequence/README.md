Given an array of integers `nums`, return the length of the longest consecutive sequence of elements.

A consecutive sequence is a sequence of elements in which each element is exactly 1 greater than the previous element.

You must write an algorithm that runs in O(n) time.

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
