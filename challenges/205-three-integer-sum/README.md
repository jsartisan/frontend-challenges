<!--info-header-start--><h1>Three Integer Sum <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/> <img src="https://img.shields.io/badge/-%23two--pointers-999" alt="#two-pointers"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/205-three-integer-sum" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,205,undefined&title=205%20-%20Three%20Integer%20Sum%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A205+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->