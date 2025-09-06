```js index.js 
/**
 * Finds the highest price of a commodity under a given timestamp.
 * @param {Array} records - List of { commodity, price, timestamp }
 * @param {string} commodity - The commodity name
 * @param {number} timestamp - The max timestamp allowed
 * @returns {number|null} - Highest price or null if not found
 */
export function findHighestPrice(records, commodity, timestamp) {
  // write your logic here
}
```

```js index.test.js 
import { findHighestPrice } from './';

describe('findHighestPrice function', () => {
  const records = [
    { commodity: "gold", price: 100, timestamp: 1 },
    { commodity: "gold", price: 120, timestamp: 3 },
    { commodity: "silver", price: 50, timestamp: 2 },
    { commodity: "gold", price: 90, timestamp: 5 },
  ];

  test('should return highest gold price under timestamp 3', () => {
    expect(findHighestPrice(records, "gold", 3)).toBe(120);
  });

  test('should return highest gold price under timestamp 1', () => {
    expect(findHighestPrice(records, "gold", 1)).toBe(100);
  });

  test('should return highest silver price under timestamp 3', () => {
    expect(findHighestPrice(records, "silver", 3)).toBe(50);
  });

  test('should return null if no record exists before timestamp', () => {
    expect(findHighestPrice(records, "silver", 1)).toBeNull();
  });

  test('should handle empty records', () => {
    expect(findHighestPrice([], "gold", 5)).toBeNull();
  });
});
```


