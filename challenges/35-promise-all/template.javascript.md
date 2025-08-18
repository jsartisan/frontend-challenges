```js index.js
export function promiseAll(promises) {}
```

```js index.test.js
import { promiseAll } from "./index";

describe("promiseAll", () => {
  test("Resolves all promises correctly", async () => {
    const promise1 = Promise.resolve("Apple");
    const promise2 = "Banana";
    const promise3 = new Promise((resolve) => setTimeout(() => resolve("Cherry"), 500));

    const results = await promiseAll([promise1, promise2, promise3]);
    expect(results).toEqual(["Apple", "Banana", "Cherry"]);
  });

  test("Resolves empty array", async () => {
    const results = await promiseAll([]);
    expect(results).toEqual([]);
  });

  test("Rejects with error message when any promise rejects", async () => {
    const promise1 = Promise.resolve("Apple");
    const promise2 = Promise.reject(new Error("Error occurred"));
    const promise3 = new Promise((resolve) => setTimeout(() => resolve("Cherry"), 500));

    await expect(promiseAll([promise1, promise2, promise3])).rejects.toThrow("Error occurred");
  });

  test("Maintains the order of promises", async () => {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 500));
    const promise3 = new Promise((resolve) => setTimeout(() => resolve("Third"), 2000));

    const results = await promiseAll([promise1, promise2, promise3]);
    expect(results).toEqual(["First", "Second", "Third"]);
  });
});
```
