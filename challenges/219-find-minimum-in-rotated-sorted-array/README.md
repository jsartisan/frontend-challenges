<!--info-header-start--><h1>Find Minimum in Rotated Sorted Array <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/> <img src="https://img.shields.io/badge/-%23binary--search-999" alt="#binary-search"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/219-find-minimum-in-rotated-sorted-array" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,219,undefined&title=219%20-%20Find%20Minimum%20in%20Rotated%20Sorted%20Array%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A219+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->