# Challenge filters

The `/challenges` page lists every challenge and lets the user narrow it by text, difficulty, category and type (All, Question, Quiz), and sort it. Filters are reflected in the URL query.

## Sub-features

- `filter-search` narrows the list by title text.
- `filter-type` narrows by Question or Quiz and writes `type=` to the URL.
- `filter-difficulty` and `filter-category` narrow through their menus (not yet in the journey).
- `filter-sort` changes the order (not yet in the journey).

## How to get to it (user POV)

- Choose `Challenges` in the header, or open `/challenges`.
- Open `/challenges?type=quiz` (or another query) directly.

## Driving it with Playwright

Preconditions:

- Baseline state from the index. Journey: `challenge-filters`.

- **All.** Open `/challenges`. Count the `main a[href^="/challenges/"]` links (195 at the time of writing). Step `all-challenges`.
- **Search.** Type `debounce` into `Search`. The list shrinks and every title mentions debounce (`Debounce`, `useDebounce`, `Debounce with Leading & Trailing`). Step `search-debounce`.
- **Type.** Clear the search and choose `Quiz`. The URL gains `type=quiz` and the list shrinks to the quiz challenges. Step `type-quiz`.

## Gotchas

- Each list row has a link and a check-icon button. Count links, not buttons.
- Filter state syncs to session storage as well as the URL, so it can carry over within one browser session.
- Totals change as challenges are added. Assert that a filter narrows the list, not an exact count.
