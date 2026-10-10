---
title: "Cancellation"
summary: "Stopping in-flight async work cleanly, e.g. with AbortController or a context."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["abort", "cancel", "AbortController"]
prereqs: ["coroutine"]
related: ["blocking-vs-non-blocking", "coroutine", "timeouts", "process"]
---

Cancellation stops work that's already running, such as a network request or a background task, because its result is no longer needed. A user navigates away, a request times out, or a newer search replaces an older one. Cancelling frees the resources the work holds and stops it from doing work whose result will be thrown away.

In JavaScript, an `AbortController` signals a fetch to stop:

```javascript
const controller = new AbortController();
fetch("/api/search?q=shoes", { signal: controller.signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === "AbortError") return;   // cancelled on purpose, not a failure
    throw err;
  });

controller.abort();   // e.g. the user typed a new query
```

In Python's asyncio, `task.cancel()` raises `CancelledError` inside the task at its next `await`. The task can clean up in a `finally` block, and must re-raise the error so the cancellation completes.

The trade-off is that cancellation is cooperative. It can only interrupt work at a point where the code is waiting. A tight synchronous loop or a long CPU calculation won't stop until it returns, and a task that catches the cancellation and carries on ignores it. Cleanup also has to be correct, or half-finished writes are left behind.

The classic mistake is swallowing `CancelledError` (or the equivalent) in a broad `except` block, which makes the task refuse to stop. Let cancellation propagate, clean up in `finally`, and treat a cancelled operation as normal rather than as a failure. For time limits, see [coroutines](/t/coroutine) and the wider [blocking vs non-blocking](/t/blocking-vs-non-blocking) model.
