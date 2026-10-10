---
title: "Lost Update"
summary: "Two writers overwriting each other's changes."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["lost update", "lost updates", "concurrent update"]
prereqs: ["read-modify-write", "transaction"]
related: ["atomic-update", "optimistic-locking", "pessimistic-locking", "race-condition"]
---

A **lost update** happens when two transactions read the same value, both modify it, and both write back — so the second write overwrites the first, and one update is silently lost. The classic case is a counter.

```text
T1: read 10 → compute 11
T2: read 10 → compute 11
T1: write 11
T2: write 11        ← T1's update is lost; correct value was 12
```

Both transactions were internally correct; the problem is the gap between the read and the write, where the other transaction slipped in (see [read-modify-write](/t/read-modify-write)).

There are three standard fixes:

- Atomic update — do it in one statement (`SET x = x + 1`), so there's no gap (see [atomic update](/t/atomic-update)).
- Pessimistic locking — lock the row before reading (`SELECT ... FOR UPDATE`), so others wait.
- Optimistic locking — include a version (or the old value) in the `WHERE`, and retry if no row was updated, detecting that someone changed it.

```sql
UPDATE items SET qty = qty - 1 WHERE id = 7 AND qty >= 1;  -- atomic
UPDATE items SET qty = 8, version = version + 1 WHERE id = 7 AND version = 3; -- optimistic
```

The classic mistakes:

- Assuming a transaction prevents it. A transaction alone doesn't stop lost updates unless you lock the row or use a suitable isolation level. The read-modify-write inside each transaction still races.
- Reading then writing in two statements by default. This is the default shape in a lot of code and the reason lost updates are so common. Prefer the single-statement form.
- Optimistic locked but never retried. If the `WHERE version = ?` matches nothing, the update changed nothing — you must detect that and retry, or the change silently vanishes.
- Locking too broadly. Pessimistic locking a whole table (or many rows) serialises everything; lock the specific row you need.
- Forgetting inventory-style guards. Decrementing stock without a `WHERE qty >= n` guard lets stock go negative under concurrency.

**How to avoid it:** for counters and simple arithmetic, an atomic update; for read-decide-write logic, optimistic locking with retry or a targeted `FOR UPDATE` lock. Recognise the read-modify-write pattern and treat it as a hazard. See [transactions](/t/transaction) and [isolation levels](/t/isolation-level).
