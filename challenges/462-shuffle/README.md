Write a `shuffle` function that re-orders the elements of an array **in-place** such that every permutation is produced with equal probability (Fisher–Yates / Knuth shuffle).

### Signature

```ts
function shuffle<T>(array: T[]): T[];
```

* Return the same array instance, now mutated into a random order.
* Do **not** create and return a new array.
* The algorithm **must** run in `O(n)` time and `O(1)` extra space.

### Correctness Criterion

For an input of length *n*, each of the *n!* permutations must be returned with probability `1 / n!`.  The test harness will call your implementation thousands of times and measure the distribution using standard deviation.

Further reading: https://javascript.info/task/shuffle
