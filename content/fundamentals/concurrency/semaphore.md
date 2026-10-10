---
title: "Semaphore"
summary: "A counter limiting how many tasks can use a resource at once."
levels: { backend: senior, data-engineer: senior }
aliases: ["semaphore", "counting semaphore", "binary semaphore"]
prereqs: ["mutex", "critical-section"]
related: ["thread-safety", "thread-pool", "rate-limiting", "deadlock", "blocking-vs-non-blocking"]
---

A **Semaphore** is a counter that limits how many tasks can use a resource at the same time. A task *acquires* a permit before using the resource and *releases* it afterward. If no permits are free, the task waits. Set the count to 1 and you have a [mutex](/t/mutex); set it to N and you allow up to N concurrent users.

```text
sem = Semaphore(5)         # allow 5 at once
sem.acquire()
try:    use_limited_resource()
finally: sem.release()      # always release, even on error
```

It's the tool for "at most N at a time": a connection pool with 20 connections, limiting concurrent requests to a database, or capping how many files you process in parallel. It's a form of admission control — it doesn't make the resource faster, it stops everyone from piling onto it at once.

The classic mistakes:

- **Forgetting to release.** If a task acquires and then errors before releasing, permits leak until the semaphore is exhausted and everything blocks. Always release in a `finally`/`defer`/RAII block (as above).
- Confusing it with a mutex. A mutex is about *mutual exclusion* (one at a time, ownership); a semaphore is about *limiting count* (N at a time) and has no owner. Using the wrong one produces confusing bugs.
- No timeout or cancellation. A task waiting forever for a permit can hang the whole operation. Offer a timeout or a cancellation path so the wait can be abandoned.
- Deadlock from lock ordering. Acquiring a semaphore and then other locks in inconsistent order among tasks can deadlock. Establish a fixed order.
- Using one for backpressure by accident. A semaphore does cap concurrency, but a full queue of waiters still consumes resources. For load management, combine it with a bounded queue and clear [backpressure](/t/backpressure).

A semaphore is a small, sharp tool: it counts, waits, and wakes. Used well it protects a limited resource without locks you'd have to reason about. Used carelessly — a forgotten release — it turns into a system that mysteriously stops. Think of it as the generalisation of a lock to "up to N".
