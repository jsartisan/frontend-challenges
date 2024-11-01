### Interview Question: Top K Frequent Elements

**Question:**

Given an integer array `nums` and an integer `k`, write a function that returns the `k` most frequent elements in the array.

The test cases are designed so that the answer is always unique (meaning that there is exactly one way to pick the `k` most frequent elements).

You may return the output in any order.

**Constraints:**
- \(1 \leq \text{nums.length} \leq 10^4\)
- \(-1000 \leq \text{nums[i]} \leq 1000\)
- \(1 \leq k \leq\) (number of distinct elements in `nums`)

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
