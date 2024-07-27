```js index.js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

export { User };
```

```js index.test.js
import { User } from './index';

describe('User constructor', () => {
  test('should correctly calculate age', () => {
    const user = new User("Pawan Kumar", new Date(1993, 1, 29));
    const currentYear = new Date().getFullYear();
    const expectedAge = currentYear - 1993 - (new Date().getMonth() < 1 || (new Date().getMonth() === 1 && new Date().getDate() < 29) ? 1 : 0);
    expect(user.age).toBe(expectedAge);
  });

  test('should update age if birthday is updated', () => {
    let person = new User("Pawan Kumar", new Date(1995, 6, 15)); // July 15, 1995
    expect(person.age).toBe(28); // Assuming current year is 2024

    // Update the birthday
    person.birthday = new Date(2000, 6, 15); // July 15, 2000
    expect(person.age).toBe(23); // The new age should reflect the updated birthday
  });
});
```


