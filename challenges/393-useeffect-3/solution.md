On the **initial render**, the `App` function executes and logs `1`. The output includes `<Child />`, which itself doesn’t log during render.

Once the DOM is committed, React runs effects in child-before-parent order. The `Child` effect (`useEffect([count])`) runs first, logging `5`. Then the parent’s effects run: the first logs `2`, and the second (with an empty dependency array) logs `4` and triggers a `setCount` update.

At this point, the console has:

```
1
5
2
4
```

Because state changed (`count: 1 → 2`), React schedules a re-render.

During the **second render**, `App` runs again and logs `1`. Before React can apply the new effects, it cleans up the old ones, again in child-before-parent order: `Child`’s cleanup logs `6`, and `App`’s cleanup logs `3`.

After cleanup, React runs the updated effects. `Child`’s effect runs first, logging `5`, followed by the parent’s first effect, which logs `2`.

The second render therefore produces:

```
1
6
3
5
2
```

---

✅ **Final console output in order:**

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

---

Do you want me to also mark **which phase** (render, commit, cleanup, effect) each log comes from, like a side annotation next to the numbers?
