```ts index.ts 
/**
 * Find corresponding node in two identical DOM trees.
 */
export function findCorrespondingNode(
  rootA: Node,
  rootB: Node, 
  target: Node
): Node | null {
  // TODO: Implement me
}
```

```ts index.test.ts 
import { findCorrespondingNode } from './index';

describe('findCorrespondingNode (TS)', () => {
  let rootA: HTMLElement, rootB: HTMLElement;
  let targetA: Element, expectedB: Element;

  beforeEach(() => {
    rootA = document.createElement('div');
    rootA.innerHTML = `
      <div class="container">
        <p class="text">Hello</p>
        <span class="highlight">World</span>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    `;

    rootB = document.createElement('div');
    rootB.innerHTML = `
      <div class="container">
        <p class="text">Goodbye</p>
        <span class="highlight">Universe</span>
        <ul>
          <li>Item A</li>
          <li>Item B</li>
        </ul>
      </div>
    `;

    targetA = rootA.querySelector('.text')!;
    expectedB = rootB.querySelector('.text')!;
  });

  it('finds corresponding element at same position', () => {
    const result = findCorrespondingNode(rootA, rootB, targetA);
    expect(result).toBe(expectedB);
  });

  it('finds nested elements correctly', () => {
    const nestedTarget = rootA.querySelector('li')!;
    const nestedExpected = rootB.querySelector('li')!;
    
    const result = findCorrespondingNode(rootA, rootB, nestedTarget);
    expect(result).toBe(nestedExpected);
  });

  it('returns null for non-existent target', () => {
    const nonExistent = document.createElement('div');
    const result = findCorrespondingNode(rootA, rootB, nonExistent);
    expect(result).toBeNull();
  });

  it('handles root element as target', () => {
    const result = findCorrespondingNode(rootA, rootB, rootA);
    expect(result).toBe(rootB);
  });

  it('works with deeper nesting', () => {
    const deepTarget = rootA.querySelector('ul li:last-child')!;
    const deepExpected = rootB.querySelector('ul li:last-child')!;
    
    const result = findCorrespondingNode(rootA, rootB, deepTarget);
    expect(result).toBe(deepExpected);
  });

  it('handles single child elements', () => {
    const singleA = document.createElement('div');
    singleA.innerHTML = '<p>Single</p>';
    
    const singleB = document.createElement('div');
    singleB.innerHTML = '<p>Single</p>';
    
    const target = singleA.querySelector('p')!;
    const expected = singleB.querySelector('p')!;
    
    const result = findCorrespondingNode(singleA, singleB, target);
    expect(result).toBe(expected);
  });
});
```


