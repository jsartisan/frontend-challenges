<!--info-header-start--><h1>Products of Array Excluding Self <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/199-products-of-array-excluding-self" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Write a function that takes an array of integers `nums` and returns a new array where each element at index `i` contains the result of multiplying all numbers in the input array together, excluding the number at index `i`.

You can assume that none of the multiplication results will exceed the maximum value that can be stored in a 32-bit integer.

**Follow-up:** Could you solve it in O(n) time without using the division operation?

**Constraints:**
- 2 ≤ nums.length ≤ 1000
- -20 ≤ nums[i] ≤ 20

**Examples:**

```typescript
// Example 1:
const nums1 = [1, 2, 4, 6];
console.log(productExceptSelf(nums1));
// Output: [48, 24, 12, 8]

// Example 2:
const nums2 = [-1, 0, 1, 2, 3];
console.log(productExceptSelf(nums2));
// Output: [0, -6, 0, 0, 0]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,199,undefined&title=199%20-%20Products%20of%20Array%20Excluding%20Self%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A199+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->