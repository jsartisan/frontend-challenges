```jsx App.jsx
import { useEffect, useState } from "react";

const Input = ({ onChange, label, placeholder, id }) => {
  useEffect(() => {
    console.log(`Input mounted`);
  }, []);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type="text" onChange={onChange} id={id} placeholder={placeholder} />
    </>
  );
};

const data = [1, 2];

export default function App() {
  const [order, setOrder] = useState(false);

  const inputs = order ? [...data].reverse() : data;

  return (
    <div className="App">
      <label>
        <input type="checkbox" onChange={() => setOrder(!order)} />
        Check to re-order
      </label>

      <div className="container">
        <div className="column">
          <h4>Inputs have no key</h4>
          <p>type something and re-order</p>

          {inputs.map((val) => (
            <Input label={`Input ${val}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
```
