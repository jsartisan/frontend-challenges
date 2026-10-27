```jsx App.jsx 
import { useState } from "react";
import { useTimeout } from "./useTimeout";

export default function App() {
  const [visible, setVisible] = useState(true);
  const [seconds, setSeconds] = useState(3);
  const [clicks, setClicks] = useState(0);

  // should log the latest click count, even though the callback is recreated on every render
  useTimeout(
    () => {
      console.log(`Hiding after ${clicks} clicks`);
      setVisible(false);
    },
    visible ? seconds * 1000 : null
  );

  return (
    <div>
      <label>
        Hide after{" "}
        <input
          type="number"
          min="1"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
        />{" "}
        seconds
      </label>

      <p>
        <button onClick={() => setClicks((c) => c + 1)}>Clicked {clicks} times</button>{" "}
        <button onClick={() => setVisible(true)}>Show again</button>
      </p>

      {visible ? <p>👋 I will disappear soon.</p> : <p>Gone!</p>}
    </div>
  );
}
```

```js useTimeout.js active
export function useTimeout(callback, delay) {

}
```


