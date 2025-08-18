```jsx App.jsx 
import { Counter } from "./Counter";

export default function App() {
  return <Counter />;
}

```

```js useReducer.js active
export function useReducer(reducer, initialState) {
  return [state, dispatch];
}
```

```jsx Counter.jsx 

import { useReducer } from "./useReducer";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```


