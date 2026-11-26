```jsx App.jsx 
import { DataTable } from "./DataTable";
import "./styles.css";

const occupations = ["Engineer", "Designer", "Teacher", "Nurse", "Chef"];

const people = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  age: 21 + ((i * 7) % 40),
  occupation: occupations[i % occupations.length],
}));

export default function App() {
  return (
    <div>
      <h3>Team directory</h3>
      <DataTable rows={people} />
    </div>
  );
}
```

```jsx DataTable.jsx active
export function DataTable({ rows = [] }) {
  return <div></div>;
}
```

```css styles.css 
.data-table {
  font-family: system-ui, sans-serif;
  max-width: 560px;
}

.data-table table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 6px 10px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.data-table th {
  background: #f9fafb;
  font-weight: 600;
}

.data-table .controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.data-table button {
  padding: 4px 10px;
}
```


