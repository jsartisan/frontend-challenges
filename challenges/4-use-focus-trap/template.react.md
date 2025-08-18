```js App.jsx
import { useFocusTrap } from "./useFocusTrap";

function App() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
    </div>
  );
}

export default App;
```

```js useFocusTrap.js active
export function useFocusTrap() {}
```
