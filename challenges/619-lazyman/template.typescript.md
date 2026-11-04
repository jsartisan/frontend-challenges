```ts index.ts 
export interface LazyPerson {
  eat(food: string): LazyPerson;
  sleep(seconds: number): LazyPerson;
  sleepFirst(seconds: number): LazyPerson;
}

export function LazyMan(name: string, log: (message: string) => void): LazyPerson {}
```

```ts index.test.ts 
import { LazyMan } from "./index";

describe("LazyMan", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Lets pending zero-delay timers and promise callbacks run.
  const flush = async () => {
    for (let i = 0; i < 20; i++) {
      jest.advanceTimersByTime(0);
      await Promise.resolve();
    }
  };

  // Lets queued work start, moves the clock forward, then lets whatever became ready run.
  const tick = async (ms: number) => {
    await flush();
    jest.advanceTimersByTime(ms);
    await flush();
  };

  const messages = (log: jest.Mock) => log.mock.calls.map(([m]) => m);

  test("greets, but not before the current chain is finished", async () => {
    const log = jest.fn();
    LazyMan("Ada", log);

    expect(log).not.toHaveBeenCalled();

    await flush();
    expect(messages(log)).toEqual(["Hi, I'm Ada."]);
  });

  test("every method returns the same object so calls can be chained", () => {
    const person = LazyMan("Ada", jest.fn());

    expect(person.eat("toast")).toBe(person);
    expect(person.sleep(1)).toBe(person);
    expect(person.sleepFirst(1)).toBe(person);
  });

  test("eats in the order the calls were made", async () => {
    const log = jest.fn();
    LazyMan("Linus", log).eat("toast").eat("soup");

    await flush();
    expect(messages(log)).toEqual(["Hi, I'm Linus.", "Eating toast.", "Eating soup."]);
  });

  test("sleep pauses everything queued after it", async () => {
    const log = jest.fn();
    LazyMan("Grace", log).eat("rice").sleep(2).eat("mango");

    await flush();
    expect(messages(log)).toEqual(["Hi, I'm Grace.", "Eating rice."]);

    await tick(1999);
    expect(messages(log)).toEqual(["Hi, I'm Grace.", "Eating rice."]);

    await tick(1);
    expect(messages(log)).toEqual([
      "Hi, I'm Grace.",
      "Eating rice.",
      "Woke up after 2s.",
      "Eating mango.",
    ]);
  });

  test("sleeps run one after another, not at the same time", async () => {
    const log = jest.fn();
    LazyMan("Alan", log).sleep(1).sleep(3).eat("pie");

    await tick(1000);
    expect(messages(log)).toEqual(["Hi, I'm Alan.", "Woke up after 1s."]);

    await tick(2000);
    expect(messages(log)).toEqual(["Hi, I'm Alan.", "Woke up after 1s."]);

    await tick(1000);
    expect(messages(log)).toEqual([
      "Hi, I'm Alan.",
      "Woke up after 1s.",
      "Woke up after 3s.",
      "Eating pie.",
    ]);
  });

  test("sleepFirst runs before the greeting, wherever it is called", async () => {
    const log = jest.fn();
    LazyMan("Ada", log).eat("cake").sleepFirst(1);

    await flush();
    expect(log).not.toHaveBeenCalled();

    await tick(1000);
    expect(messages(log)).toEqual(["Woke up after 1s.", "Hi, I'm Ada.", "Eating cake."]);
  });

  test("several sleepFirst calls run in the order they were made", async () => {
    const log = jest.fn();
    LazyMan("Ada", log).sleepFirst(1).eat("salad").sleep(1).sleepFirst(2).eat("soup");

    await tick(1000);
    expect(messages(log)).toEqual(["Woke up after 1s."]);

    await tick(1999);
    expect(messages(log)).toEqual(["Woke up after 1s."]);

    await tick(1);
    expect(messages(log)).toEqual([
      "Woke up after 1s.",
      "Woke up after 2s.",
      "Hi, I'm Ada.",
      "Eating salad.",
    ]);

    await tick(1000);
    expect(messages(log)).toEqual([
      "Woke up after 1s.",
      "Woke up after 2s.",
      "Hi, I'm Ada.",
      "Eating salad.",
      "Woke up after 1s.",
      "Eating soup.",
    ]);
  });

  test("separate people keep separate schedules", async () => {
    const sleepy = jest.fn();
    const hungry = jest.fn();

    LazyMan("Sleepy", sleepy).sleep(5).eat("bread");
    LazyMan("Hungry", hungry).eat("bread");

    await flush();
    expect(messages(sleepy)).toEqual(["Hi, I'm Sleepy."]);
    expect(messages(hungry)).toEqual(["Hi, I'm Hungry.", "Eating bread."]);

    await tick(5000);
    expect(messages(sleepy)).toEqual(["Hi, I'm Sleepy.", "Woke up after 5s.", "Eating bread."]);
  });
});
```


