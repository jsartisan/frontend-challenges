```ts index.ts 
export function nextRightSibling(root: Element, target: Element): Element | null {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { nextRightSibling } from "./index";

function render(html: string): HTMLElement {
  const root = document.createElement("div");
  root.innerHTML = html;
  return root;
}

function byId(root: Element, id: string): Element {
  const found = Array.from(root.getElementsByTagName("*")).find((el) => el.id === id);
  if (!found) throw new Error(`No element with id "${id}"`);
  return found;
}

function idOf(el: Element | null): string | null {
  return el ? el.id : null;
}

describe("nextRightSibling", () => {
  test("returns the next sibling when it is an element", () => {
    const root = render(`<p id="a"></p><p id="b"></p><p id="c"></p>`);

    expect(idOf(nextRightSibling(root, byId(root, "a")))).toBe("b");
    expect(idOf(nextRightSibling(root, byId(root, "b")))).toBe("c");
  });

  test("returns null for the right-most element of the deepest level", () => {
    const root = render(`<p id="a"></p><p id="b"></p>`);

    expect(nextRightSibling(root, byId(root, "b"))).toBeNull();
  });

  test("jumps across parents to a cousin on the same level", () => {
    const root = render(`
      <section id="s1">
        <span id="a"></span>
        <span id="b"></span>
      </section>
      <section id="s2">
        <span id="c"></span>
      </section>
    `);

    expect(idOf(nextRightSibling(root, byId(root, "b")))).toBe("c");
    expect(idOf(nextRightSibling(root, byId(root, "s1")))).toBe("s2");
  });

  test("skips over parents that have no children on that level", () => {
    const root = render(`
      <div id="d1"><i id="a"></i></div>
      <div id="d2"></div>
      <div id="d3"></div>
      <div id="d4"><i id="b"></i></div>
    `);

    expect(idOf(nextRightSibling(root, byId(root, "a")))).toBe("b");
  });

  test("does not climb to a different level", () => {
    const root = render(`
      <div id="d1"><i id="a"></i></div>
      <div id="d2"></div>
    `);

    // d2 is to the right of a, but one level higher
    expect(nextRightSibling(root, byId(root, "a"))).toBeNull();
  });

  test("does not return a deeper descendant", () => {
    const root = render(`
      <div id="d1"><i id="a"></i></div>
      <div id="d2"><span id="sp"><b id="deep"></b></span></div>
    `);

    expect(idOf(nextRightSibling(root, byId(root, "a")))).toBe("sp");
  });

  test("ignores text and comment nodes", () => {
    const root = render(`<b id="a"></b> some text <!-- a comment --> <b id="b"></b>`);

    expect(idOf(nextRightSibling(root, byId(root, "a")))).toBe("b");
  });

  test("returns null for the root itself", () => {
    const root = render(`<p id="a"></p>`);

    expect(nextRightSibling(root, root)).toBeNull();
  });

  test("returns null when the target is not inside root", () => {
    const root = render(`<p id="a"></p><p id="b"></p>`);
    const other = render(`<p id="x"></p><p id="y"></p>`);

    expect(nextRightSibling(root, byId(other, "x"))).toBeNull();
  });

  test("measures levels from root, not from the document", () => {
    const page = render(`
      <div id="outer-a">
        <div id="root">
          <span id="a"></span>
        </div>
      </div>
      <div id="outer-b">
        <span id="outside"></span>
      </div>
    `);
    const root = byId(page, "root");

    // "outside" sits on the same level in the page, but is not inside root
    expect(nextRightSibling(root, byId(page, "a"))).toBeNull();
  });

  test("works on a larger, uneven tree", () => {
    const root = render(`
      <ul id="l1">
        <li id="l1a"><a id="x1"></a></li>
        <li id="l1b"></li>
      </ul>
      <ol id="l2"></ol>
      <ul id="l3">
        <li id="l3a"><a id="x2"></a><a id="x3"></a></li>
      </ul>
    `);

    expect(idOf(nextRightSibling(root, byId(root, "l1")))).toBe("l2");
    expect(idOf(nextRightSibling(root, byId(root, "l2")))).toBe("l3");
    expect(idOf(nextRightSibling(root, byId(root, "l1b")))).toBe("l3a");
    expect(idOf(nextRightSibling(root, byId(root, "x1")))).toBe("x2");
    expect(idOf(nextRightSibling(root, byId(root, "x2")))).toBe("x3");
    expect(nextRightSibling(root, byId(root, "x3"))).toBeNull();
  });

  test("works with SVG elements", () => {
    const root = render(`
      <svg id="s"><g id="g1"><circle id="c1"></circle></g><g id="g2"><rect id="r1"></rect></g></svg>
    `);

    expect(idOf(nextRightSibling(root, byId(root, "c1")))).toBe("r1");
  });
});
```


