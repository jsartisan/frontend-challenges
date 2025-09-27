```js index.js 
/**
 * Simple DOM wrapper with method chaining support.
 * @param {string} selector - CSS selector
 * @returns {object} wrapper with chainable methods
 */
function $(selector) {
  // TODO: Implement me
}

export { $ };
```

```js index.test.js 
import { $ } from './index';

// Mock DOM environment for testing
beforeEach(() => {
  document.body.innerHTML = `
    <div id="test">Hello</div>
    <button class="btn">Click me</button>
    <span class="btn">Another button</span>
  `;
});

describe('$ jQuery-like wrapper (JS)', () => {
  it('selects element by id', () => {
    const element = $('#test');
    expect(element).toBeDefined();
  });

  it('applies single CSS property', () => {
    $('#test').css('color', 'red');
    expect(document.getElementById('test').style.color).toBe('red');
  });

  it('supports method chaining', () => {
    $('#test')
      .css('color', 'blue')
      .css('backgroundColor', 'yellow')
      .css('fontSize', '20px');

    const element = document.getElementById('test');
    expect(element.style.color).toBe('blue');
    expect(element.style.backgroundColor).toBe('yellow');
    expect(element.style.fontSize).toBe('20px');
  });

  it('selects multiple elements by class', () => {
    $('.btn').css('color', 'green');
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      expect(btn.style.color).toBe('green');
    });
  });

  it('handles non-existent selector gracefully', () => {
    expect(() => $('#nonexistent').css('color', 'red')).not.toThrow();
  });

  it('returns wrapper instance for chaining', () => {
    const wrapper = $('#test').css('color', 'red');
    expect(wrapper).toBeDefined();
    expect(typeof wrapper.css).toBe('function');
  });
});
```

```ts index.ts 
interface CSSWrapper {
  css(property: string, value: string): CSSWrapper;
}

export function $(selector: string): CSSWrapper {
  // TODO: Implement me
  return {
    css: () => $ as any
  };
}
```

```ts index.test.ts 
import { $ } from './index';

beforeEach(() => {
  document.body.innerHTML = `
    <div id="test">Hello</div>
    <button class="btn">Click me</button>
    <span class="btn">Another button</span>
  `;
});

describe('$ jQuery-like wrapper (TS)', () => {
  it('selects element by id', () => {
    const element = $('#test');
    expect(element).toBeDefined();
  });

  it('applies single CSS property', () => {
    $('#test').css('color', 'red');
    expect(document.getElementById('test')!.style.color).toBe('red');
  });

  it('supports method chaining', () => {
    $('#test')
      .css('color', 'blue')
      .css('backgroundColor', 'yellow')
      .css('fontSize', '20px');

    const element = document.getElementById('test')!;
    expect(element.style.color).toBe('blue');
    expect(element.style.backgroundColor).toBe('yellow');
    expect(element.style.fontSize).toBe('20px');
  });

  it('selects multiple elements by class', () => {
    $('.btn').css('color', 'green');
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      expect(btn.style.color).toBe('green');
    });
  });

  it('handles invalid selector gracefully', () => {
    expect(() => $('#nonexistent').css('color', 'red')).not.toThrow();
  });

  it('returns chainable wrapper', () => {
    const wrapper = $('#test').css('color', 'red');
    expect(wrapper).toBeDefined();
    expect(typeof wrapper.css).toBe('function');
  });
});
```


