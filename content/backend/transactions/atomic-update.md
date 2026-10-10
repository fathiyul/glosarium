---
title: "Atomic Update"
summary: "Letting the database do the change in one statement, like SET stock = stock - 1."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["atomic update", "atomic increment", "in-place update"]
prereqs: ["transaction", "atomicity"]
related: ["lost-update", "read-modify-write", "atomic-operation"]
---

An **atomic update** computes and writes a value in a single database statement, so no other transaction can slip in between the read and the write. Instead of reading a value into your application, changing it, and writing it back, you tell the database to change it in place.

```sql
-- safe: one statement, no race window
UPDATE accounts SET balance = balance - 100 WHERE id = 1;

-- unsafe: read then write, two steps
-- balance = SELECT balance ...; then UPDATE ... SET balance = <computed>
```

The unsafe two-step is a [read-modify-write](/t/read-modify-write) with a race window: two concurrent requests both read the same balance and both write, losing one update (see [lost update](/t/lost-update)). The single-statement form closes that window because the database does the read and write atomically.

The classic mistakes:

- Reading into the app, computing, writing back. The most common lost-update bug. If the value depends on its current state, update it in one statement (`SET x = x + 1`), or lock the row.
- Believing a transaction alone fixes it. A transaction gives atomicity to the whole unit, but two transactions can still interleave their read-modify-write unless they lock the row or use a higher isolation level. The single statement is simpler and safer.
- Guarding with a check instead of a condition. "Check the balance is sufficient, then update" in two steps can still overspend under concurrency unless the check is part of the update (`... WHERE balance >= 100`).
- Forgetting the guard in the `WHERE`. An atomic update that ignores feasibility can drive a value negative or violate a rule. Fold the condition into the statement.
- Assuming one statement means one round trip under load. It does for the caller, but it still takes a row lock briefly; heavy contention on one row serialises updates to it — expected for a shared counter.

**How to use it:** whenever a write depends on the current value, express it as one statement: `SET count = count + 1`, `SET balance = balance - amount WHERE balance >= amount`. It's the simplest, cheapest way to be correct under concurrency, and it avoids the whole class of lost-update bugs. See [transactions](/t/transaction).
