```ts index.ts 
export function once<T extends (...args: any[]) => any>(
  fn: T
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T> {}
```

```ts index.test.ts 
import { once } from "./index";

describe("once", () => {
  test("calls the wrapped function only on the first call", () => {
    const init = jest.fn(() => "ready");
    const setup = once(init);

    setup();
    setup();
    setup();

    expect(init).toHaveBeenCalledTimes(1);
  });

  test("returns the first result on every later call", () => {
    let count = 0;
    const next = once(() => ++count);

    expect(next()).toBe(1);
    expect(next()).toBe(1);
    expect(next()).toBe(1);
    expect(count).toBe(1);
  });

  test("passes the arguments of the first call through", () => {
    const add = jest.fn((a: number, b: number) => a + b);
    const addOnce = once(add);

    expect(addOnce(2, 3)).toBe(5);
    expect(addOnce(10, 20)).toBe(5);
    expect(add).toHaveBeenCalledWith(2, 3);
    expect(add).toHaveBeenCalledTimes(1);
  });

  test("keeps `this` of the first call", () => {
    const counter = {
      label: "clicks",
      describe: once(function (this: { label: string }, n: number) {
        return `${this.label}: ${n}`;
      }),
    };

    expect(counter.describe(1)).toBe("clicks: 1");
    expect(counter.describe(2)).toBe("clicks: 1");
  });

  test("caches undefined, null and falsy results too", () => {
    const a = jest.fn(() => undefined);
    const b = jest.fn(() => 0);
    const c = jest.fn(() => null);
    const onceA = once(a);
    const onceB = once(b);
    const onceC = once(c);

    onceA();
    onceA();
    onceB();
    onceB();
    onceC();
    onceC();

    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    expect(c).toHaveBeenCalledTimes(1);
    expect(onceB()).toBe(0);
    expect(onceC()).toBeNull();
  });

  test("returns the same object every time", () => {
    const createStore = once(() => ({ items: [] as string[] }));

    const first = createStore();
    first.items.push("apple");

    expect(createStore()).toBe(first);
    expect(createStore().items).toEqual(["apple"]);
  });

  test("each wrapper has its own state", () => {
    const fn = jest.fn((x: number) => x * 2);
    const first = once(fn);
    const second = once(fn);

    expect(first(1)).toBe(2);
    expect(second(5)).toBe(10);
    expect(first(100)).toBe(2);
    expect(second(100)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("a call that throws does not count, so the next call tries again", () => {
    let attempts = 0;
    const connect = once(() => {
      attempts++;
      if (attempts < 3) throw new Error(`attempt ${attempts} failed`);
      return "connected";
    });

    expect(() => connect()).toThrow("attempt 1 failed");
    expect(() => connect()).toThrow("attempt 2 failed");
    expect(connect()).toBe("connected");
    expect(connect()).toBe("connected");
    expect(attempts).toBe(3);
  });

  test("a call made from inside the wrapped function does not run it again", () => {
    let runs = 0;
    const boot: () => number = once(() => {
      runs++;
      boot();
      return runs;
    });

    expect(boot()).toBe(1);
    expect(runs).toBe(1);
  });
});
```


