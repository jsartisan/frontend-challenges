```ts index.ts 
export type Page<T> = {
  items: T[];
  nextCursor: string | null;
};

export async function fetchItems<T>(
  fetchPage: (cursor?: string) => Promise<Page<T>>,
  amount: number,
): Promise<T[]> {}
```

```ts index.test.ts 
import { fetchItems, type Page } from "./index";

describe("fetchItems", () => {
  // Builds a fake paginated API from a list of pages.
  // Cursors are "c1", "c2", ... and the last page has nextCursor null.
  function createApi<T>(pages: T[][]) {
    const fetchPage = jest.fn(async (cursor?: string): Promise<Page<T>> => {
      const index = cursor === undefined ? 0 : Number(cursor.slice(1));
      if (index >= pages.length) throw new Error(`unknown cursor ${cursor}`);
      const nextCursor = index + 1 < pages.length ? `c${index + 1}` : null;
      return { items: pages[index], nextCursor };
    });
    return fetchPage;
  }

  test("returns items from a single page", async () => {
    const fetchPage = createApi([["a", "b", "c", "d"]]);

    await expect(fetchItems(fetchPage, 2)).resolves.toEqual(["a", "b"]);
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });

  test("starts with no cursor and follows nextCursor", async () => {
    const fetchPage = createApi([[1, 2], [3, 4], [5, 6]]);

    await expect(fetchItems(fetchPage, 5)).resolves.toEqual([1, 2, 3, 4, 5]);
    expect(fetchPage.mock.calls).toEqual([[undefined], ["c1"], ["c2"]]);
  });

  test("does not request another page once it has enough items", async () => {
    const fetchPage = createApi([[1, 2], [3, 4], [5, 6]]);

    await expect(fetchItems(fetchPage, 4)).resolves.toEqual([1, 2, 3, 4]);
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  test("returns everything when the list runs out early", async () => {
    const fetchPage = createApi([["x"], ["y", "z"]]);

    await expect(fetchItems(fetchPage, 10)).resolves.toEqual(["x", "y", "z"]);
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  test("keeps going past empty pages that still have a cursor", async () => {
    const fetchPage = createApi([[], [], ["only"], []]);

    await expect(fetchItems(fetchPage, 1)).resolves.toEqual(["only"]);
    expect(fetchPage).toHaveBeenCalledTimes(3);
  });

  test("makes no request when the amount is zero or less", async () => {
    const fetchPage = createApi([[1, 2, 3]]);

    await expect(fetchItems(fetchPage, 0)).resolves.toEqual([]);
    await expect(fetchItems(fetchPage, -3)).resolves.toEqual([]);
    expect(fetchPage).not.toHaveBeenCalled();
  });

  test("waits for each page before asking for the next one", async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    const pages = [[1], [2], [3]];
    const fetchPage = jest.fn(async (cursor?: string): Promise<Page<number>> => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 5));
      inFlight--;
      const index = cursor === undefined ? 0 : Number(cursor.slice(1));
      return {
        items: pages[index],
        nextCursor: index + 1 < pages.length ? `c${index + 1}` : null,
      };
    });

    await expect(fetchItems(fetchPage, 3)).resolves.toEqual([1, 2, 3]);
    expect(maxInFlight).toBe(1);
  });

  test("rejects with the error from a failed page", async () => {
    const error = new Error("server error");
    const fetchPage = jest
      .fn<Promise<Page<string>>, [string?]>()
      .mockResolvedValueOnce({ items: ["a"], nextCursor: "c1" })
      .mockRejectedValueOnce(error);

    await expect(fetchItems(fetchPage, 5)).rejects.toBe(error);
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  test("does not mutate the arrays returned by fetchPage", async () => {
    const first = [1, 2, 3];
    const fetchPage = jest.fn(async (): Promise<Page<number>> => ({
      items: first,
      nextCursor: null,
    }));

    const result = await fetchItems(fetchPage, 2);

    expect(result).toEqual([1, 2]);
    expect(first).toEqual([1, 2, 3]);
    expect(result).not.toBe(first);
  });
});
```


