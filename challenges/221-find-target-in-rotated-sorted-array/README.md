<!--info-header-start--><h1>Find Target in Rotated Sorted Array <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/> <img src="https://img.shields.io/badge/-%23binary--search-999" alt="#binary-search"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/221-find-target-in-rotated-sorted-array" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,221,undefined&title=221%20-%20Find%20Target%20in%20Rotated%20Sorted%20Array%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A221+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->