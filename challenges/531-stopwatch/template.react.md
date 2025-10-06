```jsx App.jsx 
import { Stopwatch } from "./Stopwatch";

export default function App() {
  return <Stopwatch />
}

```

```jsx Stopwatch.jsx active 
export function Stopwatch() {
  return (
    <div>
      <p>0s 00ms</p>
      <div>
        <button>Start</button> <button>Reset</button>
      </div>
    </div>
  );
}

```


