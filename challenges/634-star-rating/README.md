Build a `StarRating` component that lets the user pick a score by clicking on stars, like the ones you see under a product review.

```jsx
<StarRating max={5} value={rating} onChange={setRating} />
```

Props:

- `max`: how many stars to show. Defaults to `5`.
- `value`: the current rating, from `0` (nothing picked) to `max`. The component is **controlled**: the parent owns the value.
- `onChange(next)`: called with the new rating whenever the user picks one.

Mouse behaviour:

- Clicking the Nth star calls `onChange(N)`. Stars `1..N` are drawn as filled.
- Clicking the star that is already selected clears the rating and calls `onChange(0)`.
- Hovering over the Nth star previews the rating: stars `1..N` look filled, but `onChange` is **not** called. When the mouse leaves the whole group, the stars go back to showing `value`.

Every star has the class `star`. A star that is drawn filled (because of `value` or the hover preview) also has the class `filled`.

Accessibility:

A rating is a "pick one of N" control, so expose it like a radio group:

- The wrapper has `role="radiogroup"` and `aria-label="Rating"`.
- Each star has `role="radio"`, `aria-checked` set to `true` only for the selected star, and an accessible name like `"1 star"`, `"2 stars"`, ... `"5 stars"`.
- Only one star is in the tab order (roving tabindex): the selected star has `tabIndex={0}` and every other star has `tabIndex={-1}`. If nothing is selected, the first star is the tabbable one.
- With focus inside the group:
  - `ArrowRight` / `ArrowUp` selects the next star (stops at `max`).
  - `ArrowLeft` / `ArrowDown` selects the previous star (stops at `1`).
  - `Home` selects the first star, `End` selects the last.
  - After a key press, focus moves to the newly selected star.

### Example

```jsx
function Review() {
  const [rating, setRating] = useState(0);
  return (
    <>
      <StarRating value={rating} onChange={setRating} />
      <p>{rating ? `You rated this ${rating}/5` : "Not rated yet"}</p>
    </>
  );
}
```

Hover the 4th star and four stars light up. Move the mouse away and they go dark again. Click the 4th star and the text says "You rated this 4/5". Press `ArrowLeft` and it drops to 3, with focus on the 3rd star.
