A product preview card is one of the most common pieces of an online shop: a photo, a short pitch, the price and a button. It looks simple, but getting it right means a layout that flips from stacked to side by side, an image that crops instead of stretching, and a few small accessibility details that are easy to forget.

You are given the markup for one card. Write only CSS in `styles.css` (no JavaScript, and no changes to the HTML) so that the card meets these requirements.

**Layout**

- The `.card` is at most `600px` wide and centered horizontally. It has rounded corners, and the image corners are rounded with it (nothing pokes out of the card).
- Below `600px`, the image sits on top and the text content below it. The image takes the full width of the card and is exactly `240px` tall.
- From `600px` up, the card has two equal columns: the image on the left and the text content on the right. The image fills the full height of the card.
- The product photo is a CSS background on `.product-image`, set in the provided styles. The element has `role="img"` and an `aria-label`, so screen readers still announce it. In both layouts the photo must cover its whole box, stay centered and keep its proportions: cropped to fit, never squashed, stretched or tiled.
- The `.content` area has inner padding, and its items are spaced evenly.

```text
≥ 600px                              < 600px

┌──────────────┬──────────────┐      ┌──────────────┐
│              │ KITCHEN      │      │    image     │  240px
│              │ Title        │      ├──────────────┤
│    image     │ Description  │      │ KITCHEN      │
│              │ $64.00 $80   │      │ Title        │
│              │ [Add to cart]│      │ ...          │
└──────────────┴──────────────┘      └──────────────┘
```

**Details**

- The category label (`.category`) is shown in uppercase with extra letter spacing. Do this in CSS, since the text in the HTML stays as written for screen readers.
- The current price and the old price sit on one line, with a gap between them, aligned on their text baseline.
- The old price contains a "Was " prefix for screen reader users. Add a `.visually-hidden` class that hides it on screen but keeps it in the accessibility tree. `display: none` and `visibility: hidden` don't count, because they hide it from screen readers too.
- The "Add to cart" button spans the full width of the content area, is at least `48px` tall so it is easy to tap, and has rounded corners.
- The button gets a darker background on hover, and a clearly visible custom focus ring (at least `2px`) when it is reached with the keyboard. Use `:focus-visible` so the ring doesn't show on mouse clicks.

The colors and typography are already provided, so you can focus on the layout and the details above.

Credit: the idea comes from the Frontend Mentor challenge [Product preview card component](https://www.frontendmentor.io/challenges/product-preview-card-component-GO7UmttRfa). This version uses its own markup, content and requirements.
