vent emitters are a fundamental concept in JavaScript for handling asynchronous events and implementing custom event-driven architectures. They allow objects to emit named events that cause previously registered callbacks (listeners) to be called.

Implement an EventEmitter class in JavaScript that provides methods to subscribe to events (on), unsubscribe from events (off), and emit events (emit). The on method should allow multiple listeners to be registered for the same event. The off method should remove specific listeners for an event. The emit method should trigger all listeners for a given event.

Use the following example to understand how the EventEmitter class should work:

```js
const emitter = new EventEmitter();

const callback1 = () => console.log('Callback 1 called');
const callback2 = () => console.log('Callback 2 called');

// Subscribe to the 'event1' event
emitter.on('event1', callback1);
emitter.on('event1', callback2);

// Emit the 'event1' event
emitter.emit('event1');
// Output:
// Callback 1 called
// Callback 2 called

// Unsubscribe callback1 from the 'event1' event
emitter.off('event1', callback1);

// Emit the 'event1' event again
emitter.emit('event1');
// Output:
// Callback 2 called
```
