```ts index.ts 
export type BatchOptions = {
  maxBatchSize?: number;
};

export function createBatcher<K, V>(
  batchFn: (keys: K[]) => Promise<Array<V | Error>>,
  options: BatchOptions = {},
): (key: K) => Promise<V> {}
```

```ts index.test.ts 
import { createBatcher } from "./index";

describe("createBatcher", () => {
  // A fake "users by id" endpoint that records every batch it receives.
  function createUsersApi() {
    return jest.fn(async (ids: number[]) => ids.map((id) => ({ id, name: `user-${id}` })));
  }

  test("calls made in the same tick share one batch", async () => {
    const getUsers = createUsersApi();
    const loadUser = createBatcher(getUsers);

    const users = await Promise.all([loadUser(1), loadUser(2), loadUser(3)]);

    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(getUsers).toHaveBeenCalledWith([1, 2, 3]);
    expect(users).toEqual([
      { id: 1, name: "user-1" },
      { id: 2, name: "user-2" },
      { id: 3, name: "user-3" },
    ]);
  });

  test("returns a promise right away and waits before calling batchFn", async () => {
    const getUsers = createUsersApi();
    const loadUser = createBatcher(getUsers);

    const pending = loadUser(5);

    expect(pending).toBeInstanceOf(Promise);
    expect(getUsers).not.toHaveBeenCalled();
    await expect(pending).resolves.toEqual({ id: 5, name: "user-5" });
  });

  test("each caller gets the result at its own key's position", async () => {
    const square = jest.fn(async (nums: number[]) => nums.map((n) => n * n));
    const loadSquare = createBatcher(square);

    const nine = loadSquare(3);
    const four = loadSquare(2);
    const hundred = loadSquare(10);

    expect(await hundred).toBe(100);
    expect(await nine).toBe(9);
    expect(await four).toBe(4);
    expect(square).toHaveBeenCalledWith([3, 2, 10]);
  });

  test("calls after an await start a new batch", async () => {
    const getUsers = createUsersApi();
    const loadUser = createBatcher(getUsers);

    await Promise.all([loadUser(1), loadUser(2)]);
    await loadUser(3);

    expect(getUsers.mock.calls).toEqual([[[1, 2]], [[3]]]);
  });

  test("a key asked for twice in one batch is sent once", async () => {
    const getUsers = createUsersApi();
    const loadUser = createBatcher(getUsers);

    const [a, b, c] = await Promise.all([loadUser(7), loadUser(8), loadUser(7)]);

    expect(getUsers).toHaveBeenCalledWith([7, 8]);
    expect(a).toEqual({ id: 7, name: "user-7" });
    expect(c).toBe(a);
    expect(b).toEqual({ id: 8, name: "user-8" });
  });

  test("does not cache results between batches", async () => {
    const getUsers = createUsersApi();
    const loadUser = createBatcher(getUsers);

    await loadUser(1);
    await loadUser(1);

    expect(getUsers).toHaveBeenCalledTimes(2);
  });

  test("splits a batch into chunks of maxBatchSize", async () => {
    const getUsers = createUsersApi();
    const loadUser = createBatcher(getUsers, { maxBatchSize: 2 });

    const users = await Promise.all([1, 2, 3, 4, 5].map((id) => loadUser(id)));

    expect(getUsers.mock.calls).toEqual([[[1, 2]], [[3, 4]], [[5]]]);
    expect(users.map((u) => u.id)).toEqual([1, 2, 3, 4, 5]);
  });

  test("sends all chunks without waiting for the previous one", async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    const slowDouble = jest.fn(async (nums: number[]) => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 10));
      inFlight--;
      return nums.map((n) => n * 2);
    });
    const loadDouble = createBatcher(slowDouble, { maxBatchSize: 1 });

    await expect(Promise.all([loadDouble(1), loadDouble(2), loadDouble(3)])).resolves.toEqual([
      2, 4, 6,
    ]);
    expect(maxInFlight).toBe(3);
  });

  test("an Error in the results rejects only that key", async () => {
    const notFound = new Error("user 2 not found");
    const getUsers = jest.fn(async (ids: number[]) =>
      ids.map((id) => (id === 2 ? notFound : `user-${id}`)),
    );
    const loadUser = createBatcher(getUsers);

    const one = loadUser(1);
    const two = loadUser(2);
    const three = loadUser(3);

    await expect(one).resolves.toBe("user-1");
    await expect(two).rejects.toBe(notFound);
    await expect(three).resolves.toBe("user-3");
  });

  test("a rejected batch rejects every caller in it", async () => {
    const error = new Error("service unavailable");
    const getUsers = jest.fn(async (ids: number[]): Promise<string[]> => {
      throw error;
    });
    const loadUser = createBatcher(getUsers);

    const a = loadUser(1);
    const b = loadUser(2);
    const c = loadUser(1);

    await expect(a).rejects.toBe(error);
    await expect(b).rejects.toBe(error);
    await expect(c).rejects.toBe(error);
  });

  test("a batchFn that throws synchronously rejects instead of crashing", async () => {
    const error = new Error("bad request");
    const getUsers = jest.fn((ids: number[]): Promise<string[]> => {
      throw error;
    });
    const loadUser = createBatcher(getUsers);

    await expect(loadUser(1)).rejects.toBe(error);
  });

  test("a failed chunk does not affect the other chunks", async () => {
    const error = new Error("chunk failed");
    const getUsers = jest.fn(async (ids: number[]) => {
      if (ids.includes(3)) throw error;
      return ids.map((id) => `user-${id}`);
    });
    const loadUser = createBatcher(getUsers, { maxBatchSize: 2 });

    const results = await Promise.allSettled([1, 2, 3, 4].map((id) => loadUser(id)));

    expect(results).toEqual([
      { status: "fulfilled", value: "user-1" },
      { status: "fulfilled", value: "user-2" },
      { status: "rejected", reason: error },
      { status: "rejected", reason: error },
    ]);
  });

  test("rejects every caller when the result count does not match", async () => {
    const getUsers = jest.fn(async (ids: number[]) => ["only-one"]);
    const loadUser = createBatcher(getUsers);

    const a = loadUser(1);
    const b = loadUser(2);

    await expect(a).rejects.toBeInstanceOf(Error);
    await expect(b).rejects.toBeInstanceOf(Error);
  });

  test("works with string keys and keeps batchers separate", async () => {
    const upper = jest.fn(async (words: string[]) => words.map((w) => w.toUpperCase()));
    const reverse = jest.fn(async (words: string[]) => words.map((w) => [...w].reverse().join("")));
    const loadUpper = createBatcher(upper);
    const loadReverse = createBatcher(reverse);

    const results = await Promise.all([loadUpper("hi"), loadReverse("abc"), loadUpper("yo")]);

    expect(results).toEqual(["HI", "cba", "YO"]);
    expect(upper).toHaveBeenCalledWith(["hi", "yo"]);
    expect(reverse).toHaveBeenCalledWith(["abc"]);
  });
});
```


