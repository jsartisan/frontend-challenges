```ts index.ts 
export class MedianFinder {
  constructor() {}

  addNum(num: number): void {}

  findMedian(): number {}
}

```

```ts index.test.ts 
import { MedianFinder } from "./index";

describe("MedianFinder", () => {
  test("Example 1: Basic operations", () => {
    const medianFinder = new MedianFinder();

    medianFinder.addNum(1);
    expect(medianFinder.findMedian()).toBe(1.0);

    medianFinder.addNum(3);
    expect(medianFinder.findMedian()).toBe(2.0);

    medianFinder.addNum(2);
    expect(medianFinder.findMedian()).toBe(2.0);
  });

  test("Even number of elements", () => {
    const medianFinder = new MedianFinder();

    medianFinder.addNum(1);
    medianFinder.addNum(2);
    expect(medianFinder.findMedian()).toBe(1.5);

    medianFinder.addNum(3);
    medianFinder.addNum(4);
    expect(medianFinder.findMedian()).toBe(2.5);
  });

  test("Negative numbers", () => {
    const medianFinder = new MedianFinder();

    medianFinder.addNum(-1);
    medianFinder.addNum(-2);
    medianFinder.addNum(-3);
    expect(medianFinder.findMedian()).toBe(-2.0);
  });

  test("Duplicate numbers", () => {
    const medianFinder = new MedianFinder();

    medianFinder.addNum(1);
    medianFinder.addNum(1);
    medianFinder.addNum(2);
    expect(medianFinder.findMedian()).toBe(1.0);
  });

  test("Large sequence", () => {
    const medianFinder = new MedianFinder();

    for (let i = 1; i <= 10; i++) {
      medianFinder.addNum(i);
    }
    expect(medianFinder.findMedian()).toBe(5.5);
  });

  test("Random order", () => {
    const medianFinder = new MedianFinder();

    medianFinder.addNum(5);
    medianFinder.addNum(2);
    medianFinder.addNum(8);
    medianFinder.addNum(1);
    medianFinder.addNum(3);
    expect(medianFinder.findMedian()).toBe(3.0);
  });
});

```


