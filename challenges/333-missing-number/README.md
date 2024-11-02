Given an array `nums` containing n distinct numbers in range [0, n], return the only number in the range that is missing.

Rules:
- Array contains n distinct numbers
- Numbers are in range [0, n]
- Exactly one number is missing
- Try to use O(1) extra space
- Try to achieve O(n) runtime

**Constraints:**
- 1 ≤ nums.length ≤ 1000
- All numbers are unique
- Numbers are in range [0, n]

**Examples:**
```typescript
// Example 1:
console.log(missingNumber([1,2,3]));
// Output: 0
// Explanation: Range is [0,3], 0 is missing

// Example 2:
console.log(missingNumber([0,2]));
// Output: 1
// Explanation: Range is [0,2], 1 is missing
```
