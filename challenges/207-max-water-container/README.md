<!--info-header-start--><h1>Max Water Container <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/> <img src="https://img.shields.io/badge/-%23two--pointers-999" alt="#two-pointers"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/207-max-water-container" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array of integers `heights`, where each value represents the height of a vertical bar at position i, find the maximum volume of water that can be trapped between any two bars.

Each pair of bars, along with the x-axis, forms a container that can hold water. Calculate and return the largest possible container volume.

**Constraints:**
- 2 ≤ height.length ≤ 1000
- 0 ≤ height[i] ≤ 1000

**Examples:**

```typescript
// Example 1:
const height1 = [1, 7, 2, 5, 4, 7, 3, 6];
console.log(maxArea(height1));
// Output: 36
// Explanation: Using bars at index 1 and 5 (both height 7) creates the largest container

// Example 2:
const height2 = [2, 2, 2];
console.log(maxArea(height2));
// Output: 4
// Explanation: Any pair of bars will form the same area
```

![Container With Most Water](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,207,undefined&title=207%20-%20Max%20Water%20Container%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A207+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->