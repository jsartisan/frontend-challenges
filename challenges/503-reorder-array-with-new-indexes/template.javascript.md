```js index.js 
export function reorderArray(array, indexes) {
  // TODO: Implement me
}
```

```js index.test.js 
import { reorderArray } from './index';

describe('reorderArray', () => {
  it('should reorder array based on new indexes', () => {
    const array = ['A', 'B', 'C', 'D', 'E', 'F'];
    const indexes = [1, 5, 4, 3, 2, 0];
    reorderArray(array, indexes);
    expect(array).toEqual(['F', 'A', 'E', 'D', 'C', 'B']);
  });

  it('should handle single element array', () => {
    const array = ['X'];
    const indexes = [0];
    reorderArray(array, indexes);
    expect(array).toEqual(['X']);
  });

  it('should handle already sorted indexes', () => {
    const array = ['A', 'B', 'C'];
    const indexes = [0, 1, 2];
    reorderArray(array, indexes);
    expect(array).toEqual(['A', 'B', 'C']);
  });

  it('should handle reverse order indexes', () => {
    const array = ['A', 'B', 'C'];
    const indexes = [2, 1, 0];
    reorderArray(array, indexes);
    expect(array).toEqual(['C', 'B', 'A']);
  });

  it('should handle mixed data types', () => {
    const array = [1, 'hello', true, null];
    const indexes = [3, 0, 2, 1];
    reorderArray(array, indexes);
    expect(array).toEqual(['hello', true, null, 1]);
  });

  it('should handle complex reordering', () => {
    const array = [1, 2, 3, 4, 5];
    const indexes = [4, 0, 3, 1, 2];
    reorderArray(array, indexes);
    expect(array).toEqual([2, 4, 5, 3, 1]);
  });
});
```


