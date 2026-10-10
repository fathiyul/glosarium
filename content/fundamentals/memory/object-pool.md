---
title: "Object Pooling"
summary: "Reusing objects to avoid the cost of allocating new ones."
levels: { backend: senior, frontend: senior }
aliases: ["object pooling", "pool", "object pool pattern"]
prereqs: ["garbage-collection", "thread-pool"]
related: ["memory-leak", "ram", "cache-locality"]
---

**Object pooling** keeps a set of already-created objects and hands them out for reuse instead of allocating and destroying a new one each time. A caller borrows an object from the pool, uses it, and returns it. When allocation is expensive — a database connection, a large buffer, an object with heavy setup — reusing beats rebuilding.

```text
without pool: create → use → destroy → create → use → destroy ...
with pool:    borrow → use → return → borrow → use → return ...
```

The common cases:

- **Connection pools** — opening a database or network connection is costly; a pool of live connections amortises it.
- Buffer pools — reuse large byte buffers to avoid constant allocation, especially in servers handling many requests.
- Thread pools — a related idea: reuse OS [threads](/t/thread-pool) rather than spawning one per task.
- Game engines — pool frequently spawned objects (bullets, particles) to avoid garbage-collection spikes that cause frame drops.

The classic mistakes:

- Pooling cheap objects. If creation is already cheap, the pool adds bookkeeping and can *hurt*. Pool the expensive, not the trivial.
- Not resetting state. A returned object carries whatever the last user left in it. If you forget to clear it, the next borrower gets a corrupted object — a classic subtle bug. Reset on return, not just on borrow.
- Leaking from the pool. If a borrower never returns its object, the pool drains and later callers block or fail. Ensure returns happen in a `finally`/`defer`, even on error.
- Unbounded growth. A pool that grows without limit is just a leak with extra steps. Cap its size and decide what happens when it's exhausted (wait, or fail fast).
- Thread-safety. A shared pool needs correct synchronisation; a hand-rolled one easily becomes a contention point (see [thread safety](/t/thread-safety)).

Pooling trades simplicity for performance: you gain speed and steadier latency, and you take on lifecycle bookkeeping that, done wrong, creates stale-state bugs and leaks. It's worthwhile when allocation is genuinely costly or when garbage-collection pauses matter — not as a default.
