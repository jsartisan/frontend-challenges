<!--info-header-start--><h1>Top K Frequent Elements <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/194-top-k-frequent-elements" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Create a function that accepts an array of integers `nums` and a number `k`. The function should find and return the `k` elements that appear most frequently in the array.

The problem guarantees that there will be only one valid solution - that is, there won't be any ties when determining the `k` most common elements.

The elements can be returned in any sequence you prefer.

**Constraints:**
- 1 ≤ `nums.length` ≤ 10^4
- -1000 ≤ `nums[i]` ≤ 1000
- 1 ≤ `k` ≤ number of distinct elements in `nums`

**Examples:**

```js
// Example 1
const nums1 = [1, 2, 2, 3, 3, 3];
const k1 = 2;
console.log(topKFrequent(nums1, k1)); 
// Output: [2, 3]

// Example 2
const nums2 = [7, 7];
const k2 = 1;
console.log(topKFrequent(nums2, k2));
// Output: [7]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,194,undefined&title=194%20-%20Top%20K%20Frequent%20Elements%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A194+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->