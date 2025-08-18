```js index.js
export function isEmpty(value) {
  // your answer here
}
```

```js index.test.js
import { isEmpty } from "./index";

describe("isEmpty function", () => {
  it("should return true for empty objects, arrays, maps, and sets", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it("should return false for non-empty objects, arrays, maps, and sets", () => {
    expect(isEmpty({ name: "John" })).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(
      isEmpty(
        new Map([
          ["a", 1],
          ["b", 2],
        ]),
      ),
    ).toBe(false);
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
  });

  it("should return true for null and undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("should return true for other non-object values", () => {
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(false)).toBe(true);
  });
});
```
