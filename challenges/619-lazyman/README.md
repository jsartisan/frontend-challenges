Some APIs let you describe a whole sequence of work in one chained expression and only start doing it once you're done describing. Think of animation builders or test runners: you queue steps, some of them wait, and everything runs in order afterwards.

Build a tiny version of that. `LazyMan(name, log)` creates a person whose actions are recorded with chained calls and then played back one at a time. Every message is reported through the `log` callback.

```ts
LazyMan("Ada", console.log).eat("toast").sleep(2).eat("soup");
// Hi, I'm Ada.
// Eating toast.
// (2 seconds pass)
// Woke up after 2s.
// Eating soup.
```

`sleepFirst` is the impatient exception. No matter where it appears in the chain, its nap happens before anything else, even the greeting:

```ts
LazyMan("Ada", console.log).eat("cake").sleepFirst(1);
// (1 second passes)
// Woke up after 1s.
// Hi, I'm Ada.
// Eating cake.
```

**Requirements**

- `LazyMan(name, log)` queues the greeting `` `Hi, I'm ${name}.` `` as the first regular step.
- `eat(food)` queues `` `Eating ${food}.` ``.
- `sleep(seconds)` queues a pause. When the pause is over it logs `` `Woke up after ${seconds}s.` `` and only then does the next step run.
- `sleepFirst(seconds)` works like `sleep`, but the pause runs before the greeting and every other regular step. Several `sleepFirst` calls run in the order they were made.
- Every method returns the same object, so calls can be chained.
- Nothing runs synchronously. Playback starts after the current chain of calls has finished, so a `sleepFirst` at the end of the chain still counts.
- Steps run strictly one after another. Two sleeps add up, they don't overlap.
- Each `LazyMan` call has its own independent queue.
