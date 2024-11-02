```ts index.ts 
export function minWindow(s: string, t: string): string {
  
}
```

```ts index.test.ts 
import { minWindow } from './index';

describe('minWindow', () => {
  test('Example 1: Regular case', () => {
    expect(minWindow("OUZODYXAZV", "XYZ")).toBe("YXAZ");
  });

  test('Example 2: Exact match', () => {
    expect(minWindow("xyz", "xyz")).toBe("xyz");
  });

  test('Example 3: Impossible case', () => {
    expect(minWindow("x", "xy")).toBe("");
  });

  test('Case sensitive strings', () => {
    expect(minWindow("aaAAbB", "AaB")).toBe("AabB");
  });

  test('Duplicate characters in t', () => {
    expect(minWindow("ADOBECODEBANC", "AAB")).toBe("BANC");
  });

  test('Single character match', () => {
    expect(minWindow("a", "a")).toBe("a");
  });

  test('Non-overlapping characters', () => {
    expect(minWindow("abc", "ac")).toBe("abc");
  });
});
```


