```ts index.ts 
export function areAnagrams(s: string, t: string): boolean {
  // your implementation here
}

```

```ts index.test.ts 
import { areAnagrams } from './index';

describe('areAnagrams function', () => {
  test('should return true for anagrams', () => {
    const s = "racecar";
    const t = "carrace";
    expect(areAnagrams(s, t)).toBe(true);
  });

  test('should return false for non-anagrams', () => {
    const s = "jar";
    const t = "jam";
    expect(areAnagrams(s, t)).toBe(false);
  });

  test('should return false for strings of different lengths', () => {
    const s = "hello";
    const t = "helloo";
    expect(areAnagrams(s, t)).toBe(false);
  });

  test('should return true for empty strings', () => {
    const s = "";
    const t = "";
    expect(areAnagrams(s, t)).toBe(true);
  });

  test('should return false when one string is empty and the other is not', () => {
    const s = "";
    const t = "nonempty";
    expect(areAnagrams(s, t)).toBe(false);
  });
});
```


