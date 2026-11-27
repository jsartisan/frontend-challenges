```css styles.css active
/* Write your styles here */
```

```js index.js hidden
import "./demo.css";
import "./styles.css";
```

```css demo.css hidden
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: #1f2937;
  background: #f3efe7;
}

h2,
p {
  margin: 0;
}

.card {
  background: #fff;
}

.product-image {
  background-color: #c9b79c;
  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 600 800%22%3E%3Crect width=%22600%22 height=%22800%22 fill=%22%23c9b79c%22/%3E%3Ccircle cx=%22300%22 cy=%22430%22 r=%22170%22 fill=%22%236b4f3a%22/%3E%3Crect x=%22230%22 y=%22170%22 width=%22140%22 height=%2290%22 rx=%2220%22 fill=%22%233f2d22%22/%3E%3C/svg%3E");
}

.category {
  font-size: 0.75rem;
  color: #6b7280;
}

.title {
  font-family: Georgia, serif;
  font-size: 2rem;
  line-height: 1.1;
}

.description {
  color: #4b5563;
}

.price-now {
  font-family: Georgia, serif;
  font-size: 2rem;
  color: #3f7a5c;
}

.price-was {
  font-size: 0.875rem;
  color: #6b7280;
}

.add-to-cart {
  font: inherit;
  font-weight: 700;
  color: #fff;
  background: #3f7a5c;
  border: 0;
  cursor: pointer;
}
```

```html index.html 
<!doctype html>
<html lang="en">
  <head>
    <title>Product Preview Card</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <main>
      <article class="card">
        <div
          class="product-image"
          role="img"
          aria-label="A round clay coffee pot with a dark lid on a sand-colored background"
        ></div>

        <div class="content">
          <p class="category">Kitchen</p>
          <h2 class="title">Hand-thrown Clay Coffee Pot</h2>
          <p class="description">
            Shaped on the wheel and fired twice, this pot keeps coffee warm for
            longer and pours without a drip. Holds four cups.
          </p>

          <p class="price">
            <span class="price-now">$64.00</span>
            <s class="price-was"><span class="visually-hidden">Was </span>$80.00</s>
          </p>

          <button class="add-to-cart" type="button">Add to cart</button>
        </div>
      </article>
    </main>
  </body>
</html>
```


