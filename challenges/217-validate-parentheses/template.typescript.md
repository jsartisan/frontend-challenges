```ts index.ts
export function isValid(s: string): boolean {}
```

```ts index.test.ts
import { isValid } from "./index";

describe("isValid", () => {
  test("Example 1: Simple valid case", () => {
    expect(isValid("[]")).toBe(true);
  });

  test("Example 2: Nested valid case", () => {
    expect(isValid("([{}])")).toBe(true);
  });

  test("Example 3: Invalid order", () => {
    expect(isValid("[(])")).toBe(false);
  });

  test("Single character", () => {
    expect(isValid("[")).toBe(false);
  });

  test("Empty string", () => {
    expect(isValid("")).toBe(true);
  });

  test("Multiple pairs", () => {
    expect(isValid("()[]{}")).toBe(true);
  });

  test("Mismatched brackets", () => {
    expect(isValid("(]")).toBe(false);
  });

  test("Complex nested valid case", () => {
    expect(isValid("{[]}()")).toBe(true);
  });
});
```
