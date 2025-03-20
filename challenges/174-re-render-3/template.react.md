```css styles.css
body {
  font-family: sans-serif;
}

h1 {
  font-size: 1.5rem;
}
```

```jsx App.jsx
import SearchBar from "./SearchBar";
import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [items] = useState(["Apple", "Banana", "Orange", "Grapes"]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

```

```jsx index.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```html public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```jsx SearchBar.jsx
import { memo } from 'react';

const SearchBar = memo(({ onSearch }) => {
  console.log('SearchBar rendered');
  
  return (
    <input 
      type="text" 
      placeholder="Search..." 
      onChange={(e) => onSearch(e.target.value)} 
    />
  );
});

export default SearchBar;
```


