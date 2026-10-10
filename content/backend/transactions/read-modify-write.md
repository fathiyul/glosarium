---
title: "Read-Modify-Write Race"
summary: "Reading a value, changing it in code and writing it back while someone else does the same."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["read-modify-write", "read modify write", "check then act"]
prereqs: ["race-condition", "transaction"]
related: ["lost-update", "atomic-update", "optimistic-locking", "pessimistic-locking"]
---

A **read-modify-write** is the pattern of reading a value, computing a new one from it, and writing it back. It's everywhere — incrementing a counter, adjusting a balance, updating a status — and it contains a **race window** between the read and the write where another request can interleave.

```text
read  → [window] → modify → write
        ^ another request can change the value here
```

If two requests pass through the window with the same starting value, one update is lost (see [lost update](/t/lost-update)). If the logic is a "check then act" (check the balance, then deduct), both can pass the check before either writes, overspending.

The fix depends on the shape:

- Pure arithmetic on a stored value → fold it into one statement (see [atomic update](/t/atomic-update)).
- A decision based on current state → lock the row (`FOR UPDATE`), or use optimistic locking with a version and retry (see [optimistic locking](/t/optimistic-locking)).
- A guard that must hold → make the guard part of the update's `WHERE` (`... WHERE status = 'open'`), and check that a row was affected.

The classic mistakes:

- Assuming it's safe because it's "one user at a time". Concurrency comes from many users, retries, background jobs and duplicate requests — not just obvious simultaneity. The race is real even at modest scale.
- Check-then-act without a lock or conditional write. The most common shape of the bug: "is there stock? yes → decrement" in two steps. Under load, stock goes negative.
- Ignoring the affected-row count. A conditional `UPDATE` that matches zero rows means the guard failed (someone changed the state) — the code must handle that, not assume success.
- Locking after reading. Locking the row *after* you've read it doesn't help; another transaction may already have changed it. Lock before, or use optimistic versioning.
- Confusing it with a client-side race. The same pattern in a browser or a distributed system (read, then send a request) has a similar window; the fix may be a conditional request or a server-side check.

**How to handle it:** treat every read-modify-write as a potential race. Prefer a single atomic statement; where logic requires reading first, add a lock or a version check and handle the failure path. It's the same discipline as check-then-act in [concurrent programming](/t/check-then-act), applied at the database.
