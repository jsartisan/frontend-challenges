```ts index.ts
export function characterReplacement(s: string, k: number): number {}
```

```ts index.test.ts
import { characterReplacement } from "./index";

describe("characterReplacement", () => {
  test("Example 1: Equal distribution", () => {
    expect(characterReplacement("XYYX", 2)).toBe(4);
  });

  test("Example 2: Single replacement", () => {
    expect(characterReplacement("AAABABB", 1)).toBe(5);
  });

  test("Single character string", () => {
    expect(characterReplacement("A", 1)).toBe(1);
  });

  test("No replacements needed", () => {
    expect(characterReplacement("AAAA", 2)).toBe(4);
  });

  test("All different characters", () => {
    expect(characterReplacement("ABCD", 1)).toBe(2);
  });

  test("Maximum replacements", () => {
    expect(characterReplacement("ABAB", 2)).toBe(4);
  });

  test("Zero replacements allowed", () => {
    expect(characterReplacement("AABABBA", 0)).toBe(2);
  });
});
```
