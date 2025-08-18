```ts index.ts
export function maxProfit(prices: number[]): number {}
```

```ts index.test.ts
import { maxProfit } from "./index";

describe("maxProfit", () => {
  test("Example 1: Regular case with profit", () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  test("Example 2: Decreasing prices", () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });

  test("Single day", () => {
    expect(maxProfit([1])).toBe(0);
  });

  test("Two days with profit", () => {
    expect(maxProfit([1, 2])).toBe(1);
  });

  test("Two days without profit", () => {
    expect(maxProfit([2, 1])).toBe(0);
  });

  test("Same prices", () => {
    expect(maxProfit([5, 5, 5, 5])).toBe(0);
  });

  test("Multiple peaks and valleys", () => {
    expect(maxProfit([3, 2, 6, 1, 2])).toBe(4);
  });
});
```
