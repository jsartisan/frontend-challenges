Consider an array that started out sorted in ascending order, but has undergone between 1 and n right rotations (where n is the length). Let's look at what happens to [1,2,3,4,5,6] after some rotations:

- With 4 right rotations: [3,4,5,6,1,2] 
- With 6 right rotations: [1,2,3,4,5,6]

Write a function that takes this rotated array nums and a target value as input. Your task is to find and return the index where target appears in nums. If target isn't found, return -1.

You can count on the fact that no value appears more than once in the rotated array.

While a simple linear search would work, the challenge is to develop a solution with O(log n) time complexity instead of O(n).

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
