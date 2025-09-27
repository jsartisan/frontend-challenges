Create a function that accurately detects the data type of any JavaScript value. This includes both primitive types and complex object types.

### Requirements

1. **Basic types** – `number`, `string`, `boolean`, `undefined`, `null`, `symbol`, `bigint`
2. **Complex types** – `array`, `arraybuffer`, `map`, `set`, `date`, `function`, `object`
3. **Lowercase output** – return type names in lowercase
4. **Edge cases** – handle `null` vs `object`, arrays vs objects, etc.

### Examples

```js
detectType(1);                    // 'number'
detectType('hello');              // 'string'
detectType(true);                 // 'boolean'
detectType(undefined);            // 'undefined'
detectType(null);                 // 'null'
detectType(Symbol('test'));       // 'symbol'
detectType(123n);                 // 'bigint'

detectType([]);                   // 'array'
detectType(new Map());            // 'map'
detectType(new Set());            // 'set'
detectType(new Date());           // 'date'
detectType(() => {});             // 'function'
detectType(new ArrayBuffer());    // 'arraybuffer'
detectType({});                   // 'object'
```

### Signature

```ts
function detectType(value: any): string;
```

### Key Challenges

- **`null` detection** – `typeof null === 'object'` is a JavaScript quirk
- **Array vs Object** – distinguish between arrays and plain objects
- **Built-in objects** – detect specific constructor types like `Map`, `Set`, `Date`
