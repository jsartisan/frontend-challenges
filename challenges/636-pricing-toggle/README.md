Pricing pages often let visitors flip every plan between a monthly and a yearly price with a single switch. It is a small component, but it touches a lot of CSS: restyling a native form control, reacting to its state without JavaScript, and a card layout that has to hold up on a phone and on a wide screen.

You are given the markup for a pricing section with three plans and a billing switch. Write only CSS in `styles.css` (no JavaScript, and no changes to the HTML) so that the page meets these requirements.

**The switch**

- Keep the native `<input type="checkbox" role="switch">`. Do not hide it with `display: none` or `visibility: hidden`, since it must stay focusable and keep its accessible name from the "Yearly" label.
- Remove its default look (`appearance: none`) and draw it as a pill-shaped track that is wider than it is tall, with a round thumb drawn by a pseudo-element.
- Unchecked, the thumb sits on the left. Checked, the thumb slides to the right and the track takes an accent color.
- Clicking the "Yearly" label or pressing <kbd>Space</kbd> on the focused switch toggles it. A native checkbox already does this, so make sure your styles don't break it.
- When the switch is focused from the keyboard, show a clearly visible focus ring of at least 2px (`:focus-visible`).
- Animate the thumb, but turn the animation off for people who ask for less motion (`prefers-reduced-motion: reduce`).

**The prices**

- Each plan has a `.price-monthly` and a `.price-yearly` price. Only one may be shown at a time: monthly while the switch is unchecked, yearly while it is checked.
- The hidden price must be removed from the accessibility tree as well, so a screen reader never reads both.
- Hint: the switch is not a sibling of the prices, so look at `:has()`.

**The layout**

- Below 768px, the plans are stacked in a single column, in source order.
- From 768px up, the three plans sit side by side in equal-width columns.
- On wide screens the featured plan (`.plan-featured`) is taller than the other two, which are centered vertically next to it. Give it a different background or border so it stands out.
- In every card the "Choose" link sits at the bottom of the card, however long the feature list is, so the links of the two side cards line up with each other.

```text
Wide screen, yearly selected

        Monthly (  ●) Yearly (2 months free)

             ┌───────────────┐
┌──────────┐ │ Team          │ ┌──────────┐
│ Hobby    │ │ $240/year     │ │ Business │
│ $80/year │ │ 10 projects   │ │ $590/year│
│ 1 project│ │ ...           │ │ ...      │
│          │ │               │ │          │
│ [Choose] │ │               │ │ [Choose] │
└──────────┘ │ [Choose Team] │ └──────────┘
             └───────────────┘
```

Credit: the idea comes from the Frontend Mentor challenge [Pricing component with toggle](https://www.frontendmentor.io/challenges/pricing-component-with-toggle-8vPwRMIC). This version uses its own markup and requirements.
