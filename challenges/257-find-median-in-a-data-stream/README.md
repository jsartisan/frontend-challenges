Design a data structure that supports adding numbers and finding their median.

The median is:
- For odd number of integers: the middle value when sorted
- For even number of integers: average of the two middle values when sorted

Implement the `MedianFinder` class:
- `MedianFinder()` initializes the object
- `addNum(num: number)` adds an integer from the stream
- `findMedian(): number` returns the current median

**Constraints:**
- -100,000 ≤ num ≤ 100,000
- `findMedian` will only be called after adding at least one number
- At most 50,000 calls will be made to `addNum` and `findMedian`

**Examples:**
```typescript
const medianFinder = new MedianFinder();
medianFinder.addNum(1);    // [1]
medianFinder.findMedian(); // returns 1.0
medianFinder.addNum(3);    // [1, 3]
medianFinder.findMedian(); // returns 2.0
medianFinder.addNum(2);    // [1, 2, 3]
medianFinder.findMedian(); // returns 2.0
```
