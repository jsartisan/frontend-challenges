```js index.js 
export function objectAssign(target, ...sources) {
  // TODO: Implement me
}
```

```js index.test.js 
import { objectAssign } from './index';

describe('objectAssign', () => {
  it('should copy properties from source to target', () => {
    const target = { a: 1 };
    const source = { b: 2, c: 3 };
    const result = objectAssign(target, source);
    
    expect(result).toBe(target);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle multiple sources', () => {
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const result = objectAssign(target, source1, source2);
    
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should overwrite existing properties', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = objectAssign(target, source);
    
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should handle null and undefined sources', () => {
    const target = { a: 1 };
    const result = objectAssign(target, null, undefined, { b: 2 });
    
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle primitive sources', () => {
    const target = { a: 1 };
    const result = objectAssign(target, 'string', 42, true, null);
    
    expect(result).toEqual({"0": "s", "1": "t", "2": "r", "3": "i", "4": "n", "5": "g", "a": 1});
  });

  it('should handle empty target and sources', () => {
    const result = objectAssign({}, { a: 1 }, {});
    
    expect(result).toEqual({ a: 1 });
  });

  it('should not copy non-enumerable properties', () => {
    const source = {};
    Object.defineProperty(source, 'nonEnumerable', {
      value: 'test',
      enumerable: false
    });
    
    const target = {};
    const result = objectAssign(target, source);
    
    expect(result).toEqual({});
    expect('nonEnumerable' in result).toBe(false);
  });

  it('should handle symbol properties', () => {
    const symbol = Symbol('test');
    const target = {};
    const source = { [symbol]: 'value', regular: 'prop' };
    const result = objectAssign(target, source);
    
    expect(result).toEqual({ regular: 'prop', [symbol]: 'value' });
  });
});
```


