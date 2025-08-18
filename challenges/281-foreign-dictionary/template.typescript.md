```ts index.ts
export function alienOrder(words: string[]): string {}
```

```ts index.test.ts
import { alienOrder } from "./index";

describe("alienOrder", () => {
  // Helper function to validate the order
  function isValidOrder(words: string[], order: string): boolean {
    if (!order) return false;

    const orderMap = new Map([...order].map((char, index) => [char, index]));

    for (let i = 0; i < words.length - 1; i++) {
      const word1 = words[i];
      const word2 = words[i + 1];
      const len = Math.min(word1.length, word2.length);
      let found = false;

      for (let j = 0; j < len; j++) {
        if (word1[j] !== word2[j]) {
          if (orderMap.get(word1[j])! > orderMap.get(word2[j])!) {
            return false;
          }
          found = true;
          break;
        }
      }

      if (!found && word1.length > word2.length) {
        return false;
      }
    }

    return true;
  }

  test("Example 1: Two letters", () => {
    const words = ["z", "o"];
    const result = alienOrder(words);
    expect(isValidOrder(words, result)).toBe(true);
  });

  test("Example 2: Complex order", () => {
    const words = ["hrn", "hrf", "er", "enn", "rfnn"];
    const result = alienOrder(words);
    expect(isValidOrder(words, result)).toBe(true);
  });

  test("Single word", () => {
    const words = ["abc"];
    const result = alienOrder(words);
    expect(result.length).toBe(3);
    expect(new Set(result).size).toBe(3);
  });

  test("Invalid order", () => {
    const words = ["abc", "ab"];
    expect(alienOrder(words)).toBe("");
  });

  test("Cyclic dependency", () => {
    const words = ["abc", "bcd", "cde", "aaa"];
    expect(alienOrder(words)).toBe("");
  });

  test("Same prefix different lengths", () => {
    const words = ["ab", "abc"];
    const result = alienOrder(words);
    expect(isValidOrder(words, result)).toBe(true);
  });

  test("All unique letters", () => {
    const words = ["a", "b", "c"];
    const result = alienOrder(words);
    expect(isValidOrder(words, result)).toBe(true);
  });

  test("Multiple valid orders", () => {
    const words = ["ac", "ab", "bc"];
    const result = alienOrder(words);
    expect(isValidOrder(words, result)).toBe(true);
  });

  test("Repeated letters", () => {
    const words = ["aaa", "aab"];
    const result = alienOrder(words);
    expect(isValidOrder(words, result)).toBe(true);
  });
});
```
