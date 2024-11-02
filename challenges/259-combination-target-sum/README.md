<!--info-header-start--><h1>Combination Target Sum <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23backtracking-999" alt="#backtracking"/> <img src="https://img.shields.io/badge/-%23recursion-999" alt="#recursion"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/259-combination-target-sum" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array of distinct integers `nums` and a target integer `target`, return all unique combinations of numbers from `nums` that sum to `target`.

Rules:
- Each number can be used unlimited times
- All numbers in `nums` are distinct
- Order of numbers within a combination doesn't matter
- Order of combinations in the result doesn't matter

**Constraints:**
- 1 ≤ nums.length ≤ 20
- 2 ≤ nums[i] ≤ 30
- 2 ≤ target ≤ 30
- All elements in nums are distinct

**Examples:**
```typescript
// Example 1:
console.log(combinationSum([2,5,6,9], 9));
// Output: [[2,2,5], [9]]
// Explanation: 
// 2 + 2 + 5 = 9
// 9 = 9

// Example 2:
console.log(combinationSum([3,4,5], 16));
// Output: [[3,3,3,3,4], [3,3,5,5], [4,4,4,4], [3,4,4,5]]

// Example 3:
console.log(combinationSum([3], 5));
// Output: []
// Explanation: No combinations sum to 5
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,259,undefined&title=259%20-%20Combination%20Target%20Sum%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A259+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->