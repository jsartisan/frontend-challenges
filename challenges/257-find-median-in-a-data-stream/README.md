<!--info-header-start--><h1>Find Median in a Data Stream <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23blind75-999" alt="#blind75"/> <img src="https://img.shields.io/badge/-%23heap-999" alt="#heap"/> <img src="https://img.shields.io/badge/-%23data--stream-999" alt="#data-stream"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/257-find-median-in-a-data-stream" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

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


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,257,undefined&title=257%20-%20Find%20Median%20in%20a%20Data%20Stream%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A257+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->