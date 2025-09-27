Implement your own version of `Object.assign()` that copies enumerable own properties from source objects to a target object. This is a fundamental JavaScript utility that powers the object spread operator under the hood.

### Requirements

1. **Property copying** – Copy all enumerable own properties from sources to target
2. **Multiple sources** – Support variadic arguments with multiple source objects
3. **Property overwriting** – Later sources should override earlier properties
4. **Return target** – Return the modified target object (same reference)
5. **Edge case handling** – Handle `null`, `undefined`, and primitive sources gracefully

### Key Behaviors

- **Enumerable properties only** – Skip non-enumerable and inherited properties
- **Symbol properties** – Copy symbol-keyed properties when enumerable
- **Primitive sources** – Ignore `null`, `undefined`, strings, numbers, booleans
- **Property precedence** – Later sources override earlier ones
- **Reference preservation** – Return the same target object reference

### Example

```js
const target = { a: 1 };
const source1 = { b: 2, c: 3 };
const source2 = { c: 4, d: 5 };

objectAssign(target, source1, source2);
// target is now { a: 1, b: 2, c: 4, d: 5 }
// Returns the same target object

objectAssign({}, { a: 1 }, null, undefined, { b: 2 });
// Returns { a: 1, b: 2 }

// Symbol properties
const symbol = Symbol('key');
objectAssign({}, { [symbol]: 'value', regular: 'prop' });
// Returns { regular: 'prop', [Symbol(key)]: 'value' }
```

### Key Challenge

The function must properly iterate over enumerable own properties while handling edge cases like primitive sources and maintaining the correct property precedence order.
