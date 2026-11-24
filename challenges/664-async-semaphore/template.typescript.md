```ts index.ts 
export type Release = () => void;

export type Semaphore = {
  acquire(): Promise<Release>;
  run<T>(task: () => T | Promise<T>): Promise<T>;
  readonly available: number;
  readonly waiting: number;
};

export function createSemaphore(limit: number): Semaphore {}
```

```ts index.test.ts 
import { createSemaphore } from "./index";

// A promise you can settle from the outside, so each test controls when a task finishes.
function deferred<T = void>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// Lets every queued microtask and promise callback run.
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("createSemaphore", () => {
  test("throws a RangeError for a limit that is not a positive integer", () => {
    expect(() => createSemaphore(0)).toThrow(RangeError);
    expect(() => createSemaphore(-2)).toThrow(RangeError);
    expect(() => createSemaphore(1.5)).toThrow(RangeError);
    expect(() => createSemaphore(NaN)).toThrow(RangeError);
  });

  test("starts with every slot free and nobody waiting", () => {
    const sem = createSemaphore(3);

    expect(sem.available).toBe(3);
    expect(sem.waiting).toBe(0);
  });

  test("acquire returns a promise that resolves with a release function", async () => {
    const sem = createSemaphore(1);

    const pending = sem.acquire();

    expect(pending).toBeInstanceOf(Promise);
    const release = await pending;
    expect(typeof release).toBe("function");
  });

  test("a free slot is taken as soon as acquire is called", () => {
    const sem = createSemaphore(2);

    sem.acquire();
    expect(sem.available).toBe(1);
    sem.acquire();
    expect(sem.available).toBe(0);
    expect(sem.waiting).toBe(0);
  });

  test("callers past the limit wait until a slot is released", async () => {
    const sem = createSemaphore(1);
    const release = await sem.acquire();

    let gotSlot = false;
    sem.acquire().then(() => {
      gotSlot = true;
    });

    await flush();
    expect(gotSlot).toBe(false);
    expect(sem.waiting).toBe(1);

    release();
    await flush();
    expect(gotSlot).toBe(true);
    expect(sem.waiting).toBe(0);
  });

  test("releasing gives the slot back when nobody is waiting", async () => {
    const sem = createSemaphore(2);
    const first = await sem.acquire();
    const second = await sem.acquire();

    first();
    expect(sem.available).toBe(1);
    second();
    expect(sem.available).toBe(2);
  });

  test("waiters get a slot in the order they asked", async () => {
    const sem = createSemaphore(1);
    const order: string[] = [];
    const release = await sem.acquire();

    const waiters = ["a", "b", "c"].map((name) =>
      sem.acquire().then((done) => {
        order.push(name);
        done();
      }),
    );

    release();
    await Promise.all(waiters);
    expect(order).toEqual(["a", "b", "c"]);
  });

  test("a released slot goes straight to the next waiter", async () => {
    const sem = createSemaphore(1);
    const release = await sem.acquire();

    let waiterGotSlot = false;
    sem.acquire().then(() => {
      waiterGotSlot = true;
    });

    release();
    // The slot was handed over, so it never shows up as free.
    expect(sem.available).toBe(0);
    expect(sem.waiting).toBe(0);

    // A caller arriving right after the release must queue behind the waiter.
    let latecomerGotSlot = false;
    sem.acquire().then(() => {
      latecomerGotSlot = true;
    });

    await flush();
    expect(waiterGotSlot).toBe(true);
    expect(latecomerGotSlot).toBe(false);
    expect(sem.waiting).toBe(1);
  });

  test("calling the same release twice frees only one slot", async () => {
    const sem = createSemaphore(2);
    const release = await sem.acquire();
    await sem.acquire();

    release();
    release();

    expect(sem.available).toBe(1);
  });

  test("a second call to a stale release does not wake another waiter", async () => {
    const sem = createSemaphore(1);
    const release = await sem.acquire();

    let granted = 0;
    sem.acquire().then(() => granted++);
    sem.acquire().then(() => granted++);

    release();
    release();
    await flush();

    expect(granted).toBe(1);
    expect(sem.waiting).toBe(1);
  });

  test("run never lets more than limit tasks run at once", async () => {
    const sem = createSemaphore(2);
    let running = 0;
    let maxRunning = 0;
    const gates = Array.from({ length: 5 }, () => deferred());

    const results = gates.map((gate, i) =>
      sem.run(async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await gate.promise;
        running--;
        return i;
      }),
    );

    await flush();
    expect(running).toBe(2);
    expect(sem.waiting).toBe(3);

    gates.forEach((gate) => gate.resolve());
    await expect(Promise.all(results)).resolves.toEqual([0, 1, 2, 3, 4]);
    expect(maxRunning).toBe(2);
    expect(sem.available).toBe(2);
  });

  test("run does not call the task until a slot is free", async () => {
    const sem = createSemaphore(1);
    const release = await sem.acquire();
    const task = jest.fn(() => "done");

    const result = sem.run(task);
    await flush();
    expect(task).not.toHaveBeenCalled();

    release();
    await expect(result).resolves.toBe("done");
    expect(task).toHaveBeenCalledTimes(1);
  });

  test("run works with a task that returns a plain value", async () => {
    const sem = createSemaphore(1);

    await expect(sem.run(() => 42)).resolves.toBe(42);
    expect(sem.available).toBe(1);
  });

  test("run releases the slot when the task rejects", async () => {
    const sem = createSemaphore(1);
    const error = new Error("upload failed");

    await expect(
      sem.run(async () => {
        throw error;
      }),
    ).rejects.toBe(error);
    expect(sem.available).toBe(1);
    await expect(sem.run(() => "next")).resolves.toBe("next");
  });

  test("run releases the slot when the task throws synchronously", async () => {
    const sem = createSemaphore(1);
    const error = new Error("bad input");

    const result = sem.run(() => {
      throw error;
    });

    expect(result).toBeInstanceOf(Promise);
    await expect(result).rejects.toBe(error);
    expect(sem.available).toBe(1);
  });

  test("a failed task lets the next waiter start", async () => {
    const sem = createSemaphore(1);
    const gate = deferred();

    const failing = sem.run(async () => {
      await gate.promise;
      throw new Error("boom");
    });
    const next = sem.run(() => "ran after the failure");

    gate.resolve();
    await expect(failing).rejects.toThrow("boom");
    await expect(next).resolves.toBe("ran after the failure");
  });

  test("acquire and run share the same slots", async () => {
    const sem = createSemaphore(1);
    const release = await sem.acquire();
    const task = jest.fn(() => "ok");

    const result = sem.run(task);
    await flush();
    expect(task).not.toHaveBeenCalled();

    release();
    await expect(result).resolves.toBe("ok");
  });

  test("each semaphore keeps its own slots and queue", async () => {
    const a = createSemaphore(1);
    const b = createSemaphore(1);

    await a.acquire();

    expect(a.available).toBe(0);
    expect(b.available).toBe(1);
    await expect(b.run(() => "free")).resolves.toBe("free");
  });
});
```


