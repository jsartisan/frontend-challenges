```jsx App.jsx
import { useState } from "react";

export default function App() {
  const [isCompany, setIsCompany] = useState(false);

  return (
    <>
      <label>
        <input type="checkbox" onChange={(e) => (e.target.checked ? setIsCompany(true) : setIsCompany(false))} />
        Is Comapny?
      </label>
      <br />
      {isCompany ? (
        <input label="Company Tax Id" placeholder="Enter 12 digits" id="company-tax-id" />
      ) : (
        <input label="Person Tax Id" placeholder="Enter 8 digits and 3 letters" id="person-tax-id" />
      )}
    </>
  );
}
```
