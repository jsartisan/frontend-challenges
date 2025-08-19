### Initial Render (mount phase)

1. **`useState(0)`** → state is initialized to `0`.
2. **`console.log(state)`** runs during render → logs:

```
0
```

3. React commits the DOM (though our component renders `null`), then runs the effects.

### First `useEffect(() => { setState(...) }, [])`

* This effect runs **after mount**.
* It calls `setState(prev => prev + 1)`, so state goes from `0 → 1`.
* React schedules a re-render.

### Second `useEffect(() => { ... }, [])`

* This effect also runs after the first mount commit (but before re-render).
* It logs the **current state at the time of this effect = 0**:

```
0
```

* It sets up a `setTimeout` (closure captures the current `state = 0`).
* After 100ms, it will log `0`.

---

### Re-render (because of first effect’s `setState`)

1. React re-renders with `state = 1`.
2. During render → `console.log(state)` logs:

```
1
```

3. Since both `useEffect` hooks have empty `[]` deps, they **do not run again**.

---

### Timeout fires

* From the second effect’s closure (which captured `state = 0` at the time).
* Logs:

```
0
```

### ✅ Final console output (in order):

```
0   // initial render log
0   // second effect log
1   // re-render log
0   // setTimeout log
```
