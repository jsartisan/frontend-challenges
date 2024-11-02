```ts index.ts 
export function combinationSum(nums: number[], target: number): number[][] {
    
}
```

```ts index.test.ts 
import { combinationSum } from "./index";

describe("combinationSum", () => {
  // Helper function to check if two arrays have same elements regardless of order
  function arraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort((a, b) => a - b);
    const sorted2 = [...arr2].sort((a, b) => a - b);
    return sorted1.every((val, idx) => val === sorted2[idx]);
  }

  // Helper function to check if two arrays of arrays have same combinations
  function combinationsEqual(combs1: number[][], combs2: number[][]): boolean {
    if (combs1.length !== combs2.length) return false;
    const sorted1 = combs1
      .map((arr) => [...arr].sort((a, b) => a - b))
      .sort((a, b) => a.length - b.length);
    const sorted2 = combs2
      .map((arr) => [...arr].sort((a, b) => a - b))
      .sort((a, b) => a.length - b.length);
    return sorted1.every((arr, idx) => arraysEqual(arr, sorted2[idx]));
  }

  test("Example 1: Basic case", () => {
    const result = combinationSum([2, 5, 6, 9], 9);
    const expected = [[2, 2, 5], [9]];
    expect(combinationsEqual(result, expected)).toBe(true);
  });

  test("Example 2: Multiple combinations", () => {
    const result = combinationSum([3, 4, 5], 16);
    const expected = [
      [3, 3, 3, 3, 4],
      [3, 3, 5, 5],
      [4, 4, 4, 4],
      [3, 4, 4, 5],
    ];
    expect(combinationsEqual(result, expected)).toBe(true);
  });

  test("Example 3: No combinations", () => {
    const result = combinationSum([3], 5);
    expect(result).toEqual([]);
  });

  test("Single number that can sum to target", () => {
    const result = combinationSum([3], 6);
    expect(combinationsEqual(result, [[3, 3]])).toBe(true);
  });

  test("Multiple numbers with single solution", () => {
    const result = combinationSum([2, 3, 5], 7);
    expect(
      combinationsEqual(result, [
        [2, 2, 3],
        [2, 5],
      ]),
    ).toBe(true);
  });

  test("Target smaller than all numbers", () => {
    const result = combinationSum([5, 6, 7], 4);
    expect(result).toEqual([]);
  });

  test("Larger numbers set", () => {
    const result = combinationSum([2, 3, 4, 5, 6, 7], 7);
    const expected = [[2, 2, 3], [2, 5], [3, 4], [7]];
    expect(combinationsEqual(result, expected)).toBe(true);
  });
});
```


