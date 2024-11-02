```ts index.ts 
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  
}
```

```ts index.test.ts 
import { canFinish } from './index';

describe('canFinish', () => {
  test('Example 1: Simple prerequisite', () => {
    expect(canFinish(2, [[0,1]])).toBe(true);
  });

  test('Example 2: Cycle between two courses', () => {
    expect(canFinish(2, [[0,1],[1,0]])).toBe(false);
  });

  test('No prerequisites', () => {
    expect(canFinish(3, [])).toBe(true);
  });

  test('Linear prerequisites', () => {
    expect(canFinish(4, [[1,0],[2,1],[3,2]])).toBe(true);
  });

  test('Complex cycle', () => {
    expect(canFinish(4, [[1,0],[2,1],[3,2],[0,3]])).toBe(false);
  });

  test('Multiple independent prerequisites', () => {
    expect(canFinish(4, [[1,0],[3,2]])).toBe(true);
  });

  test('Multiple prerequisites for one course', () => {
    expect(canFinish(3, [[2,0],[2,1]])).toBe(true);
  });

  test('Complex valid schedule', () => {
    expect(canFinish(6, [[1,0],[2,1],[3,2],[4,3],[5,4]])).toBe(true);
  });

  test('Self loop', () => {
    expect(canFinish(2, [[0,0]])).toBe(false);
  });

  test('Multiple cycles', () => {
    expect(canFinish(5, [[1,0],[2,1],[0,2],[4,3],[3,4]])).toBe(false);
  });
});
```


