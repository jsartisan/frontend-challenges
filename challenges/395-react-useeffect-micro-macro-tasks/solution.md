### Output
```
1 // render
3 // Promise callback
4 // setTimeout callback
2 // useEffect callback
```

### Why does the blocking `while` loop delay the `useEffect` callback?

- The `while` loop runs for \~50ms, which is relatively long in JavaScript execution terms. Since JavaScript is single-threaded, this loop blocks the main thread, preventing React from finishing its render cycle and running effects on time.

- React schedules effects after the reconciliation and commit phases. Normally, once React commits changes to the DOM, it runs `useEffect` callbacks. But if the main thread is blocked by a long-running loop, React can’t complete the commit phase immediately.

- As a result, by the time React is ready to commit and run effects, other tasks—like a resolved Promise (microtask) or a `setTimeout` (macrotask)—have already been queued and get a chance to run first.

**Key idea:** Any long synchronous operation (like a blocking `while` loop) delays React’s commit phase and `useEffect` execution, letting other queued tasks in the event loop run earlier.

---

### Without the blocking loop

```jsx
function App() {
  const [state] = useState(0);
  console.log(1);

  useEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => console.log(3));
  setTimeout(() => console.log(4), 0);

  return null;
}
```

**Console output**

```
1 // render
2 // useEffect callback
3 // Promise callback
4 // setTimeout callback
```

### With a blocking loop + `useLayoutEffect`

```jsx
function App() {
  const [state] = useState(0);
  console.log(1);

  const start = Date.now();
  while (Date.now() - start < 50) {
    window.timestamp = Date.now();
  }

  useLayoutEffect(() => {
    console.log(2);
  }, [state]);

  Promise.resolve().then(() => console.log(3));
  setTimeout(() => console.log(4), 0);

  return null;
}
```

**Console output**

```
1 // render
2 // useLayoutEffect callback
3 // Promise callback
4 // setTimeout callback
```

### Key Takeaways

* Blocking synchronous code delays React’s commit phase, pushing `useEffect` execution later.
* This gives already-queued microtasks (Promises) and macrotasks (`setTimeout`) a chance to run first.
* In React 18, `useEffect` may fire synchronously when triggered by discrete user input, but it still depends on when React can commit
