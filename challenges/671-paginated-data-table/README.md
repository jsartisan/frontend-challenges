Build a `DataTable` component that shows a list of people in a `<table>`, one page at a time, with controls to move between pages and to pick how many rows a page holds. Admin dashboards are full of these.

```jsx
<DataTable rows={[{ id: 1, name: "Asha", age: 31, occupation: "Engineer" }]} />
```

Props:

- `rows`: an array of `{ id, name, age, occupation }` objects. `id` is unique. Defaults to `[]`. You can assume it does not change after the first render.

Table:

- The header row has four column headers, in this order: **ID**, **Name**, **Age**, **Occupation**.
- Each body row shows one person's `id`, `name`, `age` and `occupation`, one per cell, in the order they appear in `rows`.
- When `rows` is empty, the body has a single row with one cell that reads `No data`.

Controls, below the table:

- A `<select>` labelled **Rows per page** with the options `5`, `10` and `20`. It starts at `5`.
- A **Previous** button and a **Next** button.
- A status text between them that reads `Page X of Y`, for example `Page 2 of 3`.

Rules:

- Page `X` shows rows `(X - 1) * size + 1` through `X * size` (the last page may hold fewer).
- `Y` is the number of pages needed for all rows. An empty table still counts as `Page 1 of 1`.
- **Previous** is disabled on the first page. **Next** is disabled on the last page.
- Changing **Rows per page** sends you back to page 1.

### Example

With 12 people and the default page size:

1. The table shows people 1 to 5 and the status reads `Page 1 of 3`. **Previous** is disabled.
2. Press **Next** twice. The table shows people 11 and 12, the status reads `Page 3 of 3` and **Next** is disabled.
3. Pick `10` in **Rows per page**. The table shows people 1 to 10 and the status reads `Page 1 of 2`.
