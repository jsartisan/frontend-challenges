```ts index.ts
export const shuffle = (arr: number[]) => {

}
```

```ts index.test.ts
import { shuffle } from './index';

describe('shuffle function', () => {
  test('should return a new array with the same elements in different order', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffledArr = shuffle(arr);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    expect(shuffledArr).not.toEqual(arr);
  });

  test('should not modify the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const arrCopy = arr.slice();
    shuffle(arr);
    expect(arr).toEqual(arrCopy);
  });

  test('should handle an empty array', () => {
    const arr: number[] = [];
    const shuffledArr = shuffle(arr);
    expect(shuffledArr).toEqual([]);
  });

  test('should handle an array with a single element', () => {
    const arr = [1];
    const shuffledArr = shuffle(arr);
    expect(shuffledArr).toEqual([1]);
  });

  test('should handle an array with duplicate elements', () => {
    const arr = [1, 2, 2, 3, 4, 4, 5];
    const shuffledArr = shuffle(arr);
    expect(shuffledArr).toHaveLength(arr.length);
    expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    expect(shuffledArr).not.toEqual(arr);
  });
});
```


