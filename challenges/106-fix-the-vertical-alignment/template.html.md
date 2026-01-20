```html index.html 
<!doctype html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div class="row">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
      </div>
    </div>
  </body>
</html>

```

```css styles.css 
body {
  font-family: sans-serif;
}

h1 {
  font-size: 1.5rem;
}

.row {
  display: flex;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  height: 1cap;
  font-size: 14px;
}

```

```js index.js 
import "./styles.css";
```

```json package.json 
{
  "dependencies": {},
  "main": "/index.js",
  "devDependencies": {}
}
```


