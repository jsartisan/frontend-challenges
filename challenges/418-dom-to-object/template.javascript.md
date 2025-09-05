```js index.js 
/**
 * Convert a DOM node into a plain JavaScript object representation.
 * @param {Node} node - The DOM node to convert
 * @returns {object}
 */
export function domToObject(node) {
  // TODO: Implement
  return {};
}
```

```js index.test.js 
import { domToObject } from './index';

describe('domToObject', () => {
  it('converts a simple element with no attributes', () => {
    const div = document.createElement('div');
    expect(domToObject(div)).toEqual({
      type: 'DIV',
      attributes: {},
      children: []
    });
  });

  it('converts element with attributes', () => {
    const span = document.createElement('span');
    span.setAttribute('id', 'test');
    span.setAttribute('class', 'demo');
    expect(domToObject(span)).toEqual({
      type: 'SPAN',
      attributes: { id: 'test', class: 'demo' },
      children: []
    });
  });

  it('converts element with text child', () => {
    const p = document.createElement('p');
    p.textContent = 'Hello';
    expect(domToObject(p)).toEqual({
      type: 'P',
      attributes: {},
      children: [
        { type: '#text', value: 'Hello', attributes: {}, children: [] }
      ]
    });
  });

  it('converts nested structure', () => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = 'Hi';
    div.appendChild(span);
    expect(domToObject(div)).toEqual({
      type: 'DIV',
      attributes: {},
      children: [
        {
          type: 'SPAN',
          attributes: {},
          children: [
            { type: '#text', value: 'Hi', attributes: {}, children: [] }
          ]
        }
      ]
    });
  });

  it('ignores comments', () => {
    const div = document.createElement('div');
    const comment = document.createComment('ignore');
    div.appendChild(comment);
    expect(domToObject(div)).toEqual({
      type: 'DIV',
      attributes: {},
      children: []
    });
  });
});
```


