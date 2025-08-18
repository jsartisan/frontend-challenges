```ts index.ts
export function wordBreak(s: string, wordDict: string[]): boolean {}
```

```ts index.test.ts
import { wordBreak } from "./index";

describe("wordBreak", () => {
  test("Example 1: Simple split", () => {
    expect(wordBreak("neetcode", ["neet", "code"])).toBe(true);
  });

  test("Example 2: Reuse words", () => {
    expect(wordBreak("applepenapple", ["apple", "pen"])).toBe(true);
  });

  test("Example 3: Cannot segment", () => {
    expect(wordBreak("catsincars", ["cats", "cat", "sin", "in", "car"])).toBe(false);
  });

  test("Single word match", () => {
    expect(wordBreak("hello", ["hello"])).toBe(true);
  });

  test("Empty string", () => {
    expect(wordBreak("", ["test"])).toBe(true);
  });

  test("No possible combination", () => {
    expect(wordBreak("cars", ["car", "ca", "rs"])).toBe(false);
  });

  test("Multiple valid splits", () => {
    expect(wordBreak("pineapplepen", ["pine", "pineapple", "apple", "pen"])).toBe(true);
  });

  test("Overlapping words", () => {
    expect(wordBreak("foofoo", ["foo"])).toBe(true);
  });

  test("Single character words", () => {
    expect(wordBreak("abcde", ["a", "b", "c", "d", "e"])).toBe(true);
  });

  test("Long string with short words", () => {
    expect(wordBreak("aaaaaaa", ["aaa", "aaaa"])).toBe(true);
  });
});
```
