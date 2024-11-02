Consider an array that was initially sorted in ascending order, but has been shifted right a certain number of positions (between 1 and n, where n is the array length). Take this example with the array [1,2,3,4,5,6]:

- After shifting right 4 positions: [3,4,5,6,1,2]
- After shifting right 6 positions: [1,2,3,4,5,6]

When we shift right by 4, the last 4 elements move to the front while the others move to the end. A full rotation of n positions returns us to the original array.

Your task is to find the smallest number in this shifted array, given that all numbers are distinct.

While scanning the entire array would work in O(n) time, can you devise a more efficient solution that runs in O(log n)?

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
