```ts index.ts
export function lengthOfLongestSubstring(s: string): number {}
```

```ts index.test.ts
import { lengthOfLongestSubstring } from "./index";

describe("lengthOfLongestSubstring", () => {
  test("Example 1: Regular case", () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
  });

  test("Example 2: All same characters", () => {
    expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
  });

  test("Example 3: Multiple non-repeating sequences", () => {
    expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
  });

  test("Empty string", () => {
    expect(lengthOfLongestSubstring("")).toBe(0);
  });

  test("Single character", () => {
    expect(lengthOfLongestSubstring("a")).toBe(1);
  });

  test("No repeating characters", () => {
    expect(lengthOfLongestSubstring("abcde")).toBe(5);
  });

  test("With spaces and special characters", () => {
    expect(lengthOfLongestSubstring("ab c!d")).toBe(5);
  });
});
```
