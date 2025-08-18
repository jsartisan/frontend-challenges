```js index.js
export function instanceOfClass(obj, targetClass) {}
```

```js index.test.js
import { instanceOfClass } from "./";

class Animal {}
class Dog extends Animal {}

describe("instanceOfClass function", () => {
  test("Object is an instance of the provided class", () => {
    const dog = new Dog();
    expect(instanceOfClass(dog, Dog)).toBe(true);
  });

  test("Object is not an instance of the provided class", () => {
    const animal = new Animal();
    expect(instanceOfClass(animal, Dog)).toBe(false);
  });

  test("Object is an instance of a parent class", () => {
    const dog = new Dog();
    expect(instanceOfClass(dog, Animal)).toBe(true);
  });

  test("Object is not an instance of a parent class", () => {
    const animal = new Animal();
    expect(instanceOfClass(animal, Dog)).toBe(false);
  });

  test("Null object should not be instance of any class", () => {
    const nullObj = null;
    expect(instanceOfClass(nullObj, Object)).toBe(false);
  });
});
```
