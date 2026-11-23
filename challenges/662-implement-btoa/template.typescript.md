```ts index.ts 
export function myBtoa(input: string): string {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { myBtoa } from "./index";

describe("myBtoa", () => {
  const nativeBtoa = globalThis.btoa;

  beforeAll(() => {
    // make sure the built-in is not used
    (globalThis as any).btoa = undefined;
  });

  afterAll(() => {
    globalThis.btoa = nativeBtoa;
  });

  test("encodes input whose length is a multiple of 3", () => {
    expect(myBtoa("abc")).toBe("YWJj");
    expect(myBtoa("foobar")).toBe("Zm9vYmFy");
  });

  test("adds one = when one byte is missing from the last group", () => {
    expect(myBtoa("ab")).toBe("YWI=");
    expect(myBtoa("Hello")).toBe("SGVsbG8=");
  });

  test("adds two = when two bytes are missing from the last group", () => {
    expect(myBtoa("a")).toBe("YQ==");
    expect(myBtoa("Hello, World!")).toBe("SGVsbG8sIFdvcmxkIQ==");
  });

  test("returns an empty string for empty input", () => {
    expect(myBtoa("")).toBe("");
  });

  test("encodes bytes outside the printable range", () => {
    expect(myBtoa("\x00")).toBe("AA==");
    expect(myBtoa("\x00\x01\x02")).toBe("AAEC");
    expect(myBtoa("\xff")).toBe("/w==");
    expect(myBtoa("\xfb\xff\xbf")).toBe("+/+/");
  });

  test("keeps whitespace and symbols as ordinary bytes", () => {
    expect(myBtoa(" ")).toBe("IA==");
    expect(myBtoa("a\nb")).toBe("YQpi");
    expect(myBtoa("1+1=2?")).toBe("MSsxPTI/");
  });

  test("output length is always a multiple of 4", () => {
    for (let len = 0; len < 20; len++) {
      const out = myBtoa("x".repeat(len));
      expect(out.length).toBe(Math.ceil(len / 3) * 4);
    }
  });

  test("accepts Latin-1 characters (codes 128 to 255)", () => {
    expect(myBtoa("é")).toBe("6Q==");
    expect(myBtoa("café")).toBe("Y2Fm6Q==");
  });

  test("throws when a character code is above 255", () => {
    expect(() => myBtoa("€")).toThrow();
    expect(() => myBtoa("hi ✓")).toThrow();
    expect(() => myBtoa("😀")).toThrow();
    expect(() => myBtoa("Ā")).toThrow();
  });

  test("handles longer input", () => {
    expect(myBtoa("The quick brown fox jumps over the lazy dog")).toBe(
      "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==",
    );
  });

  test("matches every possible single byte and byte pair", () => {
    const table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (let a = 0; a < 256; a++) {
      const single = String.fromCharCode(a);
      expect(myBtoa(single)).toBe(table[a >> 2] + table[(a & 3) << 4] + "==");
    }
    expect(myBtoa("\x12\x34")).toBe("EjQ=");
    expect(myBtoa("\xab\xcd")).toBe("q80=");
  });
});
```


