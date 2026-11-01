Implement a custom React hook `useArray(initialValue)` that keeps an array in state and gives you small helpers to change it, so you don't have to write the same spread and `filter` code in every component.

```js
const { value, set, push, removeAt, update, filter, clear } = useArray([1, 2, 3]);
```

The returned object should contain:

- `value`: the current array. Defaults to `[]` when no `initialValue` is passed.
- `set(newArray)`: replaces the whole array.
- `push(...items)`: adds one or more items to the end.
- `removeAt(index)`: removes the item at `index`. If `index` is out of range, nothing changes.
- `update(index, item)`: replaces the item at `index` with `item`. If `index` is out of range, nothing changes.
- `filter(fn)`: keeps only the items for which `fn(item, index)` returns `true`.
- `clear()`: empties the array.

Requirements:

- Never mutate the current array. Every change must produce a new array so React re-renders.
- Calling several helpers in the same event handler must apply all of them in order. For example, `push(1); push(2); removeAt(0);` on an empty array leaves `[2]`.
- The helper functions must keep the **same identity** across renders, so they are safe to pass to memoized children or to put in a `useEffect` dependency list.

### Example

```jsx
function Tags() {
  const tags = useArray(["react", "hooks"]);

  return (
    <>
      {tags.value.map((tag, i) => (
        <span key={tag}>
          {tag} <button onClick={() => tags.removeAt(i)}>x</button>
        </span>
      ))}
      <button onClick={() => tags.push("state")}>Add tag</button>
      <button onClick={tags.clear}>Clear</button>
    </>
  );
}
```
