You are given an array of integers `nums` and an integer `target`. Write a function that returns the indices `i` and `j` such that `nums[i] + nums[j] == target` and `i != j`.

You can assume that each input will have exactly one pair of indices `i` and `j` that satisfy the condition.

Make sure to return the indices with the smaller index first.

**Constraints:**
- 2 ≤ `nums.length` ≤ 1000
- -10,000,000 ≤ `nums[i]` ≤ 10,000,000
- -10,000,000 ≤ `target` ≤ 10,000,000

**Example Usage:**

```js
// Example 1
const nums1 = [3, 4, 5, 6];
const target1 = 7;
console.log(twoSum(nums1, target1)); // Output: [0, 1]

// Example 2
const nums2 = [4, 5, 6];
const target2 = 10;
console.log(twoSum(nums2, target2)); // Output: [0, 2]

// Example 3
const nums3 = [5, 5];
const target3 = 10;
console.log(twoSum(nums3, target3)); // Output: [0, 1]
```
