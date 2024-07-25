```js index.js
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      console.log(this.title + ': ' + student);
    });
  }
};

export { group };
```

```js index.test.js
import { group } from './index';

describe('group.showList', () => {
  let originalLog;

  beforeAll(() => {
    originalLog = console.log;
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalLog;
  });

  test('should output the correct titles and student names', () => {
    // Capture the output
    group.showList();

    // Check the logged output
    expect(console.log).toHaveBeenCalledWith("Our Group: John");
    expect(console.log).toHaveBeenCalledWith("Our Group: Pete");
    expect(console.log).toHaveBeenCalledWith("Our Group: Alice");
  });
});
```

```json package.json
{
  "dependencies": {},
  "main": "/index.js",
  "devDependencies": {}
}
```


