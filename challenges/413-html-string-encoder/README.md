Implement a function that takes a **string** and an **array of styles** representing the HTML encoding of substrings, and returns the encoded HTML string.

Each style is an array `[start, end, tag]` where:

* `start` (inclusive) and `end` (exclusive) are indices in the string.
* `tag` is an HTML tag (e.g., `"b"`, `"i"`, `"u"`).
* Styles can overlap, and nested tags should be placed correctly.
* Overlapping styles must maintain correct ordering: inner tags open **after** outer tags if they start later, and close **before** if they end earlier.

### Example

```ts
const str = 'Hello, world'; 
const styleArr = [[0, 2, 'i'], [4, 9, 'b'], [7, 10, 'u']];

console.log(encodeHTML(str, styleArr));
// Output: "<i>Hel</i>l<b>o, w<u>orl</u></b><u>d</u>"
```

### Explanation

* Characters `0–2`: wrapped in `<i>` → `<i>Hel</i>`
* Characters `4–9`: wrapped in `<b>` → `<b>o, w…</b>`
* Characters `7–10`: wrapped in `<u>`; overlaps with bold, so placed **inside** `<b>` for overlapping range, and continues after `<b>` ends.

This behavior is similar to how **WYSIWYG editors** handle style ranges.

### Constraints

* Input string length ≤ 10^5
* Number of styles ≤ 10^4
* Tags are valid HTML inline tags.
