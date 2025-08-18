<!--info-header-start--><h1>Event Emitter <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23javascript-999" alt="#javascript"/> <img src="https://img.shields.io/badge/-%23events-999" alt="#events"/></h1><blockquote><p>by Pawan Kumar <a href="https://github.com/jsartisan" target="_blank">@jsartisan</a></p></blockquote><p><a href="https://frontend-challenges.com/challenges/58-event-emitter" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-0d99ff?logo=javascript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Event emitters are a fundamental concept in JavaScript for handling asynchronous events and implementing custom event-driven architectures. They allow objects to emit named events that cause previously registered callbacks (listeners) to be called.

Implement an EventEmitter class in JavaScript that provides methods to subscribe to events (on), unsubscribe from events (off), and emit events (emit). The on method should allow multiple listeners to be registered for the same event. The off method should remove specific listeners for an event. The emit method should trigger all listeners for a given event.

Use the following example to understand how the EventEmitter class should work:

```js
const emitter = new EventEmitter();

const callback1 = () => console.log("Callback 1 called");
const callback2 = () => console.log("Callback 2 called");

// Subscribe to the 'event1' event
emitter.on("event1", callback1);
emitter.on("event1", callback2);

// Emit the 'event1' event
emitter.emit("event1");
// Output:
// Callback 1 called
// Callback 2 called

// Unsubscribe callback1 from the 'event1' event
emitter.off("event1", callback1);

// Emit the 'event1' event again
emitter.emit("event1");
// Output:
// Callback 2 called
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues/new?template=answer.md&labels=answer,58,undefined&title=58%20-%20Event%20Emitter%20-%20undefined&body=" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://github.com/jsartisan/frontend-challenges/issues?q=label%3A58+label%3Aanswer+sort%3Areactions-%2B1-desc" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
