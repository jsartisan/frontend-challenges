`btoa()` is the browser's built-in way to turn a "binary string" into base64 text. Write your own version, `myBtoa(input)`, without calling the built-in `btoa`, `Buffer`, or any other encoding helper.

A binary string is a string where every character stands for one byte, so every character code must be between 0 and 255. Base64 reads those bytes 3 at a time (24 bits) and writes them out as 4 characters of 6 bits each, picked from this 64-character alphabet:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
```

```ts
myBtoa("abc");     // "YWJj"
myBtoa("ab");      // "YWI="
myBtoa("a");       // "YQ=="
myBtoa("");        // ""
myBtoa("\xff");    // "/w=="
myBtoa("café");    // "Y2Fm6Q=="   (é is code 233, still one byte)
myBtoa("€");       // throws        (code 8364 does not fit in a byte)
```

**Rules**

1. If any character has a code above 255, throw an `Error`.
2. Take the bytes in groups of 3 and write 4 output characters for each group.
3. If the last group has only 1 or 2 bytes, fill the missing bits with zeros, write only the characters that hold real bits (2 or 3 of them), and pad the output with `=` so its length is a multiple of 4.
4. Whitespace and symbols in the input are ordinary bytes. Encode them like any other character.

**Follow-up:** many people pair `btoa` with `encodeURIComponent` tricks to encode emoji. How would you encode any Unicode string to base64 using `TextEncoder` together with your `myBtoa`?
