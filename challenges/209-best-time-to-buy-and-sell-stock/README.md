Given a list of stock prices `prices` represented as an array, where each element `prices[i]` shows the stock price on day i.

Your task is to find the best possible profit by buying the stock on one day and selling it on a later day. You can only make one transaction (one buy and one sell).

Calculate and return the highest profit possible. If no profit can be made, return 0.

**Constraints:**
- 1 ≤ prices.length ≤ 10⁵
- 0 ≤ prices[i] ≤ 10⁴

**Examples:**

```typescript
// Example 1:
const prices1 = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices1));
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

// Example 2:
const prices2 = [7, 6, 4, 3, 1];
console.log(maxProfit(prices2));
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.
```
