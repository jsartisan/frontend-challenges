Implement a custom React hook `useLocalStorage(key, initialValue)` that works like `useState`, but keeps the value saved in `localStorage` so it survives a page reload.

```js
const [value, setValue, remove] = useLocalStorage("theme", "light");
```

It returns a tuple:

- `value`: the current value.
- `setValue(next)`: sets a new value and saves it. Like `useState`, `next` can be a value or an updater function `(prev) => next`.
- `remove()`: deletes the key from `localStorage` and resets `value` back to the initial value.

Requirements:

- On first render, read the stored value for `key`. If nothing is stored, use `initialValue`. `initialValue` can also be a function, which is only called when it is needed (like the lazy initializer of `useState`).
- Values are saved with `JSON.stringify` and read with `JSON.parse`, so numbers, booleans, arrays and objects round-trip correctly. If the stored data is not valid JSON, fall back to `initialValue` instead of crashing.
- Calling `setValue` several times in the same event handler with updater functions must apply every update in order.
- `setValue` and `remove` must keep the **same identity** across renders.
- When another browser tab changes or removes the same key, the hook should update to match. Hint: the `storage` event fires on `window` in the *other* tabs. A removed key (`newValue === null`) resets to `initialValue`. Events for other keys are ignored.
- If `key` changes, the hook reads and writes the new key from then on.

### Example

```jsx
function ThemeToggle() {
  const [theme, setTheme, resetTheme] = useLocalStorage("theme", "light");

  return (
    <>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
        Toggle
      </button>
      <button onClick={resetTheme}>Reset</button>
    </>
  );
}
```

Reload the page and the theme you picked is still there. Open the page in two tabs and toggling in one updates the other.
