```jsx App.jsx 
import { useMediaQuery } from "./useMediaQuery";
import "./styles.css";

export default function App() {
  const isWide = useMediaQuery("(min-width: 768px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <div className={prefersDark ? "card dark" : "card"}>
      <h3>What does your browser report?</h3>
      <ul>
        <li>Wide screen (768px or more): {isWide ? "yes" : "no"}</li>
        <li>Dark mode: {prefersDark ? "yes" : "no"}</li>
        <li>Reduced motion: {reducedMotion ? "yes" : "no"}</li>
        <li>Portrait orientation: {isPortrait ? "yes" : "no"}</li>
      </ul>
      <p>Resize the window or change your OS theme to see the values update.</p>
    </div>
  );
}
```

```js useMediaQuery.js active
export function useMediaQuery(query, defaultValue = false) {

}
```

```css styles.css 
.card {
  font-family: sans-serif;
  max-width: 420px;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
}

.card.dark {
  background: #111827;
  color: #f9fafb;
  border-color: #374151;
}

.card li {
  margin: 4px 0;
}
```


