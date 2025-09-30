```jsx App.jsx 
import { useState } from "react";
import { usePrevious } from "./usePrevious";

export default function App() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

```js usePrevious.js active
export function usePrevious(value) {
  
} 
```


