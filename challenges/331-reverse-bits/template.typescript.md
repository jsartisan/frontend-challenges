```ts index.ts
export function reverseBits(n: number): number {}
```

```ts index.test.ts
import { reverseBits } from "./index";

describe("reverseBits", () => {
  test("Example 1: Basic bit reversal", () => {
    expect(reverseBits(0b00000000000000000000000000010101)).toBe(0b10101000000000000000000000000000 >>> 0);
  });

  test("Zero", () => {
    expect(reverseBits(0)).toBe(0);
  });

  test("One", () => {
    expect(reverseBits(1)).toBe(0b10000000000000000000000000000000 >>> 0);
  });

  test("All ones", () => {
    expect(reverseBits(0b11111111111111111111111111111111 >>> 0)).toBe(0b11111111111111111111111111111111 >>> 0);
  });

  test("Alternating bits", () => {
    expect(reverseBits(0b10101010101010101010101010101010 >>> 0)).toBe(0b01010101010101010101010101010101 >>> 0);
  });

  test("Single one in middle", () => {
    expect(reverseBits(0b00000000000000001000000000000000 >>> 0)).toBe(0b00000000000000010000000000000000 >>> 0);
  });

  test("Ones at edges", () => {
    expect(reverseBits(0b10000000000000000000000000000001 >>> 0)).toBe(0b10000000000000000000000000000001 >>> 0);
  });

  test("Random pattern", () => {
    expect(reverseBits(0b11001100110011001100110011001100 >>> 0)).toBe(0b00110011001100110011001100110011 >>> 0);
  });

  test("Leading zeros", () => {
    expect(reverseBits(0b00000000000000000000000011111111 >>> 0)).toBe(0b11111111000000000000000000000000 >>> 0);
  });

  test("Trailing zeros", () => {
    expect(reverseBits(0b11111111000000000000000000000000 >>> 0)).toBe(0b00000000000000000000000011111111 >>> 0);
  });
});
```
