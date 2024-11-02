```ts index.ts 
export function longestCommonSubsequence(text1: string, text2: string): number {
  
}
```

```ts index.test.ts 
import { longestCommonSubsequence } from './index';

describe('longestCommonSubsequence', () => {
  test('Example 1: Subsequence exists', () => {
    expect(longestCommonSubsequence("cat", "crabt")).toBe(3);
  });

  test('Example 2: Identical strings', () => {
    expect(longestCommonSubsequence("abcd", "abcd")).toBe(4);
  });

  test('Example 3: No common subsequence', () => {
    expect(longestCommonSubsequence("abcd", "efgh")).toBe(0);
  });

  test('Single character strings', () => {
    expect(longestCommonSubsequence("a", "a")).toBe(1);
  });

  test('Different length strings', () => {
    expect(longestCommonSubsequence("abc", "ac")).toBe(2);
  });

  test('Partial match', () => {
    expect(longestCommonSubsequence("abc", "def")).toBe(0);
  });

  test('Multiple possible subsequences', () => {
    expect(longestCommonSubsequence("abcde", "ace")).toBe(3);
  });

  test('Repeated characters', () => {
    expect(longestCommonSubsequence("aaaa", "aa")).toBe(2);
  });

  test('Complex sequence', () => {
    expect(longestCommonSubsequence("abcdef", "acf")).toBe(3);
  });

  test('Long strings', () => {
    expect(longestCommonSubsequence("abcdefghij", "acebdfi")).toBe(6);
  });
});
```


