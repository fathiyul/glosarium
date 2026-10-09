---
title: "Race Condition"
summary: "A bug where the result depends on unpredictable timing."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["race conditions", "data race", "race bug", "timing bug", "concurrency bug"]
prereqs: ["concurrency-vs-parallelism"]
related: ["check-then-act", "read-modify-write", "mutex", "atomic-operation", "thread-safety", "lost-update", "unique-constraint-guard"]
core: [backend, frontend]
also: [transactions]
---

A **race condition** is a bug where the result depends on the **timing** of events that you don't control, such as which of two threads, requests or processes gets there first. Run
it a hundred times, and it works ninety-nine.

The classic example: two requests increment a counter.

```python
count = db.get("visits")        # both read 10
count = count + 1               # both compute 11
db.set("visits", count)         # both write 11  → one increment is lost
```

Expected 12, got 11. Each step is fine on its own, but the **interleaving** loses an update ([read-modify-write](/t/read-modify-write), [lost update](/t/lost-update)).

Other typical forms:

- **Check-then-act**: "if the seat is free, book it". Two users pass the check, and both book it ([check-then-act](/t/check-then-act)).
- **Double submission** creating duplicates ([double submit](/t/double-submit)).
- **Out-of-order responses** in a UI: a slow request for an old search finishes after the new one and overwrites the results.
- **Initialization**: two threads both see "not created yet" and create the resource.

## Why they're nasty

They're **non-deterministic**: they appear under load, on certain machines, or once a month, and disappear when you add a log line or attach a debugger (a "Heisenbug",
see [Heisenbugs](/t/heisenbug)). Tests pass.

## How to prevent them

| Technique | Idea |
|---|---|
| **Don't share mutable state** | Immutable data, per-request objects, message passing |
| **Make the operation atomic** | A single statement: `UPDATE visits SET n = n + 1` ([atomic update](/t/atomic-update)), atomic operations ([atomic operation](/t/atomic-operation)) |
| **Locks** | Let one at a time in ([mutex](/t/mutex)), or database locks ([pessimistic locking](/t/pessimistic-locking)) |
| **Optimistic concurrency** | Detect the conflict and retry ([optimistic locking](/t/optimistic-locking)) |
| **Let the database reject it** | A unique constraint or transaction ([unique constraint guard](/t/unique-constraint-guard)) |
| **Idempotency keys** | Make repeats harmless ([idempotency key](/t/idempotency-key)) |

## Habits

- Whenever code reads, decides and then writes, ask: *what if someone else does this between my read and my write?*
- Assume that multiple instances of your service run at once. In-process locks don't protect across machines.
- Stress test with concurrency, and review shared state ([thread safety](/t/thread-safety)).
- On the frontend, cancel or ignore stale requests.
