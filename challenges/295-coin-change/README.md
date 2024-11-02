<!--info-header-start--><h1>Coin Change <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23dynamic--programming-999" alt="#dynamic-programming"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/295-coin-change" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,295,undefined&title=295%20-%20Coin%20Change%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A295+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->