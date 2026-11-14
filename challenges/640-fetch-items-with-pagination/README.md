Most list APIs never hand you everything at once. You ask for a page, you get some items plus a cursor, and you pass that cursor back to get the next page. A feed that wants to show "the first 25 posts" has to keep asking until it has 25, or until the server says there is nothing left.

You are given a function `fetchPage(cursor?)` that returns a promise of one page:

```ts
type Page<T> = {
  items: T[];
  nextCursor: string | null; // null means this was the last page
};
```

Write `fetchItems(fetchPage, amount)` that resolves with the first `amount` items of the whole list, in order.

- The first request is made with no cursor (`fetchPage(undefined)`). Each later request uses the `nextCursor` from the page before it.
- Pages must be requested one at a time, since each one needs the cursor from the previous response.
- Stop as soon as you have `amount` items. Do not request a page you do not need, and trim extra items from the last page.
- If the list ends (`nextCursor` is `null`) before you reach `amount`, resolve with every item you got.
- A page can be empty and still have a `nextCursor`. Keep going in that case.
- If `amount` is `0` or less, resolve with `[]` without calling `fetchPage`.
- If any request rejects, `fetchItems` rejects with that same error.
- Do not change the `items` arrays returned by `fetchPage`.

```ts
// Pages on the server: [1, 2] -> [3, 4] -> [5, 6]

await fetchItems(fetchPage, 3);  // [1, 2, 3]       2 requests
await fetchItems(fetchPage, 4);  // [1, 2, 3, 4]    2 requests, the third page is never asked for
await fetchItems(fetchPage, 10); // [1, 2, 3, 4, 5, 6]
await fetchItems(fetchPage, 0);  // []              no requests
```
