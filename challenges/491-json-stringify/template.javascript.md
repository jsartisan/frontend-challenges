```js index.js 
/**
 * Custom implementation of JSON.stringify().
 * @param {any} value - Value to stringify
 * @returns {string} JSON string representation
 */
function stringify(value) {
  // TODO: Implement me
}

export { stringify };
```

```js index.test.js 
import { stringify } from './index';

describe('stringify (JS)', () => {
  it('handles primitive types', () => {
    expect(stringify(null)).toBe('null');
    expect(stringify(true)).toBe('true');
    expect(stringify(false)).toBe('false');
    expect(stringify(42)).toBe('42');
    expect(stringify('hello')).toBe('"hello"');
  });

  it('handles arrays', () => {
    expect(stringify([1, 2, 3])).toBe('[1,2,3]');
    expect(stringify(['a', 'b', 'c'])).toBe('["a","b","c"]');
    expect(stringify([1, 'a', true, null])).toBe('[1,"a",true,null]');
  });

  it('handles objects', () => {
    expect(stringify({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
    expect(stringify({ name: 'John', age: 30 })).toBe('{"name":"John","age":30}');
  });

  it('handles nested structures', () => {
    expect(stringify({ a: [1, 2], b: { c: 3 } })).toBe('{"a":[1,2],"b":{"c":3}}');
    expect(stringify([{ a: 1 }, { b: 2 }])).toBe('[{"a":1},{"b":2}]');
  });

  it('omits undefined, Symbol, and functions from objects', () => {
    expect(stringify({ a: 1, b: undefined, c: Symbol(), d: function() {} })).toBe('{"a":1}');
  });

  it('converts undefined, Symbol, and functions to null in arrays', () => {
    expect(stringify([1, undefined, Symbol(), function() {}])).toBe('[1,null,null,null]');
  });

  it('handles special number values', () => {
    expect(stringify(NaN)).toBe('null');
    expect(stringify(Infinity)).toBe('null');
    expect(stringify(-Infinity)).toBe('null');
  });

  it('handles Date objects', () => {
    const date = new Date('2023-01-01T00:00:00.000Z');
    expect(stringify(date)).toBe('"2023-01-01T00:00:00.000Z"');
  });

  it('handles RegExp objects', () => {
    expect(stringify(/test/gi)).toBe('{}');
  });

  it('handles empty structures', () => {
    expect(stringify([])).toBe('[]');
    expect(stringify({})).toBe('{}');
  });

  it('handles circular references', () => {
    const obj = { a: 1 };
    obj.self = obj;
    
    expect(() => stringify(obj)).toThrow();
  });

  it('handles deeply nested circular references', () => {
    const obj = { a: { b: { c: null } } };
    obj.a.b.c = obj;
    
    expect(() => stringify(obj)).toThrow();
  });
});
```


