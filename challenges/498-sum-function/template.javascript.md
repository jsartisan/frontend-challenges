```js index.js 
/**
 * Creates a sum function with currying and chaining support.
 * @param {...number} args - Initial arguments
 * @returns {Function} Sum function that can be chained
 */
function sum(...args) {
  // TODO: Implement me
}

export { sum };
```

```js index.test.js 
import { sum } from './index';

describe('sum (JS)', () => {
  it('creates a sum function that can be called', () => {
    const sum1 = sum(1);
    expect(typeof sum1).toBe('function');
  });

  it('supports value comparison with ==', () => {
    const sum1 = sum(1);
    expect(sum1(2) == 3).toBe(true);
    expect(sum1(3) == 4).toBe(true);
  });

  it('supports chaining multiple calls', () => {
    expect(sum(1)(2)(3) == 6).toBe(true);
    expect(sum(5)(-1)(2) == 6).toBe(true);
  });

  it('handles negative numbers', () => {
    expect(sum(10)(-5)(-3) == 2).toBe(true);
    expect(sum(-1)(-2)(-3) == -6).toBe(true);
  });

  it('handles zero values', () => {
    expect(sum(0)(5) == 5).toBe(true);
    expect(sum(5)(0) == 5).toBe(true);
    expect(sum(0)(0) == 0).toBe(true);
  });

  it('works with single argument', () => {
    expect(sum(42) == 42).toBe(true);
  });

  it('supports multiple arguments in single call', () => {
    expect(sum(1, 2)(3) == 6).toBe(true);
    expect(sum(1)(2, 3) == 6).toBe(true);
  }); 

  it('maintains separate instances', () => {
    const sum1 = sum(1);
    const sum2 = sum(2);
    
    expect(sum1(2) == 3).toBe(true);
    expect(sum2(3) == 5).toBe(true);
    expect(sum1(1) == 2).toBe(true);
  });
});
```


