Given an array of integers `heights`, where each value represents the height of a vertical bar at position i, find the maximum volume of water that can be trapped between any two bars.

Each pair of bars, along with the x-axis, forms a container that can hold water. Calculate and return the largest possible container volume.

**Constraints:**
- 2 ≤ height.length ≤ 1000
- 0 ≤ height[i] ≤ 1000

**Examples:**

```typescript
// Example 1:
const height1 = [1, 7, 2, 5, 4, 7, 3, 6];
console.log(maxArea(height1));
// Output: 36
// Explanation: Using bars at index 1 and 5 (both height 7) creates the largest container

// Example 2:
const height2 = [2, 2, 2];
console.log(maxArea(height2));
// Output: 4
// Explanation: Any pair of bars will form the same area
```

![Container With Most Water](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)
