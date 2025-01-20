```html index.html 
<!doctype html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="stylesheet" href="/demo.css" />
  </head>

  <body>
    <div class="parent">
      <div class="rocket">🚀</div>
    </div>
  </body>
</html>

```

```css styles.css active 
.parent {
  height: 200px;
  width: 200px;
  border: 2px solid black;
  overflow: hidden;
  position: relative;
}

.rocket {
  height: 50px;
  width: 50px;
  font-size: 50px;
}
```

```json package.json 
{
  "dependencies": {},
  "main": "/index.html",
  "devDependencies": {}
}
```

```css demo.css 
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}
```


