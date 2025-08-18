```js index.js
export function spyOn(obj, methodName) {
  // your code here
}
```

```js index.test.js
import { spyOn } from "./index";

describe("spyOn", () => {
  let obj;

  beforeEach(() => {
    obj = {
      greet(name) {
        return `Hello, ${name}!`;
      },
    };
  });

  test("should track calls to the method", () => {
    const spy = spyOn(obj, "greet");

    obj.greet("Alice");
    obj.greet("Bob");

    expect(spy.calls).toEqual([["Alice"], ["Bob"]]);
  });

  test("should track the results of the method", () => {
    const spy = spyOn(obj, "greet");

    const result1 = obj.greet("Alice");
    const result2 = obj.greet("Bob");

    expect(spy.results).toEqual([result1, result2]);
  });

  test("should restore the original method", () => {
    const spy = spyOn(obj, "greet");

    spy.restore();

    expect(obj.greet("Alice")).toBe("Hello, Alice!");
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
