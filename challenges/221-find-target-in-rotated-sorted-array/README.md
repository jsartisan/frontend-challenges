You are given an array of length n which was originally sorted in ascending order. It has now been rotated between 1 and n times. For example, the array nums = [1,2,3,4,5,6] might become:

- [3,4,5,6,1,2] if it was rotated 4 times.
- [1,2,3,4,5,6] if it was rotated 6 times.

Given the rotated sorted array nums and an integer target, return the index of target within nums, or -1 if it is not present.

You may assume all elements in the sorted rotated array nums are unique.

A solution that runs in O(n) time is trivial, can you write an algorithm that runs in O(log n) time?

**Constraints:**
- 1 ≤ nums.length ≤ 1000
- -1000 ≤ nums[i] ≤ 1000
- -1000 ≤ target ≤ 1000

**Examples:**

```typescript
// Example 1:
const nums1 = [3, 4, 5, 6, 1, 2];
const target1 = 1;
console.log(search(nums1, target1));
// Output: 4

// Example 2:
const nums2 = [3, 5, 6, 0, 1, 2];
const target2 = 4;
console.log(search(nums2, target2));
// Output: -1
```
