Given an array of intervals where `intervals[i] = [start_i, end_i]`, find the minimum number of intervals to remove to make the remaining intervals non-overlapping.

Rules:
- Intervals with common endpoints are considered non-overlapping
- Must remove minimum number of intervals
- Intervals overlap if they share any points except endpoints

**Constraints:**
- 1 ≤ intervals.length ≤ 1000
- intervals[i].length == 2
- -50000 ≤ start < end ≤ 50000

**Examples:**
```typescript
// Example 1:
console.log(eraseOverlapIntervals([[1,2],[2,4],[1,4]]));
// Output: 1
// Explanation: Remove [1,4] to make non-overlapping

// Example 2:
console.log(eraseOverlapIntervals([[1,2],[2,4]]));
// Output: 0
// Explanation: Already non-overlapping
```
