```ts index.ts 
export class TimeoutError extends Error {}

type Task<T> = Promise<T> | ((signal: AbortSignal) => Promise<T>);

export function withTimeout<T>(task: Task<T>, ms: number): Promise<T> {}
```

```ts index.test.ts 
import { withTimeout, TimeoutError } from "./index";

describe("withTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Marks the rejection as handled so an unfinished solution can't crash the test run.
  const rejected = (error: Error) => {
    const promise = Promise.reject(error);
    promise.catch(() => {});
    return promise;
  };

  const delay = <T,>(ms: number, value: T) =>
    new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

  test("resolves with the value when the promise wins", async () => {
    const result = withTimeout(delay(100, "data"), 500);

    jest.advanceTimersByTime(100);

    await expect(result).resolves.toBe("data");
  });

  test("rejects with a TimeoutError when time runs out first", async () => {
    const result = withTimeout(delay(1000, "late"), 300);

    jest.advanceTimersByTime(300);

    await expect(result).rejects.toBeInstanceOf(TimeoutError);
  });

  test("TimeoutError is a real Error with a helpful name and message", async () => {
    const result = withTimeout(new Promise(() => {}), 250);

    jest.advanceTimersByTime(250);

    const error = await result.catch((e) => e);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("TimeoutError");
    expect(error.message).toBe("Timed out after 250ms");
  });

  test("does not time out one millisecond early", async () => {
    const onSettle = jest.fn();
    withTimeout(new Promise(() => {}), 200).catch(onSettle);

    jest.advanceTimersByTime(199);
    await Promise.resolve();
    expect(onSettle).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    await Promise.resolve();
    expect(onSettle).toHaveBeenCalledTimes(1);
  });

  test("passes the original rejection through untouched", async () => {
    const original = new Error("network down");
    const result = withTimeout(rejected(original), 500);

    await expect(result).rejects.toBe(original);
  });

  test("clears its timer once the promise settles", async () => {
    await withTimeout(Promise.resolve(1), 10_000);
    await withTimeout(rejected(new Error("x")), 10_000).catch(() => {});

    expect(jest.getTimerCount()).toBe(0);
  });

  test("ignores the promise if it settles after the timeout", async () => {
    let resolveLate!: (v: string) => void;
    const late = new Promise<string>((r) => (resolveLate = r));
    const result = withTimeout(late, 100);

    jest.advanceTimersByTime(100);
    resolveLate("too late");

    await expect(result).rejects.toBeInstanceOf(TimeoutError);
  });

  test("accepts a function and passes it an AbortSignal", async () => {
    const task = jest.fn((signal: AbortSignal) => {
      expect(signal).toBeInstanceOf(AbortSignal);
      return delay(50, 42);
    });

    const result = withTimeout(task, 100);
    jest.advanceTimersByTime(50);

    await expect(result).resolves.toBe(42);
    expect(task).toHaveBeenCalledTimes(1);
  });

  test("aborts the signal when the task times out", async () => {
    let received!: AbortSignal;
    const onAbort = jest.fn();

    const result = withTimeout((signal) => {
      received = signal;
      signal.addEventListener("abort", onAbort);
      return new Promise(() => {});
    }, 100);

    expect(received.aborted).toBe(false);
    jest.advanceTimersByTime(100);

    await expect(result).rejects.toBeInstanceOf(TimeoutError);
    expect(received.aborted).toBe(true);
    expect(onAbort).toHaveBeenCalledTimes(1);
    expect(received.reason).toBeInstanceOf(TimeoutError);
  });

  test("does not abort the signal when the task finishes in time", async () => {
    let received!: AbortSignal;

    await withTimeout((signal) => {
      received = signal;
      return Promise.resolve("ok");
    }, 100);

    jest.advanceTimersByTime(1000);
    expect(received.aborted).toBe(false);
  });

  test("rejects instead of throwing when the function throws synchronously", async () => {
    const result = withTimeout(() => {
      throw new Error("bad input");
    }, 100);

    await expect(result).rejects.toThrow("bad input");
    expect(jest.getTimerCount()).toBe(0);
  });
});
```


