```jsx App.jsx 
import { useState } from "react";
import { useArray } from "./useArray";

export default function App() {
  const [text, setText] = useState("");
  const todos = useArray(["Buy milk", "Walk the dog"]);

  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    todos.push(text.trim());
    setText("");
  };

  return (
    <div>
      <form onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.value.map((todo, i) => (
          <li key={i}>
            {todo}{" "}
            <button onClick={() => todos.update(i, todo.toUpperCase())}>Shout</button>{" "}
            <button onClick={() => todos.removeAt(i)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={() => todos.filter((t) => t.length > 8)}>Keep long ones</button>{" "}
      <button onClick={todos.clear}>Clear all</button>
    </div>
  );
}
```

```js useArray.js active
export function useArray(initialValue = []) {

}
```


