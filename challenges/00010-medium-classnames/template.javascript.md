```js index.js
export const classNames = (...args) => {
  // your answer here
};
```

```js index.test.js
// classNames.test.js

// Import the classNames implementation
const classNames = require('./');

describe('classNames utility function', () => {
  it('should concatenate strings and numbers', () => {
    expect(classNames('classname1', 'classname2', 100)).toBe('classname1 classname2 100');
  });

  it('should filter out falsy values', () => {
    expect(classNames(null, undefined, Symbol(), 1n, true, false)).toBe('');
  });

  it('should keep object keys if the key is string and the value is truthy', () => {
    const obj = new Map();
    obj.cool = '!';

    expect(classNames({ class1: [], class2: true, class3: 3 }, obj)).toBe('class2 class3 cool');
  });

  it('should flatten arrays and concatenate classNames', () => {
    const obj = new Map();
    obj.cool = '!';

    expect(classNames(['class1', [{ class2: true }, ['class3', [obj]]]])).toBe('class1 class2 class3 cool');
  });

  it('should handle string and number inputs directly', () => {
    expect(classNames('class1', 100)).toBe('class1 100');
  });

  it('should return an empty string if no arguments are provided', () => {
    expect(classNames()).toBe('');
  });
});

```


