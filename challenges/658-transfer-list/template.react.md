```jsx App.jsx 
import { TransferList } from "./TransferList";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h3>Pick your stack</h3>
      <TransferList
        initialLeft={["HTML", "CSS", "JavaScript", "TypeScript", "Node.js"]}
        initialRight={["React", "Vite"]}
      />
    </div>
  );
}
```

```jsx TransferList.jsx active
export function TransferList({ initialLeft = [], initialRight = [] }) {
  return <div></div>;
}
```

```css styles.css 
.transfer {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: system-ui, sans-serif;
}

.transfer fieldset {
  min-width: 180px;
  min-height: 200px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.transfer ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.transfer li {
  padding: 4px 0;
}

.transfer .actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.transfer button {
  min-width: 40px;
  padding: 4px 8px;
  font-size: 18px;
}

.transfer .empty {
  color: #6b7280;
}
```


