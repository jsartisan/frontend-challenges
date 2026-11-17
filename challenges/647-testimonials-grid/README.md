Testimonial walls are a common marketing section: a handful of quote cards of different sizes arranged in a grid that reflows from a single column on a phone to an asymmetric "bento" layout on a desktop. It is a good exercise in CSS Grid, especially named areas and items that span several tracks.

You are given the markup for five testimonial cards. Write only CSS in `styles.css` (no JavaScript, and no changes to the HTML) so that the page meets these requirements.

**The grid**

- The `.testimonials` container is at most `1110px` wide and centered horizontally.
- The gap between cards is `1.5rem`, both between rows and between columns.
- Below `600px`, the cards are stacked in a single column, in source order, each taking the full width.
- From `600px` to `1023px`, use two equal columns: card 1 spans the full first row, cards 2 and 3 sit side by side in the second row, and cards 4 and 5 each take a full row below them.
- From `1024px` up, use four equal columns and two rows, laid out like the diagram below: card 1 spans columns 1–2 of the first row, card 2 sits in column 3 of the first row, card 3 sits in column 1 of the second row, card 4 spans columns 2–3 of the second row, and card 5 fills column 4 across both rows.
- Cards that share a row have the same height, and card 5 on the desktop layout is exactly as tall as both rows plus the gap.
- Don't change the visual order with `order` or by reordering the HTML. Screen reader and keyboard users read the cards in source order, so the placement must come from the grid itself. Hint: `grid-template-areas` makes the three layouts easy to read.

```text
≥ 1024px

┌─────────────────────┐ ┌─────────┐ ┌─────────┐
│ 1                   │ │ 2       │ │ 5       │
│                     │ │         │ │         │
└─────────────────────┘ └─────────┘ │         │
┌─────────┐ ┌─────────────────────┐ │         │
│ 3       │ │ 4                   │ │         │
│         │ │                     │ │         │
└─────────┘ └─────────────────────┘ └─────────┘

600px – 1023px          < 600px

┌─────────────────┐     ┌───────┐
│ 1               │     │ 1     │
└─────────────────┘     └───────┘
┌───────┐ ┌───────┐     ┌───────┐
│ 2     │ │ 3     │     │ 2     │
└───────┘ └───────┘     └───────┘
┌─────────────────┐        ...
│ 4               │     ┌───────┐
└─────────────────┘     │ 5     │
┌─────────────────┐     └───────┘
│ 5               │
└─────────────────┘
```

**The cards**

- Give every card some inner padding and rounded corners.
- In each card's header (`.author`), the avatar is a `40px` circle with the initials centered in it. The name and the role are stacked on top of each other to the right of the avatar, and the pair is vertically centered against it.

The colors and typography are already provided, so you can focus on the layout.

Credit: the idea comes from the Frontend Mentor challenge [Testimonials grid section](https://www.frontendmentor.io/challenges/testimonials-grid-section-Nnw6J7Un7). This version uses its own markup, content and requirements.
