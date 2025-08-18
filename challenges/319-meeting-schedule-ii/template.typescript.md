```ts index.ts
export function minMeetingDays(intervals: number[][]): number {}
```

```ts index.test.ts
import { minMeetingDays } from "./index";

describe("minMeetingDays", () => {
  test("Example 1: Multiple days needed", () => {
    expect(
      minMeetingDays([
        [0, 40],
        [5, 10],
        [15, 20],
      ]),
    ).toBe(2);
  });

  test("Example 2: Single meeting", () => {
    expect(minMeetingDays([[4, 9]])).toBe(1);
  });

  test("Empty schedule", () => {
    expect(minMeetingDays([])).toBe(0);
  });

  test("All meetings overlap", () => {
    expect(
      minMeetingDays([
        [1, 5],
        [2, 3],
        [3, 4],
      ]),
    ).toBe(3);
  });

  test("No overlapping meetings", () => {
    expect(
      minMeetingDays([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toBe(1);
  });

  test("Some overlapping meetings", () => {
    expect(
      minMeetingDays([
        [1, 4],
        [4, 5],
        [2, 3],
        [3, 6],
      ]),
    ).toBe(2);
  });

  test("Back-to-back meetings", () => {
    expect(
      minMeetingDays([
        [1, 2],
        [2, 3],
        [3, 4],
      ]),
    ).toBe(1);
  });

  test("Complex overlapping", () => {
    expect(
      minMeetingDays([
        [1, 10],
        [2, 7],
        [3, 19],
        [8, 12],
        [10, 20],
        [11, 30],
      ]),
    ).toBe(4);
  });

  test("Multiple meetings same time", () => {
    expect(
      minMeetingDays([
        [2, 4],
        [2, 4],
        [2, 4],
      ]),
    ).toBe(3);
  });

  test("Mixture of overlapping and non-overlapping", () => {
    expect(
      minMeetingDays([
        [1, 3],
        [2, 4],
        [5, 7],
        [6, 8],
      ]),
    ).toBe(2);
  });
});
```
