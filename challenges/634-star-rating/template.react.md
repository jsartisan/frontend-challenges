```jsx App.jsx 
import { useState } from "react";
import { StarRating } from "./StarRating";
import "./styles.css";

export default function App() {
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState(5);

  return (
    <div>
      <h3>How was your experience?</h3>
      <StarRating max={stars} value={rating} onChange={setRating} />
      <p>{rating ? `You rated this ${rating}/${stars}` : "Not rated yet"}</p>
      <button onClick={() => { setStars(stars === 5 ? 10 : 5); setRating(0); }}>
        Use {stars === 5 ? 10 : 5} stars
      </button>
    </div>
  );
}
```

```jsx StarRating.jsx active
export function StarRating({ max = 5, value, onChange }) {
  return <div></div>;
}
```

```css styles.css 
.star {
  font-size: 32px;
  color: #d1d5db;
  cursor: pointer;
  padding: 0 2px;
}

.star.filled {
  color: #f59e0b;
}

.star:focus-visible {
  outline: 2px solid #2563eb;
  border-radius: 4px;
}
```


