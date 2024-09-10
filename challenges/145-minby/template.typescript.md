```ts index.ts
export function minBy<T>(array: T[], iteratee: (item: T) => number): T | undefined {
 
}
```

```ts index.test.ts
import { minBy } from './index';

describe('minBy function', () => {
  test('should return the object with the minimum value based on the iteratee', () => {
    const users = [
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'pebbles', age: 1 }
    ];

    const result = minBy(users, o => o.age);
    expect(result).toEqual({ user: 'pebbles', age: 1 });
  });

  test('should return undefined for an empty array', () => {
    const result = minBy([], o => o.age);
    expect(result).toBeUndefined();
  });

  test('should handle arrays with a single object', () => {
    const users = [{ user: 'barney', age: 36 }];
    const result = minBy(users, o => o.age);
    expect(result).toEqual({ user: 'barney', age: 36 });
  });

  test('should return the first object if all values are equal', () => {
    const users = [
      { user: 'barney', age: 36 },
      { user: 'fred', age: 36 }
    ];
    const result = minBy(users, o => o.age);
    expect(result).toEqual({ user: 'barney', age: 36 });
  });

  test('should handle negative values correctly', () => {
    const users = [
      { user: 'barney', age: -10 },
      { user: 'fred', age: -40 },
      { user: 'pebbles', age: 1 }
    ];
    const result = minBy(users, o => o.age);
    expect(result).toEqual({ user: 'fred', age: -40 });
  });
});
```

```json package.json
{
  "dependencies": {},
  "main": "/index.ts",
  "devDependencies": {
    "typescript": "^4.0.0"
  }
}
```


