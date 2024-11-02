Given an array of meeting intervals where `intervals[i] = [start_i, end_i]`, find the minimum number of days needed to schedule all meetings without conflicts.

Rules:
- Multiple meetings can be scheduled on the same day if they don't conflict
- Meetings with common endpoints don't conflict
- All meetings must be scheduled
- Start time is always less than end time

**Constraints:**
- 0 ≤ intervals.length ≤ 500
- 0 ≤ start < end ≤ 1,000,000

**Examples:**
```typescript
// Example 1:
console.log(minMeetingDays([[0,40],[5,10],[15,20]]));
// Output: 2
// Explanation:
// Day 1: [0,40]
// Day 2: [5,10], [15,20]

// Example 2:
console.log(minMeetingDays([[4,9]]));
// Output: 1
// Explanation: Only one day needed for one meeting
```
