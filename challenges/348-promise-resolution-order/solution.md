The code will output:
```
1
```

This is because:
1. In a Promise, only the first `resolve()` or `reject()` call takes effect
2. Once a Promise is settled (either resolved or rejected), it cannot change its state
3. In this case, `resolve(1)` is called first, so the subsequent `resolve(2)` and `reject('error')` are ignored
4. The `.then()` handler receives the value from the first `resolve(1)` call and logs it
