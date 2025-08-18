```ts index.ts
export function wait(milliseconds: number): Promise<void> {}
```

```ts index.test.ts
import { wait } from "./index";

describe("wait function", () => {
  test("should pause execution for the specified duration", async () => {
    const start = Date.now();
    await wait(1000); // Wait for 1 second
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeGreaterThanOrEqual(1000);
  });

  test("should resolve immediately if 0 milliseconds is passed", async () => {
    const start = Date.now();
    await wait(0);
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeLessThan(10); // Expecting near-instant resolution
  });

  test("should handle negative durations by resolving immediately", async () => {
    const start = Date.now();
    await wait(-1000); // Negative duration
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeLessThan(10); // Expecting near-instant resolution
  });
});
```
