```html index.html 
<!doctype html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <ul>
      <li>
        <a href="#home" id="home">Home</a>
      </li>
      <li>
        <a href="#craft" id="craft">Craft</a>
      </li>
      <li>
        <a href="#posts" id="posts">Posts</a>
      </li>
      <li>
        <a href="#snippets" id="snippets">Snippets</a>
      </li>
    </ul>
  </body>
</html>

```

```css styles.css 
*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  background: light-dark(#fff, #000);
  display: flex;
  place-items: center;
  justify-content: center;
  min-height: 100svh;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue',
    Helvetica, Arial, sans-serif, system-ui;
  margin: 0;
  padding: 0.5rem;
}

ul {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  flex-wrap: wrap;
  color: color-mix(in lch, canvasText 50%, canvas);
  transition: color 0.2s;
  touch-action: none;
}

li {
  display: grid;
  place-items: center;
  font-weight: 400;
}

li a {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  width: 100%;
  height: 100%;
  color: currentColor;
  text-decoration: none;
}
```


