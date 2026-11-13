```ts index.ts 
export function myAtob(encoded: string): string {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { myAtob } from "./index";

describe("myAtob", () => {
  const nativeAtob = globalThis.atob;

  beforeAll(() => {
    // make sure the built-in is not used
    (globalThis as any).atob = undefined;
  });

  afterAll(() => {
    globalThis.atob = nativeAtob;
  });

  test("decodes a padded string", () => {
    expect(myAtob("SGVsbG8=")).toBe("Hello");
    expect(myAtob("SGVsbG8sIFdvcmxkIQ==")).toBe("Hello, World!");
  });

  test("decodes a string with no padding needed", () => {
    expect(myAtob("Zm9vYmFy")).toBe("foobar");
    expect(myAtob("YWJj")).toBe("abc");
  });

  test("returns an empty string for empty input", () => {
    expect(myAtob("")).toBe("");
  });

  test("accepts input with the padding left out", () => {
    expect(myAtob("YQ")).toBe("a");
    expect(myAtob("YWI")).toBe("ab");
    expect(myAtob("SGVsbG8")).toBe("Hello");
  });

  test("ignores ASCII whitespace anywhere in the input", () => {
    expect(myAtob("  SGVs\nbG8=\t")).toBe("Hello");
    expect(myAtob("Y W J j")).toBe("abc");
    expect(myAtob("YW\r\nJj\f")).toBe("abc");
  });

  test("decodes bytes outside the printable range", () => {
    expect(myAtob("AAEC")).toBe("\x00\x01\x02");
    expect(myAtob("/w==")).toBe("\xff");
    expect(myAtob("+/+/")).toBe("\xfb\xff\xbf");
  });

  test("every output character is a single byte", () => {
    const out = myAtob("////");
    expect(out.length).toBe(3);
    for (const ch of out) {
      expect(ch.charCodeAt(0)).toBe(255);
    }
  });

  test("drops leftover bits in the last group", () => {
    expect(myAtob("YR==")).toBe("a");
    expect(myAtob("YWJ=")).toBe("ab");
  });

  test("throws when the length leaves a single extra character", () => {
    expect(() => myAtob("Y")).toThrow();
    expect(() => myAtob("YWJjZ")).toThrow();
  });

  test("throws on characters outside the base64 alphabet", () => {
    expect(() => myAtob("*abc")).toThrow();
    expect(() => myAtob("YW-j")).toThrow();
    expect(() => myAtob("YW_j")).toThrow();
    expect(() => myAtob("YWJjé")).toThrow();
  });

  test("throws on misplaced or extra padding", () => {
    expect(() => myAtob("=YWJ")).toThrow();
    expect(() => myAtob("YQ=a")).toThrow();
    expect(() => myAtob("YQ=")).toThrow();
    expect(() => myAtob("YQ===")).toThrow();
    expect(() => myAtob("Y===")).toThrow();
    expect(() => myAtob("====")).toThrow();
  });

  test("handles longer input", () => {
    const encoded = "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==";
    expect(myAtob(encoded)).toBe("The quick brown fox jumps over the lazy dog");
  });
});
```


