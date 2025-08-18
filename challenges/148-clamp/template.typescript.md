```ts index.ts
export function clamp(number: number, lower: number, upper: number): number {}
```

```ts index.test.ts
import { clamp } from "./index";

describe("clamp function", () => {
  test("should return the number if it is within the bounds", () => {
    expect(clamp(10, 5, 15)).toBe(10);
  });

  test("should return the lower bound if the number is less than the lower bound", () => {
    expect(clamp(4, 5, 15)).toBe(5);
  });

  test("should return the upper bound if the number is greater than the upper bound", () => {
    expect(clamp(20, 5, 15)).toBe(15);
  });

  test("should handle negative bounds", () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(0, -5, 5)).toBe(0);
  });

  test("should handle bounds being equal", () => {
    expect(clamp(10, 10, 10)).toBe(10);
    expect(clamp(5, 5, 5)).toBe(5);
  });

  test("should handle bounds where lower > upper by returning lower", () => {
    expect(clamp(10, 15, 5)).toBe(15);
    expect(clamp(3, 5, 3)).toBe(5);
  });
});
```
