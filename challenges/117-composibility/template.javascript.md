```js index.js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

export { User };
```

```js index.test.js
import { User } from "./index";

describe("User constructor", () => {
  test("should correctly calculate age", () => {
    const user = new User("Pawan Kumar", new Date(1993, 1, 29));

    expect(user.age).toBe(31);
  });

  test("should update age if birthday is updated", () => {
    let person = new User("Pawan Kumar", new Date(1995, 6, 15)); // July 15, 1995
    expect(person.age).toBe(29);

    // Update the birthday
    person.birthday = new Date(2000, 6, 15); // July 15, 2000
    expect(person.age).toBe(24);
  });
});
```
