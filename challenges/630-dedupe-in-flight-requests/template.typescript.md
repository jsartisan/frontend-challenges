```ts index.ts 
export function dedupe<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  getKey: (...args: Args) => string = (...args) => JSON.stringify(args),
): (...args: Args) => Promise<R> {}
```

```ts index.test.ts 
import { dedupe } from "./index";

describe("dedupe", () => {
  // A promise we can settle by hand, so each test controls timing.
  function deferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  test("concurrent calls with the same arguments share one call", async () => {
    const pending = deferred<string>();
    const fetchUser = jest.fn((id: number) => pending.promise);
    const getUser = dedupe(fetchUser);

    const a = getUser(1);
    const b = getUser(1);
    const c = getUser(1);

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(a).toBe(b);
    expect(b).toBe(c);

    pending.resolve("Ada");
    await expect(Promise.all([a, b, c])).resolves.toEqual(["Ada", "Ada", "Ada"]);
  });

  test("different arguments get their own calls", async () => {
    const fetchUser = jest.fn(async (id: number) => `user-${id}`);
    const getUser = dedupe(fetchUser);

    const [one, two] = await Promise.all([getUser(1), getUser(2)]);

    expect(fetchUser).toHaveBeenCalledTimes(2);
    expect(one).toBe("user-1");
    expect(two).toBe("user-2");
  });

  test("forwards every argument to the wrapped function", async () => {
    const search = jest.fn(async (query: string, page: number) => `${query}:${page}`);
    const dedupedSearch = dedupe(search);

    await expect(dedupedSearch("shoes", 3)).resolves.toBe("shoes:3");
    expect(search).toHaveBeenCalledWith("shoes", 3);
  });

  test("does not cache results once the call has settled", async () => {
    let count = 0;
    const fetchCount = jest.fn(async () => ++count);
    const getCount = dedupe(fetchCount);

    await expect(getCount()).resolves.toBe(1);
    await expect(getCount()).resolves.toBe(2);
    expect(fetchCount).toHaveBeenCalledTimes(2);
  });

  test("every waiting caller sees the same rejection", async () => {
    const pending = deferred<string>();
    const load = jest.fn(() => pending.promise);
    const dedupedLoad = dedupe(load);

    const a = dedupedLoad();
    const b = dedupedLoad();
    const error = new Error("network down");
    pending.reject(error);

    await expect(a).rejects.toBe(error);
    await expect(b).rejects.toBe(error);
    expect(load).toHaveBeenCalledTimes(1);
  });

  test("a failed call is forgotten so the next call retries", async () => {
    const load = jest
      .fn<Promise<string>, []>()
      .mockRejectedValueOnce(new Error("flaky"))
      .mockResolvedValueOnce("ok");
    const dedupedLoad = dedupe(load);

    await expect(dedupedLoad()).rejects.toThrow("flaky");
    await expect(dedupedLoad()).resolves.toBe("ok");
    expect(load).toHaveBeenCalledTimes(2);
  });

  test("a synchronous throw becomes a rejection and is not remembered", async () => {
    let shouldThrow = true;
    const load = jest.fn(async () => "fine");
    const risky = jest.fn(() => {
      if (shouldThrow) throw new Error("bad input");
      return load();
    });
    const dedupedRisky = dedupe(risky);

    const first = dedupedRisky();
    expect(first).toBeInstanceOf(Promise);
    await expect(first).rejects.toThrow("bad input");

    shouldThrow = false;
    await expect(dedupedRisky()).resolves.toBe("fine");
  });

  test("objects with the same content share a call by default", async () => {
    const pending = deferred<number[]>();
    const query = jest.fn((filters: { tag: string; limit: number }) => pending.promise);
    const dedupedQuery = dedupe(query);

    const a = dedupedQuery({ tag: "css", limit: 10 });
    const b = dedupedQuery({ tag: "css", limit: 10 });
    const c = dedupedQuery({ tag: "css", limit: 20 });

    expect(a).toBe(b);
    expect(c).not.toBe(a);
    expect(query).toHaveBeenCalledTimes(2);

    pending.resolve([1, 2]);
    await Promise.all([a, b, c]);
  });

  test("uses a custom getKey when one is given", async () => {
    const pending = deferred<string>();
    const fetchPost = jest.fn((post: { id: number; title: string }) => pending.promise);
    const dedupedFetch = dedupe(fetchPost, (post) => String(post.id));

    const a = dedupedFetch({ id: 7, title: "Draft" });
    const b = dedupedFetch({ id: 7, title: "Final" });

    expect(a).toBe(b);
    expect(fetchPost).toHaveBeenCalledTimes(1);
    expect(fetchPost).toHaveBeenCalledWith({ id: 7, title: "Draft" });

    pending.resolve("post-7");
    await expect(b).resolves.toBe("post-7");
  });

  test("each deduped function keeps its own in-flight calls", async () => {
    const pending = deferred<string>();
    const load = jest.fn(() => pending.promise);
    const first = dedupe(load);
    const second = dedupe(load);

    first();
    second();

    expect(load).toHaveBeenCalledTimes(2);
    pending.resolve("done");
  });

  test("a call that starts while another key is pending is unaffected", async () => {
    const slow = deferred<string>();
    const load = jest.fn((key: string) =>
      key === "slow" ? slow.promise : Promise.resolve(key),
    );
    const dedupedLoad = dedupe(load);

    const slowCall = dedupedLoad("slow");
    await expect(dedupedLoad("fast")).resolves.toBe("fast");
    await expect(dedupedLoad("fast")).resolves.toBe("fast");
    expect(load).toHaveBeenCalledTimes(3);

    slow.resolve("slow");
    await expect(slowCall).resolves.toBe("slow");
  });
});
```


