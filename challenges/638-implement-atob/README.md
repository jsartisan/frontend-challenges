Browsers ship `atob()` to turn a base64 string back into the raw bytes it encodes. Write your own version, `myAtob(encoded)`, without calling the built-in `atob`, `Buffer`, or any other decoding helper.

Base64 uses 64 characters (`A-Z`, `a-z`, `0-9`, `+`, `/`), each standing for 6 bits. Every 4 characters carry 3 bytes. The result is a "binary string": one character per byte, so every character code is between 0 and 255.

```ts
myAtob("SGVsbG8=");   // "Hello"
myAtob("YWJj");       // "abc"
myAtob("YQ");         // "a"      (padding can be left out)
myAtob(" YW\nJj ");   // "abc"    (whitespace is ignored)
myAtob("/w==");       // "\xff"   (a single byte with value 255)
myAtob("Y");          // throws
myAtob("YW-j");       // throws   ("-" is not in the alphabet)
```

**Rules**

Follow the same forgiving rules browsers use:

1. Remove every ASCII whitespace character (space, tab, `\n`, `\r`, `\f`) from the input.
2. If the length is now a multiple of 4, drop one or two `=` from the end, if present.
3. If the length now leaves a remainder of 1 when divided by 4, throw.
4. If any character left is not in the base64 alphabet (this includes any `=` that is still there), throw.
5. Decode the characters 6 bits at a time. Each time you have 8 bits, emit one byte. Any bits left over at the end (fewer than 8) are thrown away.

Throw an `Error` for invalid input. Return an empty string for an empty input.

**Follow-up:** can you decode it without building an intermediate string of bits?
