### Initial Render

1. `App` function runs, logs `1`.
2. Render includes ``.

**After DOM mounts (effects run, child before parent):**

- `Child`’s `useEffect ([count])`: logs `5`.
- `App`’s first `useEffect ([count])`: logs `2`.
- `App`’s second `useEffect ([])`: logs `4`, calls `setCount(count => count + 1)` to increment count.

**Console so far:**
```
1
5
2
4
```
When state changes (`count` updates from 1 to 2), 
- **Render runs again:**
  - `App` function logs `1` (second render).

React will cleanup the previous effects before running them again:

- **Cleanup effects (child before parent):**
  - `Child`’s cleanup: logs `6`.
  - `App`’s cleanup: logs `3`.

- **Effects run (child before parent):**
  - `Child`’s `useEffect ([count])`: logs `5`.
  - `App`’s first `useEffect ([count])`: logs `2`.

**Second render console:**
```
1
6
3
5
2
```

***

### **Full console output in order
```
1
5
2
4
1
6
3
5
2
```
