```ts index.ts 
type Init = string | Record<string, string> | [string, string][];

export class MyURLSearchParams {
  constructor(init?: Init) {
    // TODO: Implement me
  }

  get size(): number {
    // TODO: Implement me
    return 0;
  }

  append(name: string, value: string): void {
    // TODO: Implement me
  }

  delete(name: string): void {
    // TODO: Implement me
  }

  get(name: string): string | null {
    // TODO: Implement me
    return null;
  }

  getAll(name: string): string[] {
    // TODO: Implement me
    return [];
  }

  has(name: string): boolean {
    // TODO: Implement me
    return false;
  }

  set(name: string, value: string): void {
    // TODO: Implement me
  }

  toString(): string {
    // TODO: Implement me
    return "";
  }

  *[Symbol.iterator](): IterableIterator<[string, string]> {
    // TODO: Implement me
  }
}
```

```ts index.test.ts 
import { MyURLSearchParams } from "./index";

describe("MyURLSearchParams", () => {
  const Native = globalThis.URLSearchParams;

  beforeAll(() => {
    // make sure the built-in is not used
    (globalThis as any).URLSearchParams = undefined;
  });

  afterAll(() => {
    globalThis.URLSearchParams = Native;
  });

  describe("parsing a query string", () => {
    test("reads simple pairs", () => {
      const params = new MyURLSearchParams("color=red&size=m");
      expect(params.get("color")).toBe("red");
      expect(params.get("size")).toBe("m");
    });

    test("ignores a leading ?", () => {
      const params = new MyURLSearchParams("?page=2");
      expect(params.get("page")).toBe("2");
      expect(params.has("?page")).toBe(false);
    });

    test("returns null for a missing name", () => {
      const params = new MyURLSearchParams("a=1");
      expect(params.get("b")).toBeNull();
    });

    test("keeps repeated names in order", () => {
      const params = new MyURLSearchParams("tag=js&tag=css&tag=ts");
      expect(params.get("tag")).toBe("js");
      expect(params.getAll("tag")).toEqual(["js", "css", "ts"]);
      expect(params.getAll("missing")).toEqual([]);
    });

    test("treats a name without = as an empty value", () => {
      const params = new MyURLSearchParams("debug&q=");
      expect(params.has("debug")).toBe(true);
      expect(params.get("debug")).toBe("");
      expect(params.get("q")).toBe("");
    });

    test("splits only on the first =", () => {
      const params = new MyURLSearchParams("expr=a=b=c");
      expect(params.get("expr")).toBe("a=b=c");
    });

    test("skips empty segments", () => {
      const params = new MyURLSearchParams("&a=1&&b=2&");
      expect([...params]).toEqual([
        ["a", "1"],
        ["b", "2"],
      ]);
    });

    test("decodes + and percent escapes", () => {
      const params = new MyURLSearchParams("q=hello+world&path=%2Fhome%2Fme&sym=a%26b");
      expect(params.get("q")).toBe("hello world");
      expect(params.get("path")).toBe("/home/me");
      expect(params.get("sym")).toBe("a&b");
    });

    test("decodes multi-byte UTF-8 escapes", () => {
      const params = new MyURLSearchParams("city=M%C3%BCnchen&ok=%E2%9C%93");
      expect(params.get("city")).toBe("München");
      expect(params.get("ok")).toBe("✓");
    });

    test("decodes names too", () => {
      const params = new MyURLSearchParams("first+name=Ada&a%5Bb%5D=1");
      expect(params.get("first name")).toBe("Ada");
      expect(params.get("a[b]")).toBe("1");
    });

    test("leaves an invalid escape as it is", () => {
      const params = new MyURLSearchParams("x=100%&y=%zz");
      expect(params.get("x")).toBe("100%");
      expect(params.get("y")).toBe("%zz");
    });

    test("no argument or an empty string gives no entries", () => {
      expect(new MyURLSearchParams().size).toBe(0);
      expect(new MyURLSearchParams("").size).toBe(0);
      expect(new MyURLSearchParams("?").size).toBe(0);
    });
  });

  describe("other ways to construct", () => {
    test("from a plain object", () => {
      const params = new MyURLSearchParams({ a: "1", b: "two words" });
      expect([...params]).toEqual([
        ["a", "1"],
        ["b", "two words"],
      ]);
    });

    test("from a list of pairs, keeping duplicates", () => {
      const params = new MyURLSearchParams([
        ["x", "1"],
        ["x", "2"],
      ]);
      expect(params.getAll("x")).toEqual(["1", "2"]);
    });

    test("does not decode values that are not strings to parse", () => {
      const params = new MyURLSearchParams({ q: "a+b%20c" });
      expect(params.get("q")).toBe("a+b%20c");
    });
  });

  describe("changing entries", () => {
    test("append adds to the end, even for an existing name", () => {
      const params = new MyURLSearchParams("a=1");
      params.append("b", "2");
      params.append("a", "3");
      expect([...params]).toEqual([
        ["a", "1"],
        ["b", "2"],
        ["a", "3"],
      ]);
    });

    test("set replaces the first match in place and removes the rest", () => {
      const params = new MyURLSearchParams("a=1&b=2&a=3&c=4");
      params.set("a", "9");
      expect([...params]).toEqual([
        ["a", "9"],
        ["b", "2"],
        ["c", "4"],
      ]);
    });

    test("set adds a new name at the end", () => {
      const params = new MyURLSearchParams("a=1");
      params.set("z", "26");
      expect([...params]).toEqual([
        ["a", "1"],
        ["z", "26"],
      ]);
    });

    test("delete removes every entry with that name", () => {
      const params = new MyURLSearchParams("a=1&b=2&a=3");
      params.delete("a");
      expect(params.has("a")).toBe(false);
      expect([...params]).toEqual([["b", "2"]]);
      params.delete("missing");
      expect(params.size).toBe(1);
    });

    test("size counts every entry", () => {
      const params = new MyURLSearchParams("a=1&a=2&b=3");
      expect(params.size).toBe(3);
      params.append("c", "4");
      expect(params.size).toBe(4);
    });
  });

  describe("toString", () => {
    test("joins pairs with & and =, without a leading ?", () => {
      const params = new MyURLSearchParams("?a=1&b=2");
      expect(params.toString()).toBe("a=1&b=2");
    });

    test("encodes spaces as + and reserved characters as %XX", () => {
      const params = new MyURLSearchParams();
      params.append("q", "salt & pepper");
      params.append("eq", "1+1=2");
      params.append("path", "/a?b#c");
      expect(params.toString()).toBe("q=salt+%26+pepper&eq=1%2B1%3D2&path=%2Fa%3Fb%23c");
    });

    test("keeps letters, digits and * - . _ as they are", () => {
      const params = new MyURLSearchParams({ k: "Az09*-._~!" });
      expect(params.toString()).toBe("k=Az09*-._%7E%21");
    });

    test("encodes non-ASCII as UTF-8 bytes", () => {
      const params = new MyURLSearchParams({ city: "München", ok: "✓" });
      expect(params.toString()).toBe("city=M%C3%BCnchen&ok=%E2%9C%93");
    });

    test("writes = for empty values", () => {
      const params = new MyURLSearchParams("debug");
      expect(params.toString()).toBe("debug=");
    });

    test("parsing the output gives the same entries back", () => {
      const params = new MyURLSearchParams();
      params.append("a b", "c&d=e");
      params.append("ü", "100%");
      const copy = new MyURLSearchParams(params.toString());
      expect([...copy]).toEqual([...params]);
    });

    test("an empty instance serializes to an empty string", () => {
      expect(new MyURLSearchParams().toString()).toBe("");
    });
  });
});
```


