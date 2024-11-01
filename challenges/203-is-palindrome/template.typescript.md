```ts index.ts 
export function isPalindrome(s: string): boolean {
  
}
```

```ts index.test.ts 
import { isPalindrome } from './index';

describe('isPalindrome', () => {
  test('Example 1: Sentence palindrome', () => {
    expect(isPalindrome("Was it a car or a cat I saw?")).toBe(true);
  });

  test('Example 2: Non-palindrome', () => {
    expect(isPalindrome("tab a cat")).toBe(false);
  });

  test('Empty string', () => {
    expect(isPalindrome("")).toBe(true);
  });

  test('Single character', () => {
    expect(isPalindrome("a")).toBe(true);
  });

  test('Special characters and numbers', () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  test('Mixed case with numbers', () => {
    expect(isPalindrome("Race a car")).toBe(false);
  });

  test('Only special characters', () => {
    expect(isPalindrome(".,")).toBe(true);
  });
});
```


