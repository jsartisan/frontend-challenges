```css styles.css
.holy-grail {
}
```

```js index.js hidden
import "./demo.css";
import "./styles.css";
```

```css demo.css hidden
body {
  font-family: sans-serif;
}

:root {
  --coral: hsl(300, 100%, 93%);
  --coral--b: hsl(280, 100%, 70%);
  --blue: hsl(200, 100%, 90%);
  --blue--b: hsl(200, 100%, 80%);
  --green: hsl(113, 85%, 95%);
  --green--b: hsl(84, 71%, 53%);
  --yellow: hsl(30, 100%, 93%);
  --yellow--b: hsl(40, 100%, 80%);
}

div > * {
  padding: 1rem;
}

div:nth-of-type(1):not(:has(div)) {
  background-color: var(--blue);
  border: 1px solid var(--blue--b);
}

div:nth-of-type(2):not(:has(div)) {
  background-color: var(--green);
  border: 1px solid var(--green--b);
}

main {
  background-color: var(--yellow);
  border: 1px solid var(--yellow--b);
}

header,
footer {
  background-color: var(--coral);
  border: 1px dashed var(--coral--b);
}
```

```html index.html
<!doctype html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div class="holy-grail">
      <header>Header</header>
      <div class="left-side">Left Sidebar</div>
      <main>Main Content</main>
      <div class="right-side">Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  </body>
</html>
```
