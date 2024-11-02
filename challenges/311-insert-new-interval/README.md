Given:
- Array of non-overlapping intervals `intervals` where intervals[i] = [start_i, end_i]
- A new interval `newInterval = [start, end]`
- intervals is sorted by start time

Insert newInterval into intervals such that:
- Result remains sorted by start time
- No overlapping intervals (merge if needed)
- Return the resulting intervals array

**Constraints:**
- 0 ≤ intervals.length ≤ 1000
- newInterval.length == intervals[i].length == 2
- 0 ≤ start ≤ end ≤ 1000

**Examples:**
```typescript
// Example 1:
console.log(insert([[1,3],[4,6]], [2,5]));
// Output: [[1,6]]
// Explanation: [2,5] overlaps with both intervals

// Example 2:
console.log(insert([[1,2],[3,5],[9,10]], [6,7]));
// Output: [[1,2],[3,5],[6,7],[9,10]]
// Explanation: [6,7] fits between existing intervals
```
