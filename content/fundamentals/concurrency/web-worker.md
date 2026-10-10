---
title: "Web Worker"
summary: "Running JavaScript on a background thread in the browser."
levels: { frontend: mid-level }
aliases: ["Worker", "dedicated worker"]
prereqs: ["thread"]
related: ["thread", "thread-safety", "async-await", "blocking-vs-non-blocking"]
---

A web worker runs JavaScript on a background thread in the browser, separate from the main thread that draws the page and handles clicks. Heavy computation in a worker doesn't freeze the UI. A worker can't touch the DOM, so it's for calculations and data processing, not for updating the screen directly.

The two sides talk through messages:

```javascript
// main.js
const worker = new Worker("worker.js");
worker.postMessage({ numbers: [1, 2, 3, 4] });
worker.onmessage = (event) => {
  console.log("sum:", event.data);   // e.g. "sum: 10"
};
```

```javascript
// worker.js
self.onmessage = (event) => {
  const sum = event.data.numbers.reduce((a, b) => a + b, 0);
  self.postMessage(sum);
};
```

Messages are copied with the structured clone algorithm, so the worker gets its own copy of the data. That's safe, but copying a very large object on every message costs time.

The trade-off is overhead against responsiveness. Setting up a worker and passing messages takes effort, which isn't worth it for small tasks. For big jobs, the page stays responsive while the worker runs. Transferable objects can move a buffer to the worker without copying it, but the sender then loses access to it.

The classic mistake is posting many small messages with large payloads, or sending a whole data set when the worker only needs a few fields. Send only what the worker needs, and batch the work. For waiting on network or timers rather than computing, [async code](/t/async-await) on the main thread is usually enough.
