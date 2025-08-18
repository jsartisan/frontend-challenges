```js index.js
export function createFunctions() {
  const functions = [];

  let i = 0;
  while (i < 10) {
    let func = function () {
      console.log(i);
    };

    functions.push(func);
    i++;
  }

  return functions;
}
```

```js index.test.js
import { createFunctions } from "./index";

describe("createFunctions function", () => {
  let funcs;

  beforeEach(() => {
    funcs = createFunctions();
  });

  test("should create an array of functions", () => {
    expect(funcs.length).toBe(10);
    funcs.forEach((func, index) => {
      expect(typeof func).toBe("function");
    });
  });

  test("each function should log its own number", () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    funcs.forEach((func, index) => {
      func();
      expect(consoleLogSpy).toHaveBeenLastCalledWith(index);
    });

    consoleLogSpy.mockRestore();
  });
});
```

```json package.json
{
  "dependencies": {},
  "main": "/index.js",
  "devDependencies": {}
}
```
