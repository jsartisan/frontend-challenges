On the **initial render**, `useState(0)` initializes the state to `0`. During the render phase, `console.log(state)` runs and prints `0`.

After reconciliation, React commits the component (though nothing renders visually since it returns `null`) and then begins running effects.

The **first effect** (`useEffect(() => { setState(...) }, [])`) runs right after mount. It calls `setState(prev => prev + 1)`, updating state from `0 → 1`. This schedules a re-render.

The **second effect** also runs after the first mount commit, but before React performs the scheduled re-render. Inside it, `console.log(state)` logs the value at this point, which is still `0`. It also schedules a `setTimeout`, whose closure captures that same `0`.

When the re-render occurs (due to the state update from the first effect), React renders again with `state = 1`. During this render, `console.log(state)` prints `1`. Since both effects had empty dependency arrays, they do not run again.

Finally, when the timeout fires (100ms later), the callback executes with the captured value from the original render (`0`), so it logs `0`.

✅ **Final console output, in order:**

* `0` (initial render)
* `0` (second effect log before re-render)
* `1` (re-render log)
* `0` (timeout callback with stale closure)