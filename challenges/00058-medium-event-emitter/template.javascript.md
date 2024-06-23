```js index.js
export class EventEmitter {
  
}
```

```js index.test.js
import { EventEmitter } from './index';

describe('EventEmitter class', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it('should subscribe to events and emit them', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('event1', callback1);
    emitter.on('event1', callback2);

    emitter.emit('event1');

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  it('should unsubscribe from events', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.on('event1', callback1);
    emitter.on('event1', callback2);

    emitter.off('event1', callback1);

    emitter.emit('event1');

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  it('should emit events with arguments', () => {
    const callback = jest.fn();

    emitter.on('event1', callback);

    emitter.emit('event1', 'arg1', 'arg2');

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should not fail when unsubscribing from non-existing event', () => {
    const callback = jest.fn();

    emitter.off('non_existing_event', callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not fail when emitting non-existing event', () => {
    const callback = jest.fn();

    emitter.on('event1', callback);

    emitter.emit('non_existing_event');

    expect(callback).not.toHaveBeenCalled();
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


