---
title: "Callback"
summary: "A function passed in to be called when work finishes."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["callbacks", "callback function", "completion handler"]
prereqs: ["function", "first-class-function"]
related: ["promise", "async-await", "callback-hell", "event-loop", "higher-order-function"]
---

A callback is a function you pass to another function, to be called later, when something finishes or happens.

```js
setTimeout(() => console.log("a second later"), 1000);

button.addEventListener("click", () => save());

fs.readFile("data.txt", (err, text) => {       // Node style: (error, result)
  if (err) return console.error(err);
  console.log(text);
});
```

The caller says "here's what to do when you're done", and gets on with other work. That's how JavaScript handles waiting without freezing ([event loop](/t/event-loop)).

Callbacks also appear in synchronous code: `array.map(fn)`, `sorted(key=fn)`.

## Rules to know

- **Pass the function, don't call it**: `setTimeout(save, 1000)`, not `setTimeout(save(), 1000)`.
- **Errors need a plan.** An exception inside a callback doesn't reach the code that registered it. Node's convention is to pass the error as the first argument.
- **`this` can change** inside a callback ([this and self](/t/this-self)).
- **Call it once.** A callback invoked twice, or never, causes subtle bugs.
- **Order**: don't assume that a callback runs before the code after the call. It usually runs later.

## The downside

Chaining several dependent steps makes nested code that's hard to follow and hard to handle errors in ([callback hell](/t/callback-hell)). Modern code usually wraps asynchronous work in [promises](/t/promise) and uses [async/await](/t/async-await), keeping callbacks for events and simple hooks.
