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
