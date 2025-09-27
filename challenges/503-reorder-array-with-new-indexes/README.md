Suppose we have an array of items - `A`, and another array of indexes in numbers - `B`

```js
const A = ['A', 'B', 'C', 'D', 'E', 'F']
const B = [1,  5,  4,  3,  2,  0]
```

You need to reorder A, so that the A[i] is put at index of B[i], which means B is the new index for each item of A.

For above example A should be modified inline to following

```js
['F', 'A', 'E', 'D', 'C', 'B']
```

The input are always valid.

**Follow-up**: It is fairly easy to do this by using extra `O(n)` space, could you solve it with `O(1)` space?
