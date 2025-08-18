```js index.js
export function throttle(cb, delay = 250) {
  // your answer here
}
```

```js index.test.js
import { throttle } from "./index";

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

describe("throttle function", () => {
  it("should throttle function calls", async () => {
    const mockFunction = jest.fn();

    const throttledFunction = throttle(mockFunction, 500);

    throttledFunction();
    throttledFunction();
    throttledFunction();

    await wait(600);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("should pass arguments correctly", async () => {
    const mockFunction = jest.fn();

    const throttledFunction = throttle(mockFunction, 500);

    throttledFunction(1);
    throttledFunction(2);

    await wait(600);
    expect(mockFunction).toHaveBeenCalledWith(1);
  });
});
```
