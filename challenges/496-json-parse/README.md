Implement your own version of `JSON.parse()` that converts JSON strings back to JavaScript values. This is the counterpart to `JSON.stringify()` and involves parsing various JSON data types.

### Requirements

1. **Basic types** – `null`, `boolean`, `number`, `string`
2. **Arrays** – handle nested arrays and mixed types
3. **Objects** – handle nested objects with string keys
4. **String parsing** – handle escape sequences, Unicode, quotes
5. **Number parsing** – handle integers, decimals, scientific notation
6. **Whitespace handling** – ignore whitespace between tokens
7. **Error handling** – throw syntax errors for invalid JSON

### Key Behaviors

- **String escape sequences** – `\"`, `\\`, `\/`, `\b`, `\f`, `\n`, `\r`, `\t`, `\uXXXX`
- **Number formats** – `123`, `123.45`, `-123`, `1.23e+4`, `1.23E-4`
- **Array parsing** – `[1, 2, 3]`, `["a", "b", "c"]`, `[1, [2, 3]]`
- **Object parsing** – `{"key": "value"}`, nested objects
- **Whitespace** – ignore spaces, tabs, newlines between tokens
- **Error cases** – malformed JSON, trailing commas, invalid escapes

### Example

```js
parse('{"name": "John", "age": 30}');
// { name: "John", age: 30 }

parse('[1, 2, [3, 4]]');
// [1, 2, [3, 4]]

parse('"Hello\\nWorld"');
// "Hello\nWorld"

parse('123.45e-2');
// 1.2345

parse('{"a": true, "b": null}');
// { a: true, b: null }
```

### Signature

```ts
function parse(json: string): any;
```

### Constraints

- **Cannot use native `JSON.parse()`** – must implement from scratch
- **Handle escape sequences** – properly decode string escapes
- **Validate JSON syntax** – throw errors for invalid input
