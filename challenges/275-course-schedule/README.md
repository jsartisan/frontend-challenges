Given `numCourses` courses (labeled 0 to numCourses-1) and prerequisites where `prerequisites[i] = [a, b]` means:
- You must take course `b` before taking course `a`

Determine if it's possible to finish all courses.

**Constraints:**
- 1 ≤ numCourses ≤ 1000
- 0 ≤ prerequisites.length ≤ 1000
- All prerequisite pairs are unique
- prerequisites[i].length == 2

**Examples:**
```typescript
// Example 1:
const numCourses1 = 2;
const prerequisites1 = [[0,1]];
console.log(canFinish(numCourses1, prerequisites1));
// Output: true
// Explanation: Take course 1 first, then course 0

// Example 2:
const numCourses2 = 2;
const prerequisites2 = [[0,1],[1,0]];
console.log(canFinish(numCourses2, prerequisites2));
// Output: false
// Explanation: Courses 0 and 1 form a cycle, impossible
```
