```js index.js
export function promiseAny(promises) {}
```

```js index.test.js
import { promiseAny } from "./";

describe("promiseAny", () => {
  test("Resolves with the first resolved promise", async () => {
    const promise1 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("First failed")), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second success"), 500));
    const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Third failed")), 1500));

    const result = await promiseAny([promise1, promise2, promise3]);
    expect(result).toBe("Second success");
  });

  test("Rejects with AggregateError if all promises are rejected", async () => {
    const promise1 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("First failed")), 1000));
    const promise2 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Second failed")), 1500));
    const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Third failed")), 2000));

    await expect(promiseAny([promise1, promise2, promise3])).rejects.toThrow(AggregateError);
  });

  test("Rejects with AggregateError containing all rejection reasons", async () => {
    const promise1 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("First failed")), 1000));
    const promise2 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Second failed")), 1500));
    const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Third failed")), 2000));

    try {
      await promiseAny([promise1, promise2, promise3]);
    } catch (error) {
      expect(error).toBeInstanceOf(AggregateError);
      expect(error.errors).toHaveLength(3);
      expect(error.errors[0].message).toBe("First failed");
      expect(error.errors[1].message).toBe("Second failed");
      expect(error.errors[2].message).toBe("Third failed");
    }
  });
});
```
