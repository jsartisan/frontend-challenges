Given an array `nums` where `nums[i]` represents the money in the i-th house:
- Houses are arranged in a line
- Each house is adjacent to houses at i-1 and i+1
- Cannot rob adjacent houses (security system will alert police)

Return the maximum amount of money you can rob without alerting the police.

**Constraints:**
- 1 ≤ nums.length ≤ 100
- 0 ≤ nums[i] ≤ 100

**Examples:**
```typescript
// Example 1:
console.log(rob([1,1,3,3]));
// Output: 4
// Explanation: Rob houses 0 and 2 (1 + 3 = 4)

// Example 2:
console.log(rob([2,9,8,3,6]));
// Output: 16
// Explanation: Rob houses 0, 2, and 4 (2 + 8 + 6 = 16)
```
