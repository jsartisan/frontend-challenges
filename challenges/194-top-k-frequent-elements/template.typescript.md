```ts index.ts 
export function topKFrequent(nums: number[], k: number): number[] {}

```

```ts index.test.ts 
import { topKFrequent } from "./index";

describe("topKFrequent", () => {
  test("should return top k frequent elements", () => {
    expect(topKFrequent([1, 2, 2, 3, 3, 3], 2)).toEqual(
      expect.arrayContaining([2, 3]),
    );
    expect(topKFrequent([7, 7], 1)).toEqual([7]);
  });

  test("should handle elements with same frequency", () => {
    expect(topKFrequent([1, 1, 2, 2, 3], 2)).toEqual(
      expect.arrayContaining([1, 2]),
    );
  });

  test("should handle single element", () => {
    expect(topKFrequent([1], 1)).toEqual([1]);
  });

  test("should handle all unique elements", () => {
    expect(topKFrequent([1, 2, 3, 4], 2)).toEqual(
      expect.arrayContaining([1, 2]),
    );
  });
});

```


