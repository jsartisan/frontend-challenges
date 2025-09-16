```ts index.ts 
/**
 * Retrieves a value from an object via a path.
 */
export function get<T, R = unknown>(
  object: T,
  path: string | Array<string | number>,
  defaultValue?: R
): R | unknown {
  // TODO: Implement me
  return undefined;
}
```

```ts index.test.ts 
import { get } from "./index";

const obj = {
  a: { b: [{ c: 3 }] },
  x: 0,
};

describe("get", () => {
  it("retrieves value using dot/bracket string path", () => {
    expect(get(obj, "a.b[0].c")).toBe(3);
  });

  it("retrieves value using array path", () => {
    expect(get(obj, ["a", "b", 0, "c"])).toBe(3);
  });

  it("returns default when path missing", () => {
    expect(get(obj, "a.b[1].c", "missing")).toBe("missing");
  });

  it("returns default when encountering non-object mid-path", () => {
    expect(get(obj, "x.y.z", null)).toBeNull();
  });

  it("handles keys containing dots when array syntax used", () => {
    const complex = { "a.b": 5 };
    expect(get(complex, ["a.b"])).toBe(5);
  });
});
```


