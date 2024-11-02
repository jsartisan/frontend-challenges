Given an array of meeting intervals where `intervals[i] = [start_i, end_i]`, determine if all meetings can be attended without conflicts.

Rules:
- Meetings with common endpoints don't conflict
- All meetings must be attended
- Start time is always less than end time

**Constraints:**
- 0 ≤ intervals.length ≤ 500
- 0 ≤ start < end ≤ 1,000,000

**Examples:**
```typescript
// Example 1:
console.log(canAttendMeetings([[0,30],[5,10],[15,20]]));
// Output: false
// Explanation: Multiple conflicts:
// - [0,30] conflicts with [5,10]
// - [0,30] conflicts with [15,20]

// Example 2:
console.log(canAttendMeetings([[5,8],[9,15]]));
// Output: true
// Explanation: No conflicts, [5,8] ends before [9,15] starts
```
