```ts index.ts
export function hammingWeight(n: number): number {}
```

```ts index.test.ts
import { hammingWeight } from "./index";

describe("hammingWeight", () => {
  test("Example 1: Few ones", () => {
    expect(hammingWeight(0b00000000000000000000000000010111)).toBe(4);
  });

  test("Example 2: Many ones", () => {
    expect(hammingWeight(0b01111111111111111111111111111101)).toBe(30);
  });

  test("Zero", () => {
    expect(hammingWeight(0)).toBe(0);
  });

  test("One", () => {
    expect(hammingWeight(1)).toBe(1);
  });

  test("Power of two", () => {
    expect(hammingWeight(0b10000000000000000000000000000000)).toBe(1);
  });

  test("All ones", () => {
    expect(hammingWeight(0b11111111111111111111111111111111)).toBe(32);
  });

  test("Alternating bits", () => {
    expect(hammingWeight(0b10101010101010101010101010101010)).toBe(16);
  });

  test("Single one in middle", () => {
    expect(hammingWeight(0b00000000000000001000000000000000)).toBe(1);
  });

  test("Ones at edges", () => {
    expect(hammingWeight(0b10000000000000000000000000000001)).toBe(2);
  });

  test("Random pattern", () => {
    expect(hammingWeight(0b11001100110011001100110011001100)).toBe(16);
  });
});
```
