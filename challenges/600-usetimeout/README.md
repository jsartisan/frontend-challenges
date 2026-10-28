Implement a custom React hook `useTimeout(callback, delay)` that runs `callback` once, `delay` milliseconds after the component mounts.

Calling `setTimeout` inside `useEffect` looks simple, but it gets tricky once the component re-renders. Your hook should behave like this:

- `callback` is called exactly once, after `delay` ms.
- Re-rendering the component with the same `delay` must **not** restart the timer.
- If a new `callback` is passed while the timer is running, the **latest** callback is the one that runs when the timer fires, and the timer is **not** restarted. This means an inline arrow function always sees fresh state.
- If `delay` changes, the old timer is cancelled and a new one starts with the new `delay`.
- If `delay` is `null`, no timer runs. Switching from `null` to a number starts the timer.
- The timer is cleared when the component unmounts, so `callback` never runs after that.

### Example

```jsx
function Toast({ message, onClose }) {
  const [hovered, setHovered] = useState(false);

  // close after 3 seconds, but pause while the user hovers the toast
  useTimeout(onClose, hovered ? null : 3000);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {message}
    </div>
  );
}
```

The hook does not need to return anything.
