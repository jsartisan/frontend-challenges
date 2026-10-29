```ts index.ts 
type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem" | "key" | "length">;

type Options = {
  prefix?: string;
  now?: () => number;
};

export function createExpiringStorage(storage: StorageLike, options: Options = {}) {
  return {
    set(key: string, value: unknown, maxAge?: number): void {},
    get<T = unknown>(key: string): T | null {},
    remove(key: string): void {},
    clear(): void {},
    prune(): number {},
  };
}
```

```ts index.test.ts 
import { createExpiringStorage } from "./index";

class MemoryStorage {
  private data = new Map<string, string>();
  get length() {
    return this.data.size;
  }
  key(index: number) {
    return Array.from(this.data.keys())[index] ?? null;
  }
  getItem(key: string) {
    return this.data.has(key) ? this.data.get(key)! : null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, String(value));
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
}

function setup(prefix?: string) {
  let time = 1000;
  const backing = new MemoryStorage();
  const store = createExpiringStorage(backing, { prefix, now: () => time });
  const advance = (ms: number) => {
    time += ms;
  };
  return { backing, store, advance };
}

describe("createExpiringStorage", () => {
  test("stores and reads back values of any JSON type", () => {
    const { store } = setup();

    store.set("name", "Ada");
    store.set("count", 0);
    store.set("flags", { dark: true, tags: ["a", "b"] });

    expect(store.get("name")).toBe("Ada");
    expect(store.get("count")).toBe(0);
    expect(store.get("flags")).toEqual({ dark: true, tags: ["a", "b"] });
  });

  test("returns null for keys that were never set", () => {
    const { store } = setup();

    expect(store.get("missing")).toBeNull();
  });

  test("keeps a value until its maxAge has passed", () => {
    const { store, advance } = setup();

    store.set("token", "abc", 500);
    advance(499);
    expect(store.get("token")).toBe("abc");

    advance(1);
    expect(store.get("token")).toBeNull();
  });

  test("values without maxAge never expire", () => {
    const { store, advance } = setup();

    store.set("theme", "dark");
    advance(10 ** 12);

    expect(store.get("theme")).toBe("dark");
  });

  test("reading an expired value removes it from the underlying storage", () => {
    const { store, backing, advance } = setup();

    store.set("otp", "1234", 100);
    expect(backing.length).toBe(1);

    advance(100);
    store.get("otp");

    expect(backing.length).toBe(0);
  });

  test("setting a key again replaces the value and its expiry", () => {
    const { store, advance } = setup();

    store.set("session", "old", 100);
    advance(50);
    store.set("session", "new", 100);
    advance(80);

    expect(store.get("session")).toBe("new");

    store.set("session", "forever");
    advance(1000);
    expect(store.get("session")).toBe("forever");
  });

  test("a maxAge of 0 or less removes the key instead of storing it", () => {
    const { store, backing } = setup();

    store.set("draft", "hello");
    store.set("draft", "bye", 0);

    expect(store.get("draft")).toBeNull();
    expect(backing.length).toBe(0);
  });

  test("writes entries under the prefix", () => {
    const { store, backing } = setup("app:");

    store.set("user", "Ada");

    expect(backing.getItem("user")).toBeNull();
    expect(backing.getItem("app:user")).not.toBeNull();
    expect(store.get("user")).toBe("Ada");
  });

  test("returns null for raw values it did not write", () => {
    const { store, backing } = setup("app:");

    backing.setItem("app:broken", "not json {");
    backing.setItem("app:plain", "42");

    expect(store.get("broken")).toBeNull();
    expect(store.get("plain")).toBeNull();
  });

  test("remove deletes a single key", () => {
    const { store } = setup();

    store.set("a", 1);
    store.set("b", 2);
    store.remove("a");

    expect(store.get("a")).toBeNull();
    expect(store.get("b")).toBe(2);
  });

  test("clear only removes keys under its own prefix", () => {
    const { store, backing } = setup("app:");

    backing.setItem("other-lib", "keep me");
    store.set("a", 1);
    store.set("b", 2, 100);
    store.clear();

    expect(store.get("a")).toBeNull();
    expect(store.get("b")).toBeNull();
    expect(backing.getItem("other-lib")).toBe("keep me");
    expect(backing.length).toBe(1);
  });

  test("prune removes every expired entry and returns how many it removed", () => {
    const { store, backing, advance } = setup("app:");

    backing.setItem("other-lib", "keep me");
    store.set("short", 1, 100);
    store.set("shorter", 2, 50);
    store.set("long", 3, 1000);
    store.set("forever", 4);

    advance(100);

    expect(store.prune()).toBe(2);
    expect(backing.length).toBe(3);
    expect(store.get("long")).toBe(3);
    expect(store.get("forever")).toBe(4);
    expect(backing.getItem("other-lib")).toBe("keep me");
  });

  test("falls back to the real clock when no now option is given", () => {
    const backing = new MemoryStorage();
    const store = createExpiringStorage(backing);

    store.set("fresh", "yes", 60_000);
    store.set("stale", "no", -1);

    expect(store.get("fresh")).toBe("yes");
    expect(store.get("stale")).toBeNull();
  });
});
```


