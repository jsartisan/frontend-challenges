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
  padding: 3rem 1.5rem;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: #1f2937;
  background: #eef0f4;
}

h1 {
  margin: 0 0 2rem;
  text-align: center;
}

blockquote,
figure {
  margin: 0;
}

.quote {
  margin: 1rem 0 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.story {
  margin: 1rem 0 0;
  opacity: 0.75;
}

.name {
  font-weight: 600;
}

.role {
  font-size: 0.875rem;
  opacity: 0.6;
}

.avatar {
  font-weight: 700;
  font-size: 0.875rem;
  color: #1f2937;
  background: #fbbf24;
}

.testimonial {
  color: #1f2937;
  background: #fff;
}

.testimonial:nth-child(1) {
  color: #fff;
  background: #6d28d9;
}

.testimonial:nth-child(2) {
  color: #fff;
  background: #4b5563;
}

.testimonial:nth-child(4) {
  color: #fff;
  background: #111827;
}
```

```html index.html 
<!doctype html>
<html lang="en">
  <head>
    <title>Testimonials Grid</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <main>
      <h1>What our students say</h1>

      <section class="testimonials" aria-label="Testimonials">
        <figure class="testimonial">
          <figcaption class="author">
            <span class="avatar" aria-hidden="true">MK</span>
            <span class="name">Maya Kerr</span>
            <span class="role">Frontend developer</span>
          </figcaption>
          <blockquote>
            <p class="quote">I went from copying snippets to shipping my own component library in six months.</p>
            <p class="story">The weekly reviews were the part that changed everything for me. Someone actually read my code and told me why a layout broke, instead of just handing me the fix. By the end I was the one explaining grid to my team.</p>
          </blockquote>
        </figure>

        <figure class="testimonial">
          <figcaption class="author">
            <span class="avatar" aria-hidden="true">LO</span>
            <span class="name">Luis Ortega</span>
            <span class="role">Career switcher</span>
          </figcaption>
          <blockquote>
            <p class="quote">The pace was right for someone with a full-time job.</p>
            <p class="story">Short lessons I could finish on the train, and projects that fit into a weekend.</p>
          </blockquote>
        </figure>

        <figure class="testimonial">
          <figcaption class="author">
            <span class="avatar" aria-hidden="true">AS</span>
            <span class="name">Aiko Sato</span>
            <span class="role">Designer</span>
          </figcaption>
          <blockquote>
            <p class="quote">Finally, CSS that does what I draw.</p>
            <p class="story">I stopped handing off mockups and started building them myself.</p>
          </blockquote>
        </figure>

        <figure class="testimonial">
          <figcaption class="author">
            <span class="avatar" aria-hidden="true">BN</span>
            <span class="name">Ben Novak</span>
            <span class="role">Backend engineer</span>
          </figcaption>
          <blockquote>
            <p class="quote">I no longer dread the frontend tickets in our sprint.</p>
            <p class="story">I joined to fill a gap in my skills and stayed for the community. The challenges are small enough to finish in an evening but each one taught me something I use at work, from focus states to responsive grids.</p>
          </blockquote>
        </figure>

        <figure class="testimonial">
          <figcaption class="author">
            <span class="avatar" aria-hidden="true">PR</span>
            <span class="name">Priya Raman</span>
            <span class="role">Student</span>
          </figcaption>
          <blockquote>
            <p class="quote">My portfolio got me my first interview.</p>
            <p class="story">Every project in it came from this course. Recruiters kept asking how I built the layouts, and I could walk them through each decision. Having real, finished work to show made all the difference when I had no job history to point to.</p>
          </blockquote>
        </figure>
      </section>
    </main>
  </body>
</html>
```


