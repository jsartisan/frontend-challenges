```ts index.ts 
export function promisify<T = any>(
  fn: (...args: any[]) => void,
): (...args: any[]) => Promise<T> {}
```

```ts index.test.ts 
import { promisify } from "./index";

describe("promisify", () => {
  test("resolves with the callback result", async () => {
    const add = (a: number, b: number, cb: (err: unknown, sum?: number) => void) => {
      setTimeout(() => cb(null, a + b), 0);
    };

    await expect(promisify<number>(add)(2, 3)).resolves.toBe(5);
  });

  test("rejects when the callback receives an error", async () => {
    const fail = (cb: (err: unknown) => void) => cb(new Error("boom"));

    await expect(promisify(fail)()).rejects.toThrow("boom");
  });

  test("returns a promise", () => {
    const noop = (cb: (err: unknown) => void) => cb(null);

    expect(promisify(noop)()).toBeInstanceOf(Promise);
  });

  test("passes all arguments through to the original function", async () => {
    const spy = jest.fn((...args: any[]) => args[args.length - 1](null, args.length - 1));

    await expect(promisify(spy)("a", "b", "c")).resolves.toBe(3);
    expect(spy.mock.calls[0].slice(0, 3)).toEqual(["a", "b", "c"]);
  });

  test("keeps the this value", async () => {
    const counter = {
      count: 41,
      next(cb: (err: unknown, value?: number) => void) {
        cb(null, this.count + 1);
      },
    };

    const next = promisify<number>(counter.next);

    await expect(next.call(counter)).resolves.toBe(42);
  });

  test("rejects when the original function throws synchronously", async () => {
    const broken = () => {
      throw new Error("sync failure");
    };

    await expect(promisify(broken)()).rejects.toThrow("sync failure");
  });

  test("resolves with falsy results like 0 and empty string", async () => {
    const zero = (cb: (err: unknown, v?: number) => void) => cb(null, 0);
    const empty = (cb: (err: unknown, v?: string) => void) => cb(undefined, "");

    await expect(promisify(zero)()).resolves.toBe(0);
    await expect(promisify(empty)()).resolves.toBe("");
  });
});
```


