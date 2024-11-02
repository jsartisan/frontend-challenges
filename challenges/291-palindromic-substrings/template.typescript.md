```ts index.ts 
export function countSubstrings(s: string): number {
  
}
```

```ts index.test.ts 
import { countSubstrings } from './index';

describe('countSubstrings', () => {
  test('Example 1: All single character palindromes', () => {
    expect(countSubstrings("abc")).toBe(3);
  });

  test('Example 2: Repeated characters', () => {
    expect(countSubstrings("aaa")).toBe(6);
  });

  test('Single character', () => {
    expect(countSubstrings("a")).toBe(1);
  });

  test('Two different characters', () => {
    expect(countSubstrings("ab")).toBe(2);
  });

  test('Two same characters', () => {
    expect(countSubstrings("aa")).toBe(3);
  });

  test('No palindromes longer than 1', () => {
    expect(countSubstrings("abc")).toBe(3);
  });

  test('Mixed palindromes', () => {
    expect(countSubstrings("aba")).toBe(4);
  });

  test('Multiple palindromes of different lengths', () => {
    expect(countSubstrings("aabaa")).toBe(9);
  });

  test('Alternating characters', () => {
    expect(countSubstrings("ababab")).toBe(7);
  });

  test('Long string with many palindromes', () => {
    expect(countSubstrings("aaaa")).toBe(10);
  });
});
```


