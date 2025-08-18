```ts index.ts
export const range = (from: number, to: number) => {};
```

```ts index.test.ts
import { range } from "./index";

describe("range function", () => {
  test("should iterate from start to end inclusive", () => {
    const results = [];
    for (let num of range(1, 4)) {
      results.push(num);
    }
    expect(results).toEqual([1, 2, 3, 4]);
  });

  test("should handle case where from equals to", () => {
    const results = [];
    for (let num of range(5, 5)) {
      results.push(num);
    }
    expect(results).toEqual([5]);
  });

  test("should handle case where from is greater than to", () => {
    const results = [];
    for (let num of range(5, 3)) {
      results.push(num);
    }
    expect(results).toEqual([]);
  });

  test("should handle negative ranges", () => {
    const results = [];
    for (let num of range(-2, 2)) {
      results.push(num);
    }
    expect(results).toEqual([-2, -1, 0, 1, 2]);
  });

  test("should handle large ranges efficiently", () => {
    const results = [];
    for (let num of range(1, 1000)) {
      results.push(num);
    }
    expect(results.length).toBe(1000);
    expect(results[0]).toBe(1);
    expect(results[999]).toBe(1000);
  });
});
```
