```ts index.js
function throttle(fn, delay, options = {}) {
  const { leading = true, trailing = true } = options;
  // TODO: Implement throttle with leading and trailing behaviour
  return function throttled(...args) {
    /* implementation */
  };
}
```

```ts index.test.js
const { throttle } = require("./index");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("throttle", () => {
  it("calls function immediately when leading is true", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled("A");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
  });

  it("waits before next call within delay", async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled("A");
    throttled("B");

    expect(fn).toHaveBeenCalledTimes(1);

    await wait(120);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("B");
  });

  it("supports disabling leading", async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { leading: false });

    throttled("A");
    expect(fn).not.toHaveBeenCalled();

    await wait(120);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
  });

  it("supports disabling trailing", async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { trailing: false });

    throttled("A");
    throttled("B");

    await wait(120);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
  });
});

```


