Implement your own version of `JSON.stringify()` that converts JavaScript values to JSON strings. This is a complex function that handles many edge cases and data types.

### Requirements

1. **Basic types** – `null`, `boolean`, `number`, `string`
2. **Arrays** – handle nested arrays and mixed types
3. **Objects** – handle nested objects, enumerable properties
4. **Special values** – `undefined`, `Symbol`, `Function`, `Date`, `RegExp`
5. **Circular references** – detect and handle circular object references
6. **Edge cases** – `NaN`, `Infinity`, `-Infinity`, empty objects/arrays

### Key Behaviors

- **`undefined`** – omitted from objects, converted to `null` in arrays
- **`Symbol`** – omitted from objects, converted to `null` in arrays  
- **`Function`** – omitted from objects, converted to `null` in arrays
- **`Date`** – converted to ISO string
- **`RegExp`** – converted to empty object `{}`
- **`NaN`, `Infinity`** – converted to `null`
- **Circular references** – throw `TypeError` or handle gracefully

### Example

```js
stringify({ a: 1, b: [2, 3], c: { d: 4 } });
// '{"a":1,"b":[2,3],"c":{"d":4}}'

stringify({ a: undefined, b: Symbol(), c: function() {} });
// '{}'

stringify([1, undefined, Symbol(), function() {}]);
// '[1,null,null,null]'

stringify(new Date('2023-01-01'));
// '"2023-01-01T00:00:00.000Z"'

// Circular reference
const obj = { a: 1 };
obj.self = obj;
stringify(obj); // Should handle gracefully
```

### Signature

```ts
function stringify(value: any): string;
```

### Constraints

- **Cannot use native `JSON.stringify()`** – must implement from scratch
- **Handle circular references** – detect infinite loops
- **Follow JSON specification** – match standard behavior as closely as possible
