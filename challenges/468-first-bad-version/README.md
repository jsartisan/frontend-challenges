You have multiple versions of a program, each numbered sequentially (starting from 0). Write a function that finds the **first bad version** given an `isBad(version)` predicate.

### Key Constraints

1. **All versions after the first bad version are also bad.**
2. Input versions are non-negative integers.
3. If no bad version exists, return `-1`.
4. Use **binary search** for optimal `O(log n)` performance.

### Signature

```ts
function firstBadVersion(isBad: (version: number) => boolean): (n: number) => number
```

The function returns another function that, given the total number of versions `n`, returns the first bad version index (or `-1`).

### Example

```ts
const isBad = (v) => v >= 4;  // version 4 and later are bad
const findFirst = firstBadVersion(isBad);

findFirst(10);  // returns 4
findFirst(3);   // returns -1 (no bad versions)
```
