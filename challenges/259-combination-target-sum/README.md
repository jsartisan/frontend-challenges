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
