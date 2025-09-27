```js index.js 
/**
 * Custom implementation of JSON.parse().
 * @param {string} json - JSON string to parse
 * @returns {any} Parsed JavaScript value
 */
function parse(json) {
  // TODO: Implement me
}

export { parse };
```

```js index.test.js 
import { parse } from './index';

describe('parse (JS)', () => {
  it('parses primitive types', () => {
    expect(parse('null')).toBe(null);
    expect(parse('true')).toBe(true);
    expect(parse('false')).toBe(false);
    expect(parse('42')).toBe(42);
    expect(parse('"hello"')).toBe('hello');
  });

  it('parses numbers correctly', () => {
    expect(parse('123')).toBe(123);
    expect(parse('123.45')).toBe(123.45);
    expect(parse('-123')).toBe(-123);
    expect(parse('-123.45')).toBe(-123.45);
    expect(parse('1.23e+4')).toBe(12300);
    expect(parse('1.23E-4')).toBe(0.000123);
  });

  it('parses arrays', () => {
    expect(parse('[1, 2, 3]')).toEqual([1, 2, 3]);
    expect(parse('["a", "b", "c"]')).toEqual(['a', 'b', 'c']);
    expect(parse('[1, "a", true, null]')).toEqual([1, 'a', true, null]);
    expect(parse('[]')).toEqual([]);
  });

  it('parses objects', () => {
    expect(parse('{"a": 1, "b": 2}')).toEqual({ a: 1, b: 2 });
    expect(parse('{"name": "John", "age": 30}')).toEqual({ name: 'John', age: 30 });
    expect(parse('{}')).toEqual({});
  });

  it('handles nested structures', () => {
    expect(parse('{"a": [1, 2], "b": {"c": 3}}')).toEqual({ a: [1, 2], b: { c: 3 } });
    expect(parse('[{"a": 1}, {"b": 2}]')).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it('handles string escape sequences', () => {
    expect(parse('"Hello\\nWorld"')).toBe('Hello\nWorld');
    expect(parse('"He said \\"Hello\\""')).toBe('He said "Hello"');
    expect(parse('"C:\\\\path\\\\file"')).toBe('C:\\path\\file');
    expect(parse('"\\t\\r\\n"')).toBe('\t\r\n');
  });

  it('handles Unicode escape sequences', () => {
    expect(parse('"\\u0041"')).toBe('A');
    expect(parse('"\\u0041\\u0042"')).toBe('AB');
    expect(parse('"Hello\\u0020World"')).toBe('Hello World');
  });

  it('ignores whitespace', () => {
    expect(parse('  [ 1 , 2 , 3 ]  ')).toEqual([1, 2, 3]);
    expect(parse('{ "a" : 1 , "b" : 2 }')).toEqual({ a: 1, b: 2 });
  });

  it('throws error for invalid JSON', () => {
    expect(() => parse('{a: 1}')).toThrow();
    expect(() => parse('[1, 2, 3,]')).toThrow();
    expect(() => parse('{"a": 1,}')).toThrow();
    expect(() => parse('{"a": }')).toThrow();
  });

  it('throws error for malformed strings', () => {
    expect(() => parse('"unclosed string')).toThrow();
    expect(() => parse('"invalid\\escape"')).toThrow();
    expect(() => parse('"invalid\\u12"')).toThrow();
  });

  it('handles complex nested structures', () => {
    const complex = '{"users": [{"id": 1, "name": "John"}, {"id": 2, "name": "Jane"}], "meta": {"count": 2}}';
    const expected = {
      users: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
      ],
      meta: { count: 2 }
    };
    expect(parse(complex)).toEqual(expected);
  });
});
```


