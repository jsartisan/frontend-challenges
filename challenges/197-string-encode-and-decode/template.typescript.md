```ts index.ts
export class Codec {
  encode(strs: string[]): string {}

  decode(s: string): string[] {}
}
```

```ts index.test.ts
import { Codec } from "./index";

describe("Codec", () => {
  const codec = new Codec();

  test("Example 1: Basic encoding and decoding", () => {
    const input = ["neet", "code", "love", "you"];
    const encoded = codec.encode(input);
    const decoded = codec.decode(encoded);
    expect(decoded).toEqual(input);
  });

  test("Example 2: Strings with special characters", () => {
    const input = ["we", "say", ":", "yes"];
    const encoded = codec.encode(input);
    const decoded = codec.decode(encoded);
    expect(decoded).toEqual(input);
  });

  test("Empty array", () => {
    const input: string[] = [];
    const encoded = codec.encode(input);
    const decoded = codec.decode(encoded);
    expect(decoded).toEqual(input);
  });

  test("Array with empty strings", () => {
    const input = ["", "hello", ""];
    const encoded = codec.encode(input);
    const decoded = codec.decode(encoded);
    expect(decoded).toEqual(input);
  });

  test("Strings with numbers", () => {
    const input = ["123", "456", "789"];
    const encoded = codec.encode(input);
    const decoded = codec.decode(encoded);
    expect(decoded).toEqual(input);
  });
});
```
