```ts index.ts 
export function getElementsByClassName(root: Element | Document, classNames: string): Element[] {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { getElementsByClassName } from "./index";

function render(html: string): HTMLElement {
  const root = document.createElement("div");
  root.innerHTML = html;
  return root;
}

function ids(elements: Element[]): string[] {
  return elements.map((el) => el.id);
}

describe("getElementsByClassName", () => {
  const protos = [Element.prototype, Document.prototype] as any[];
  const methods = ["getElementsByClassName", "querySelectorAll", "querySelector"];
  const originals = protos.map((proto) => methods.map((name) => proto[name]));

  beforeEach(() => {
    const blocked = () => {
      throw new Error("Walk the tree yourself instead of using the built-in lookups");
    };
    protos.forEach((proto) => methods.forEach((name) => (proto[name] = blocked)));
  });

  afterEach(() => {
    protos.forEach((proto, i) => methods.forEach((name, j) => (proto[name] = originals[i][j])));
  });

  test("finds elements with a single class", () => {
    const root = render(`
      <p id="a" class="note">One</p>
      <p id="b">Two</p>
      <p id="c" class="note big">Three</p>
    `);

    expect(ids(getElementsByClassName(root, "note"))).toEqual(["a", "c"]);
  });

  test("returns a real array", () => {
    const root = render(`<span id="a" class="tag"></span>`);
    const result = getElementsByClassName(root, "tag");

    expect(Array.isArray(result)).toBe(true);
  });

  test("searches nested descendants in document order", () => {
    const root = render(`
      <section id="s1" class="card">
        <div>
          <article id="s2" class="card">
            <span id="s3" class="card"></span>
          </article>
        </div>
      </section>
      <footer id="s4" class="card"></footer>
    `);

    expect(ids(getElementsByClassName(root, "card"))).toEqual(["s1", "s2", "s3", "s4"]);
  });

  test("does not include the root element itself", () => {
    const root = render(`<i id="inner" class="box"></i>`);
    root.className = "box";

    expect(ids(getElementsByClassName(root, "box"))).toEqual(["inner"]);
  });

  test("requires every class when several are given, in any order", () => {
    const root = render(`
      <button id="a" class="btn primary">Save</button>
      <button id="b" class="btn">Cancel</button>
      <button id="c" class="primary large btn">Go</button>
      <button id="d" class="primary">Hmm</button>
    `);

    expect(ids(getElementsByClassName(root, "primary btn"))).toEqual(["a", "c"]);
  });

  test("matches whole class names only", () => {
    const root = render(`
      <div id="a" class="item"></div>
      <div id="b" class="item-active"></div>
      <div id="c" class="items"></div>
      <div id="d" class="my-item"></div>
    `);

    expect(ids(getElementsByClassName(root, "item"))).toEqual(["a"]);
  });

  test("is case-sensitive", () => {
    const root = render(`
      <div id="a" class="Header"></div>
      <div id="b" class="header"></div>
    `);

    expect(ids(getElementsByClassName(root, "header"))).toEqual(["b"]);
  });

  test("ignores extra whitespace in the query and in class attributes", () => {
    const root = render(`
      <div id="a" class="  red    round  "></div>
      <div id="b" class="red"></div>
    `);

    expect(ids(getElementsByClassName(root, "   round \n\t red  "))).toEqual(["a"]);
  });

  test("returns an empty array for an empty or blank query", () => {
    const root = render(`<div class="x"></div><div class=""></div>`);

    expect(getElementsByClassName(root, "")).toEqual([]);
    expect(getElementsByClassName(root, "   ")).toEqual([]);
  });

  test("returns an empty array when nothing matches", () => {
    const root = render(`<div class="a"><span class="b"></span></div>`);

    expect(getElementsByClassName(root, "c")).toEqual([]);
  });

  test("skips text and comment nodes", () => {
    const root = render(`text <!-- class="hit" --> <b id="a" class="hit">bold</b> more text`);

    expect(ids(getElementsByClassName(root, "hit"))).toEqual(["a"]);
  });

  test("works on SVG elements too", () => {
    const root = render(`
      <svg>
        <circle id="a" class="dot"></circle>
        <rect id="b" class="dot big"></rect>
      </svg>
    `);

    expect(ids(getElementsByClassName(root, "dot"))).toEqual(["a", "b"]);
  });

  test("can start from a document", () => {
    document.body.innerHTML = `<main><p id="a" class="lead"></p></main>`;

    expect(ids(getElementsByClassName(document, "lead"))).toEqual(["a"]);
  });
});
```


