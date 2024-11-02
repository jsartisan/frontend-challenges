Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals.

Rules:
- Merge any intervals that overlap
- Return array of non-overlapping intervals
- Result covers all input intervals
- Result can be in any order

**Constraints:**
- 1 ≤ intervals.length ≤ 1000
- intervals[i].length == 2
- 0 ≤ start ≤ end ≤ 1000

**Examples:**
```typescript
// Example 1:
console.log(merge([[1,3],[1,5],[6,7]]));
// Output: [[1,5],[6,7]]
// Explanation: First two intervals overlap

// Example 2:
console.log(merge([[1,2],[2,3]]));
// Output: [[1,3]]
// Explanation: Adjacent intervals merge
```
