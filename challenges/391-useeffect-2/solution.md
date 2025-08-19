On the **initial render of `App`**, the state `show` is `true`, so React renders `<Child />`.

Inside the **render of `Child`**, the `useIsMounted` hook creates a ref (`isMounted = useRef(false)`). During this render, `isMounted.current` is still `false`, and the hook returns that value. As a result, inside render, `isMounted === false`.

When React enters the **commit phase**, it runs `Child`’s effect. At this point, the effect from `useIsMounted` (which would normally set `isMounted.current = true`) has not yet run, so the ref is still `false`. The first `console.log(isMounted)` therefore logs `false`. A `Promise.resolve().then(...)` schedules a microtask to log again later, and then `unmount()` is called, which triggers `setShow(false)` in the parent and schedules `Child` to unmount.

Still in the same commit, after React finishes running effects for mounted components, it proceeds to unmount `Child`. During cleanup, the `useIsMounted` effect’s cleanup runs and sets `isMounted.current = false`. But since the ref was never flipped to `true` in the first place, it simply remains `false`.

Finally, when the **microtask from the Promise** runs after unmount, it logs the ref again. Because the component was removed before `isMounted.current` ever became `true`, the ref is still `false`.

✅ **Final console output, in order:**

* `false` (first log in effect before unmount)
* `false` (microtask after unmount)