<!--info-header-start--><h1>House Robber II <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23dynamic--programming-999" alt="#dynamic-programming"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/287-house-robber-ii" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array `nums` where `nums[i]` represents the money in the i-th house:
- Houses are arranged in a circle (first and last houses are adjacent)
- Cannot rob adjacent houses (security system will alert police)
- Cannot rob first and last house together (they're adjacent)

Return the maximum amount of money you can rob without alerting the police.

**Constraints:**
- 1 ≤ nums.length ≤ 100
- 0 ≤ nums[i] ≤ 100

**Examples:**
```typescript
// Example 1:
console.log(rob([3,4,3]));
// Output: 4
// Explanation: Can't rob houses 0 and 2 (adjacent in circle)
// Maximum is house 1 (4)

// Example 2:
console.log(rob([2,9,8,3,6]));
// Output: 15
// Explanation: Can't rob houses 0,2,4 (0 and 4 adjacent in circle)
// Maximum is houses 1,4 (9 + 6 = 15)
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,287,undefined&title=287%20-%20House%20Robber%20II%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A287+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->