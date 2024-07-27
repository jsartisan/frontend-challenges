Consider the following code:

```
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
  }
};

group.showList();
```

If you run the above code, you will see an error saying "Error: Cannot read property 'title' of undefined". Why does this error occur?

Can you modify the callback function of forEach so that it works correctly without any errors?
