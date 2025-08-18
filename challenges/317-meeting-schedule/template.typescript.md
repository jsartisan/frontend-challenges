```ts index.ts
export function canAttendMeetings(intervals: number[][]): boolean {}
```

```ts index.test.ts
import { canAttendMeetings } from "./index";

describe("canAttendMeetings", () => {
  test("Example 1: Overlapping meetings", () => {
    expect(
      canAttendMeetings([
        [0, 30],
        [5, 10],
        [15, 20],
      ]),
    ).toBe(false);
  });

  test("Example 2: Non-overlapping meetings", () => {
    expect(
      canAttendMeetings([
        [5, 8],
        [9, 15],
      ]),
    ).toBe(true);
  });

  test("Empty schedule", () => {
    expect(canAttendMeetings([])).toBe(true);
  });

  test("Single meeting", () => {
    expect(canAttendMeetings([[1, 5]])).toBe(true);
  });

  test("Back-to-back meetings", () => {
    expect(
      canAttendMeetings([
        [1, 5],
        [5, 10],
      ]),
    ).toBe(true);
  });

  test("Multiple overlapping meetings", () => {
    expect(
      canAttendMeetings([
        [1, 5],
        [2, 3],
        [4, 6],
      ]),
    ).toBe(false);
  });

  test("All meetings at different times", () => {
    expect(
      canAttendMeetings([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toBe(true);
  });

  test("Meetings with small gap", () => {
    expect(
      canAttendMeetings([
        [1, 4],
        [5, 8],
        [9, 12],
      ]),
    ).toBe(true);
  });

  test("One long meeting overlapping others", () => {
    expect(
      canAttendMeetings([
        [1, 10],
        [2, 5],
        [6, 8],
      ]),
    ).toBe(false);
  });

  test("Complex overlapping", () => {
    expect(
      canAttendMeetings([
        [1, 3],
        [2, 4],
        [3, 5],
        [4, 6],
      ]),
    ).toBe(false);
  });
});
```
