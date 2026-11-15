```ts index.ts 
export function groupBy<T>(
  items: T[],
  iteratee: ((item: T, index: number) => unknown) | keyof T
): Record<string, T[]> {}
```

```ts index.test.ts 
import { groupBy } from "./index";

describe("groupBy", () => {
  test("groups items by the key a callback returns", () => {
    const words = ["apple", "avocado", "banana", "blueberry", "cherry"];

    expect(groupBy(words, (word) => word[0])).toEqual({
      a: ["apple", "avocado"],
      b: ["banana", "blueberry"],
      c: ["cherry"],
    });
  });

  test("keeps the original order inside each group", () => {
    const nums = [5, 2, 8, 1, 6, 3];

    expect(groupBy(nums, (n) => (n % 2 === 0 ? "even" : "odd"))).toEqual({
      odd: [5, 1, 3],
      even: [2, 8, 6],
    });
  });

  test("accepts a property name instead of a callback", () => {
    const tickets = [
      { id: 1, status: "open" },
      { id: 2, status: "closed" },
      { id: 3, status: "open" },
    ];

    expect(groupBy(tickets, "status")).toEqual({
      open: [tickets[0], tickets[2]],
      closed: [tickets[1]],
    });
  });

  test("turns non-string keys into strings", () => {
    const scores = [1.2, 1.9, 2.4, 3.1];

    expect(groupBy(scores, Math.floor)).toEqual({
      "1": [1.2, 1.9],
      "2": [2.4],
      "3": [3.1],
    });
    expect(groupBy([1, 2, 3], (n) => n > 1)).toEqual({
      false: [1],
      true: [2, 3],
    });
    expect(groupBy([{ v: null }, { v: undefined }], "v")).toEqual({
      null: [{ v: null }],
      undefined: [{ v: undefined }],
    });
  });

  test("passes the item and its index to the callback", () => {
    const calls: Array<[string, number]> = [];
    const result = groupBy(["x", "y", "z", "w"], (item, index) => {
      calls.push([item, index]);
      return index < 2 ? "first" : "rest";
    });

    expect(calls).toEqual([
      ["x", 0],
      ["y", 1],
      ["z", 2],
      ["w", 3],
    ]);
    expect(result).toEqual({ first: ["x", "y"], rest: ["z", "w"] });
  });

  test("keeps the same item references, without copying them", () => {
    const user = { name: "Mo", team: "core" };
    const result = groupBy([user], "team");

    expect(result.core[0]).toBe(user);
  });

  test("returns an empty object for an empty array", () => {
    expect(groupBy([], (x) => String(x))).toEqual({});
  });

  test("handles keys that collide with Object.prototype names", () => {
    const items = [
      { id: 1, kind: "constructor" },
      { id: 2, kind: "toString" },
      { id: 3, kind: "__proto__" },
      { id: 4, kind: "hasOwnProperty" },
    ];
    const result = groupBy(items, "kind");

    expect(Object.keys(result).sort()).toEqual(
      ["__proto__", "constructor", "hasOwnProperty", "toString"].sort()
    );
    expect(result["constructor"]).toEqual([items[0]]);
    expect(result["toString"]).toEqual([items[1]]);
    expect(result["__proto__"]).toEqual([items[2]]);
    expect(result["hasOwnProperty"]).toEqual([items[3]]);
  });

  test("does not change the input array", () => {
    const input = [3, 1, 2];
    groupBy(input, (n) => (n > 1 ? "big" : "small"));

    expect(input).toEqual([3, 1, 2]);
  });
});
```


