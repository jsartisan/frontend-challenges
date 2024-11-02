You are given an array of length n which was originally sorted in ascending order. It has now been rotated between 1 and n times. For example, the array nums = [1,2,3,4,5,6] might become:

- [3,4,5,6,1,2] if it was rotated 4 times.
- [1,2,3,4,5,6] if it was rotated 6 times.

Notice that rotating the array 4 times moves the last four elements of the array to the beginning. Rotating the array 6 times produces the original array.

Assuming all elements in the rotated sorted array nums are unique, return the minimum element of this array.

A solution that runs in O(n) time is trivial, can you write an algorithm that runs in O(log n) time?

**Constraints:**
- 1 ≤ nums.length ≤ 1000
- -1000 ≤ nums[i] ≤ 1000
- All the integers of nums are unique

**Examples:**

```typescript
// Example 1:
const nums1 = [3, 4, 5, 6, 1, 2];
console.log(findMin(nums1));
// Output: 1

// Example 2:
const nums2 = [4, 5, 0, 1, 2, 3];
console.log(findMin(nums2));
// Output: 0

// Example 3:
const nums3 = [4, 5, 6, 7];
console.log(findMin(nums3));
// Output: 4
```
