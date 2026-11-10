```ts index.ts 
export function bind(
  fn: (...args: any[]) => any,
  thisArg: unknown,
  ...boundArgs: unknown[]
): (...args: any[]) => any {}
```

```ts index.test.ts 
import { bind } from "./index";

describe("bind", () => {
  test("fixes `this` for the returned function", () => {
    const counter = {
      count: 2,
      read(this: { count: number }) {
        return this.count;
      },
    };
    const read = bind(counter.read, counter);

    expect(read()).toBe(2);
  });

  test("pre-fills leading arguments and appends call-time ones", () => {
    function format(this: { unit: string }, a: number, b: number, c: number) {
      return `${a + b + c}${this.unit}`;
    }
    const inPx = bind(format, { unit: "px" }, 10);

    expect(inPx(20, 30)).toBe("60px");
    expect(bind(format, { unit: "em" }, 1, 2, 3)()).toBe("6em");
  });

  test("returns a new function and leaves the original alone", () => {
    function whoAmI(this: any) {
      return this;
    }
    const target = { id: 1 };
    const bound = bind(whoAmI, target);

    expect(bound).not.toBe(whoAmI);
    expect(bound()).toBe(target);
    expect(whoAmI.call("other")).toBe("other");
  });

  test("ignores `this` passed through call, apply or a method call", () => {
    function getId(this: { id: number }) {
      return this.id;
    }
    const bound = bind(getId, { id: 1 });
    const holder = { id: 2, bound };

    expect(bound.call({ id: 3 })).toBe(1);
    expect(bound.apply({ id: 4 }, [])).toBe(1);
    expect(holder.bound()).toBe(1);
  });

  test("binding a bound function keeps the first `this` but adds arguments", () => {
    function collect(this: { tag: string }, ...items: string[]) {
      return `${this.tag}:${items.join(",")}`;
    }
    const first = bind(collect, { tag: "A" }, "x");
    const second = bind(first, { tag: "B" }, "y");

    expect(second("z")).toBe("A:x,y,z");
  });

  test("passes through the return value and thrown errors", () => {
    const obj = {};
    const same = bind(function (this: unknown) {
      return this;
    }, obj);
    const boom = bind(() => {
      throw new Error("boom");
    }, null);

    expect(same()).toBe(obj);
    expect(() => boom()).toThrow("boom");
  });

  test("with `new`, the bound `this` is ignored and a new instance is built", () => {
    function Point(this: any, x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    Point.prototype.sum = function () {
      return this.x + this.y;
    };
    const ignored = { x: 0 };
    const AtXOne = bind(Point, ignored, 1) as any;
    const p = new AtXOne(5);

    expect(p.x).toBe(1);
    expect(p.y).toBe(5);
    expect(p.sum()).toBe(6);
    expect(p instanceof Point).toBe(true);
    expect(p instanceof AtXOne).toBe(true);
    expect(ignored).toEqual({ x: 0 });
  });

  test("with `new`, an object returned by the constructor wins", () => {
    const custom = { custom: true };
    function Factory(this: any) {
      this.ignored = true;
      return custom;
    }
    const Bound = bind(Factory, {}) as any;

    expect(new Bound()).toBe(custom);
  });

  test("calling the bound constructor without `new` still uses the bound `this`", () => {
    function Tag(this: any, label: string) {
      this.label = label;
    }
    const target: any = {};
    const bound = bind(Tag, target);
    bound("hi");

    expect(target.label).toBe("hi");
  });

  test("does not rely on the built-in Function.prototype.bind", () => {
    const original = Function.prototype.bind;
    Function.prototype.bind = function () {
      throw new Error("built-in bind is off limits");
    };
    try {
      function getX(this: { x: number }, add: number) {
        return this.x + add;
      }
      expect(bind(getX, { x: 1 }, 2)()).toBe(3);
    } finally {
      Function.prototype.bind = original;
    }
  });

  test("throws a TypeError when the target is not callable", () => {
    expect(() => bind({} as any, null)).toThrow(TypeError);
    expect(() => bind(42 as any, null)).toThrow(TypeError);
  });
});
```


