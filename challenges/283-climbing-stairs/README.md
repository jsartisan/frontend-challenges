Given a staircase with `n` steps, find the number of distinct ways to climb to the top if you can:
- Take 1 step at a time
- Take 2 steps at a time

**Constraints:**
- 1 ≤ n ≤ 30

**Examples:**
```typescript
// Example 1:
console.log(climbStairs(2));
// Output: 2
// Explanation: Two ways to climb:
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
console.log(climbStairs(3));
// Output: 3
// Explanation: Three ways to climb:
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step
```
