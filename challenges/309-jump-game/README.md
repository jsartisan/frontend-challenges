Given an array `nums` where each element represents the maximum jump length at that position, determine if you can reach the last index starting from index 0.

Rules:
- Start at first position (index 0)
- At each position i, can jump up to nums[i] steps forward
- Must reach last index exactly
- Cannot jump backward

**Constraints:**
- 1 ≤ nums.length ≤ 1000
- 0 ≤ nums[i] ≤ 1000

**Examples:**
```typescript
// Example 1:
console.log(canJump([1,2,0,1,0]));
// Output: true
// Explanation: Jump path: 0->1->3->4

// Example 2:
console.log(canJump([1,2,1,0,1]));
// Output: false
// Explanation: Can't reach last index
```
