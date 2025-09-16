```ts index.ts 
/**
 * Converts a snake_case string to camelCase.
 */
export function snakeToCamel(input: string): string {
  // TODO: Implement me
  return "";
}
```

```ts index.test.ts 
import { snakeToCamel } from "./index";

describe("snakeToCamel", () => {
  it("converts basic snake_case to camelCase", () => {
    expect(snakeToCamel("hello_world")).toBe("helloWorld");
  });

  it("handles multiple underscores", () => {
    expect(snakeToCamel("convert_me_now")).toBe("convertMeNow");
  });

  it("ignores leading and trailing underscores", () => {
    expect(snakeToCamel("_private_var_")).toBe("privateVar");
  });

  it("returns the same string when already camelCase", () => {
    expect(snakeToCamel("alreadyCamel")).toBe("alreadyCamel");
  });

  it("returns empty string when input is empty", () => {
    expect(snakeToCamel("")).toBe("");
  });
});
```


