```ts index.ts
export function longestPalindrome(s: string): string {}
```

```ts index.test.ts
import { longestPalindrome } from "./index";

describe("longestPalindrome", () => {
  // Helper function to verify if string is palindrome
  function isPalindrome(s: string): boolean {
    return s === s.split("").reverse().join("");
  }

  test("Example 1: Multiple possible answers", () => {
    const result = longestPalindrome("ababd");
    expect(result.length).toBe(3);
    expect(isPalindrome(result)).toBe(true);
    expect(["aba", "bab"].includes(result)).toBe(true);
  });

  test("Example 2: Even length palindrome", () => {
    expect(longestPalindrome("abbc")).toBe("bb");
  });

  test("Single character", () => {
    expect(longestPalindrome("a")).toBe("a");
  });

  test("All same characters", () => {
    const result = longestPalindrome("aaaa");
    expect(result).toBe("aaaa");
  });

  test("No palindrome longer than 1", () => {
    const result = longestPalindrome("abcd");
    expect(result.length).toBe(1);
    expect(["a", "b", "c", "d"].includes(result)).toBe(true);
  });

  test("Palindrome at start", () => {
    expect(longestPalindrome("aabcd")).toBe("aa");
  });

  test("Palindrome at end", () => {
    expect(longestPalindrome("abcaa")).toBe("aa");
  });

  test("Multiple palindromes of different lengths", () => {
    const result = longestPalindrome("aabaa");
    expect(result).toBe("aabaa");
  });

  test("Mixed characters", () => {
    const result = longestPalindrome("1a2b2a1");
    expect(result).toBe("1a2b2a1");
  });

  test("Long string with short palindrome", () => {
    const result = longestPalindrome("abcdefggfedcba");
    expect(result).toBe("abcdefggfedcba");
  });
});
```
