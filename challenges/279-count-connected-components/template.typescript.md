```ts index.ts
export function countComponents(n: number, edges: number[][]): number {}
```

```ts index.test.ts
import { countComponents } from "./index";

describe("countComponents", () => {
  test("Example 1: Single component", () => {
    expect(
      countComponents(3, [
        [0, 1],
        [0, 2],
      ]),
    ).toBe(1);
  });

  test("Example 2: Two components", () => {
    expect(
      countComponents(6, [
        [0, 1],
        [1, 2],
        [2, 3],
        [4, 5],
      ]),
    ).toBe(2);
  });

  test("No edges", () => {
    expect(countComponents(5, [])).toBe(5);
  });

  test("Single node", () => {
    expect(countComponents(1, [])).toBe(1);
  });

  test("All nodes connected in line", () => {
    expect(
      countComponents(4, [
        [0, 1],
        [1, 2],
        [2, 3],
      ]),
    ).toBe(1);
  });

  test("Multiple small components", () => {
    expect(
      countComponents(6, [
        [0, 1],
        [2, 3],
        [4, 5],
      ]),
    ).toBe(3);
  });

  test("Star shape component", () => {
    expect(
      countComponents(4, [
        [0, 1],
        [0, 2],
        [0, 3],
      ]),
    ).toBe(1);
  });

  test("Mixed size components", () => {
    expect(
      countComponents(7, [
        [0, 1],
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toBe(3);
  });

  test("Isolated nodes with some components", () => {
    expect(
      countComponents(5, [
        [0, 1],
        [2, 3],
      ]),
    ).toBe(2);
  });

  test("Complex connections", () => {
    expect(
      countComponents(6, [
        [0, 1],
        [1, 2],
        [2, 0],
        [3, 4],
        [4, 5],
        [5, 3],
      ]),
    ).toBe(2);
  });
});
```
