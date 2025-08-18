```js index.js
export function promiseRace(promises) {}
```

```js index.test.js
import { promiseRace } from "./";

describe("promiseRace", () => {
  test("Resolves with the first resolved promise", async () => {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 500));
    const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Third")), 2000));

    const result = await promiseRace([promise1, promise2, promise3]);
    expect(result).toBe("Second");
  });

  test("Rejects with the first rejected promise", async () => {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 1500));
    const promise3 = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Third")), 500));

    await expect(promiseRace([promise1, promise2, promise3])).rejects.toThrow("Third");
  });
});
```
