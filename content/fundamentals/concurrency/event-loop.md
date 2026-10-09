---
title: "Event Loop"
summary: "A single thread running tasks from a queue, as in JavaScript and asyncio."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["JavaScript event loop", "asyncio event loop", "event loop model", "task queue", "message loop"]
prereqs: ["callback", "promise"]
related: ["microtask-macrotask", "blocking-vs-non-blocking", "async-await", "node-js", "callback-hell", "web-worker"]
core: [backend, frontend]
---

JavaScript runs your code on **one thread**. Yet it can wait for network requests, timers and clicks, without freezing. The mechanism is the **event loop**: a
loop that takes tasks from queues and runs each to completion, one at a time.

```
┌────────────┐   run to completion   ┌─────────────────────┐
│ call stack │ ◄──────────────────── │ event loop picks    │
└────────────┘                       │ next task from the  │
                                     │ queues              │
 timers, network, clicks ──► queues ─►                     │
                                     └─────────────────────┘
```

When you call `fetch(...)` or `setTimeout(...)`, the work happens outside your code (in the browser or runtime). When it finishes, a **callback is put in a queue**. The event
loop runs it only when the stack is empty.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A, D, C, B
```

Output order: the synchronous code first (`A`, `D`). Then promise callbacks (a *microtask* queue, higher priority), then timers (a *task* queue). Even a 0 ms timer waits its turn
([microtasks vs macrotasks](/t/microtask-macrotask)).

## The big consequence: don't block the loop

Because everything shares one thread, **a long synchronous operation freezes everything**:

```js
button.onclick = () => {
  for (let i = 0; i < 5_000_000_000; i++) {}    // the page can't scroll, click or repaint meanwhile
};
```

In a browser the UI hangs. In a Node.js server, **every other request waits**. Keep handlers short: use async I/O ([blocking vs non-blocking](/t/blocking-vs-non-blocking)), split big
work into chunks, or move it to a [worker](/t/web-worker).

## Not unique to JavaScript

Python's `asyncio` uses the same design. A coroutine runs until it `await`s, and then gives control back to the loop ([async/await](/t/async-await)). A blocking call like
`time.sleep()` or a synchronous HTTP request inside an `async` function freezes the whole loop. Other runtimes (Node.js, Nginx, many UI frameworks) use event loops too.

It's a way to get **concurrency without threads**: efficient for I/O-heavy programs, and no locking between your own callbacks. It doesn't help CPU-bound work
([concurrency vs parallelism](/t/concurrency-vs-parallelism)).
