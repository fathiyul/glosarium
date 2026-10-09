---
title: "Microtasks vs Macrotasks"
summary: "Why promise callbacks run before setTimeout callbacks."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["microtasks", "macrotasks", "microtask queue", "task queue vs microtask queue", "queueMicrotask"]
prereqs: ["event-loop", "promise"]
related: ["event-loop", "async-await", "promise", "callback", "blocking-vs-non-blocking", "mutation-observer"]
core: [frontend]
---

The [event loop](/t/event-loop) has more than one queue. **Microtasks** and **macrotasks** (just "tasks") get different priority, which explains why a resolved promise's callback runs before a `setTimeout(..., 0)` callback.

| Queue | What goes in it |
|---|---|
| **Microtasks** | Promise callbacks (`.then`, and code after `await`), `queueMicrotask`, `MutationObserver` |
| **Macrotasks (tasks)** | `setTimeout`, `setInterval`, UI events (clicks), I/O callbacks, `postMessage` |

## The rule

After **each** macrotask finishes (and whenever the call stack empties), the engine runs **all** pending microtasks, including any new ones they add, **before** moving to the next macrotask or letting the browser render.

```js
console.log("1: sync");
setTimeout(() => console.log("4: macrotask"), 0);
Promise.resolve().then(() => console.log("3: microtask"));
console.log("2: sync");
// 1, 2, 3, 4
```

The synchronous lines run first. Then microtasks (the promise). Then the next macrotask (the timer).

`await` is built on promises, so the code after an `await` is a microtask:

```js
async function f() {
  console.log("a");
  await null;
  console.log("c");     // a microtask
}
f();
console.log("b");
// a, b, c
```

(Node.js has two more special cases: `process.nextTick` callbacks run even before promise microtasks, and `setImmediate` has its own phase.)

## Consequences

- **Microtasks can starve everything else.** A microtask that schedules another microtask forever blocks timers, events and rendering, because the queue never empties.
  An endless `Promise.resolve().then(loop)` freezes the page.
- **Rendering happens between macrotasks**, not between microtasks. If you want the browser to paint before continuing, yield with a macrotask (`setTimeout`) or `requestAnimationFrame`.
- **Ordering bugs**: code that "usually works" can depend on whether a callback was a microtask or a task. Know which you're using.
- **Predictable promise chains**: the order of `.then` callbacks follows the order they were queued.

Python's `asyncio` has a related model (a ready queue run by the loop), but without the microtask/macrotask distinction. This is mainly a JavaScript topic.
