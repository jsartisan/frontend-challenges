Write a function that finds all unique combinations of three different numbers in an array `nums` that add up to zero. Each combination should be returned as an array of three numbers.

For example, if the array contains numbers that can form multiple triplets summing to 0, return all such triplets without duplicates. The order of the triplets and numbers within them doesn't matter.

**Constraints:**
- 3 ≤ nums.length ≤ 1000
- -10⁵ ≤ nums[i] ≤ 10⁵

**Examples:**

```typescript
// Example 1:
const nums1 = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums1));
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0
// The distinct triplets are [-1,0,1] and [-1,-1,2]

// Example 2:
const nums2 = [0, 1, 1];
console.log(threeSum(nums2));
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Example 3:
const nums3 = [0, 0, 0];
console.log(threeSum(nums3));
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.
```
