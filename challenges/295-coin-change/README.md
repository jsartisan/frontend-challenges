Given:
- An array of coin denominations `coins`
- A target amount `amount`
- Unlimited supply of each coin

Return the minimum number of coins needed to make up the exact amount. Return -1 if impossible.

**Constraints:**
- 1 ≤ coins.length ≤ 10
- 1 ≤ coins[i] ≤ 2^31 - 1
- 0 ≤ amount ≤ 10000

**Examples:**
```typescript
// Example 1:
console.log(coinChange([1,5,10], 12));
// Output: 3
// Explanation: 12 = 10 + 1 + 1

// Example 2:
console.log(coinChange([2], 3));
// Output: -1
// Explanation: Can't make 3 with only 2's

// Example 3:
console.log(coinChange([1], 0));
// Output: 0
// Explanation: No coins needed for 0
```
