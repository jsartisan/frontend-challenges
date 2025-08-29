What will be the output in console for the following code when button is clicked:

```jsx
import { useState, Suspense } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
    setCount(count + 2);
  }

  console.log(count);

  return (
    <button onClick={updateCount}>{count} Count</button>
  );
}
```
