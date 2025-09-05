Implement a function in JavaScript that takes:

1. A **list of async functions** (each returning a Promise).
2. A **callback function** to be executed after each async task finishes.

The function should:

* Start **all async tasks in parallel** (i.e., not sequentially).
* Invoke the callback **after every task is resolved or rejected**, passing in the result or error.

### Example

```js
const tasks = [
  () => Promise.resolve("Task 1 done"),
  () => new Promise((_, reject) => setTimeout(() => reject("Task 2 failed"), 100)),
  () => Promise.resolve("Task 3 done")
];

runParallel(tasks, (result) => {
  console.log("Callback received:", result);
});

/*
Expected output (order may vary since they run in parallel):
Callback received: Task 1 done
Callback received: Task 2 failed
Callback received: Task 3 done
*/
```

### Notes

* Ensure all tasks run **at the same time**.
* The callback should be invoked for **every task completion**.
* The function does not need to wait for all tasks to finish before invoking the callback—it triggers the callback as soon as each individual task completes.
