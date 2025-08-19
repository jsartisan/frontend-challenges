#### 1. Initial render of `App`

* `show = true`.
* So `<Child unmount={…} />` is rendered.

#### 2. Render of `Child`

* `useIsMounted()` runs:

  * Creates `isMounted = useRef(false)`.
  * During render, `isMounted.current = false`.
  * The hook **returns `false`** to the component.
* So inside render, `isMounted === false`.

#### 3. Commit phase (after DOM update)

* React runs `Child`’s `useEffect`.

  * At this moment:

    * The `useIsMounted` effect hasn’t run yet.
    * `isMounted.current` is still `false`.
  * First `console.log(isMounted)` → logs **`false`**.
  * Then `Promise.resolve(true).then(...)` schedules a microtask to log `isMounted` later.
  * `unmount()` runs → calls `setShow(false)` in parent → schedules `Child` to unmount.

So far logs:

```
false
```

#### 4. Still in the same commit phase

* After running all effects of mounted components, React will **unmount Child** (because `App` rerenders with `show = false`).
* On unmount, the cleanup of `useIsMounted` runs:

  ```js
  return () => isMounted.current = false;
  ```

  But note: `isMounted.current` was **never set to true** (because its effect didn’t get to run before unmount). So it remains `false`.

#### 5. Microtask from the `Promise.then`

* That callback runs after unmount.
* It logs `isMounted` again.
* Since the ref was never flipped to `true`, it’s still `false`.

So logs:

```
false
false
```

### ✅ Final Console Output:

```
false
false
```

⚠️ Key subtlety: Your `useIsMounted` implementation only flips `isMounted.current = true` **in an effect**. But in this case, the component unmounts before that effect runs. So `isMounted.current` never becomes `true`.
