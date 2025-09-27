```js index.js 
/**
 * Detect the data type of any JavaScript value.
 * @param {any} value - Value to detect type of
 * @returns {string} Lowercase type name
 */
function detectType(value) {
  // TODO: Implement me
}

export { detectType };
```

```js index.test.js 
import { detectType } from './index';

describe('detectType (JS)', () => {
  it('detects primitive types', () => {
    expect(detectType(42)).toBe('number');
    expect(detectType('hello')).toBe('string');
    expect(detectType(true)).toBe('boolean');
    expect(detectType(undefined)).toBe('undefined');
    expect(detectType(Symbol('test'))).toBe('symbol');
    expect(detectType(123n)).toBe('bigint');
  });

  it('handles null correctly', () => {
    expect(detectType(null)).toBe('null');
  });

  it('detects array type', () => {
    expect(detectType([])).toBe('array');
    expect(detectType([1, 2, 3])).toBe('array');
  });

  it('detects complex object types', () => {
    expect(detectType(new Map())).toBe('map');
    expect(detectType(new Set())).toBe('set');
    expect(detectType(new Date())).toBe('date');
    expect(detectType(new ArrayBuffer(8))).toBe('arraybuffer');
  });

  it('detects functions', () => {
    expect(detectType(() => {})).toBe('function');
    expect(detectType(function() {})).toBe('function');
    expect(detectType(class {})).toBe('function');
  });

  it('detects plain objects', () => {
    expect(detectType({})).toBe('object');
    expect(detectType({ a: 1 })).toBe('object');
    expect(detectType(new Object())).toBe('object');
  });

  it('handles edge cases', () => {
    expect(detectType(NaN)).toBe('number');
    expect(detectType(Infinity)).toBe('number');
    expect(detectType(-Infinity)).toBe('number');
  });

  it('distinguishes between similar types', () => {
    expect(detectType([])).toBe('array');
    expect(detectType({})).toBe('object');
    expect(detectType(new Map())).toBe('map');
    expect(detectType(new Set())).toBe('set');
  });
});
```

```ts index.ts 
/**
 * Detect the data type of any JavaScript value.
 */
export function detectType(value: any): string {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { detectType } from './index';

describe('detectType (TS)', () => {
  it('detects primitive types', () => {
    expect(detectType(42)).toBe('number');
    expect(detectType('hello')).toBe('string');
    expect(detectType(true)).toBe('boolean');
    expect(detectType(undefined)).toBe('undefined');
    expect(detectType(Symbol('test'))).toBe('symbol');
    expect(detectType(123n)).toBe('bigint');
  });

  it('handles null correctly', () => {
    expect(detectType(null)).toBe('null');
  });

  it('detects array type', () => {
    expect(detectType([])).toBe('array');
    expect(detectType([1, 2, 3])).toBe('array');
  });

  it('detects complex object types', () => {
    expect(detectType(new Map())).toBe('map');
    expect(detectType(new Set())).toBe('set');
    expect(detectType(new Date())).toBe('date');
    expect(detectType(new ArrayBuffer(8))).toBe('arraybuffer');
  });

  it('detects functions', () => {
    expect(detectType(() => {})).toBe('function');
    expect(detectType(function() {})).toBe('function');
    expect(detectType(class {})).toBe('function');
  });

  it('detects plain objects', () => {
    expect(detectType({})).toBe('object');
    expect(detectType({ a: 1 })).toBe('object');
    expect(detectType(new Object())).toBe('object');
  });

  it('handles edge cases', () => {
    expect(detectType(NaN)).toBe('number');
    expect(detectType(Infinity)).toBe('number');
    expect(detectType(-Infinity)).toBe('number');
  });

  it('distinguishes between similar types', () => {
    expect(detectType([])).toBe('array');
    expect(detectType({})).toBe('object');
    expect(detectType(new Map())).toBe('map');
    expect(detectType(new Set())).toBe('set');
  });
});
```


