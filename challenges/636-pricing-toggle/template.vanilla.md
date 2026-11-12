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
  color: #1f2937;
  background: #f3f4f6;
}

h1 {
  text-align: center;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0 1rem;
}

.price small {
  font-size: 0.875rem;
  font-weight: 400;
}

.cta {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  color: #fff;
  background: #4f46e5;
}
```

```html index.html 
<!doctype html>
<html lang="en">
  <head>
    <title>Pricing Toggle</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <main class="pricing">
      <h1>Pick a plan</h1>

      <div class="billing">
        <span aria-hidden="true">Monthly</span>
        <input id="yearly" class="switch" type="checkbox" role="switch" />
        <label for="yearly">Yearly <small>(2 months free)</small></label>
      </div>

      <ul class="plans">
        <li class="plan">
          <h2>Hobby</h2>
          <p class="price">
            <span class="price-monthly">$8<small>/month</small></span>
            <span class="price-yearly">$80<small>/year</small></span>
          </p>
          <ul class="features">
            <li>1 project</li>
            <li>5 GB storage</li>
          </ul>
          <a class="cta" href="#">Choose Hobby</a>
        </li>
        <li class="plan plan-featured">
          <h2>Team</h2>
          <p class="price">
            <span class="price-monthly">$24<small>/month</small></span>
            <span class="price-yearly">$240<small>/year</small></span>
          </p>
          <ul class="features">
            <li>10 projects</li>
            <li>100 GB storage</li>
            <li>Shared workspaces</li>
            <li>Priority email support</li>
          </ul>
          <a class="cta" href="#">Choose Team</a>
        </li>
        <li class="plan">
          <h2>Business</h2>
          <p class="price">
            <span class="price-monthly">$59<small>/month</small></span>
            <span class="price-yearly">$590<small>/year</small></span>
          </p>
          <ul class="features">
            <li>Unlimited projects</li>
            <li>1 TB storage</li>
            <li>Single sign-on</li>
          </ul>
          <a class="cta" href="#">Choose Business</a>
        </li>
      </ul>
    </main>
  </body>
</html>
```


