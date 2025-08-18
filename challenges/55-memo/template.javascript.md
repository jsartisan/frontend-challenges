```js index.js
export function memo(func) {}
```

```js index.test.js
import { memo } from "./index";

describe("memo function", () => {
  it("should memoize function calls", () => {
    const expensiveFunction = jest.fn((x, y) => x + y);

    const memoizedFunction = memo(expensiveFunction);

    memoizedFunction(2, 3);
    memoizedFunction(2, 3);
    memoizedFunction(2, 3);

    // Ensure the expensive function is called only once
    expect(expensiveFunction).toHaveBeenCalledTimes(1);
  });

  it("should memoize function calls with different arguments", () => {
    const expensiveFunction = jest.fn((x, y) => x + y);

    const memoizedFunction = memo(expensiveFunction);

    memoizedFunction(2, 3);
    memoizedFunction(3, 4);
    memoizedFunction(2, 3);
    memoizedFunction(3, 4);

    expect(expensiveFunction).toHaveBeenCalledTimes(2);
  });
});
```
