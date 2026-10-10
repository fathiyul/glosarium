---
title: "Non-Repeatable Read"
summary: "Reading the same row twice and getting different values."
levels: { backend: senior, data-engineer: senior }
aliases: ["non-repeatable read", "unrepeatable read", "non repeatable reads"]
prereqs: ["isolation-level", "transaction"]
related: ["mvcc", "phantom-read", "dirty-read"]
---

A **non-repeatable read** happens when a transaction reads a row, another transaction commits an update to it, and the first transaction reads it again and sees a *different value* — within the same transaction.

```text
T1: SELECT balance → 100
T2: UPDATE balance = 50; COMMIT
T1: SELECT balance → 50     ← same transaction, different value
```

The data was committed (unlike a [dirty read](/t/dirty-read)), but the transaction's view isn't stable. Any logic that reads, decides, and reads again can produce inconsistent results.

Isolation levels address it: **Read Committed** allows non-repeatable reads; **Repeatable Read** (and snapshot-based levels) prevent them by giving the transaction a stable view of the rows it reads (see [MVCC](/t/mvcc)).

The classic mistakes:

- Doing a read-decide-read in one transaction at Read Committed. The value can change between the two reads, so your decision is based on stale data. Use a higher isolation level, or lock the row.
- Confusing it with a lost update. A non-repeatable read is about *reading* an inconsistent value; a [lost update](/t/lost-update) is about *overwriting* one. They can happen together but are distinct.
- Assuming Repeatable Read is free. Higher isolation can increase aborts (the transaction may need to fail and retry if its snapshot can't be reconciled). It's a trade, not a strict upgrade.
- Expecting it from a single query. Within one query, the statement sees a consistent snapshot even at Read Committed in many databases; non-repeatable reads concern *multiple* statements across time.
- Forgetting that your own transaction's current views can shift. Even with snapshot isolation, note that a transaction may or may not see effects of writes it made — details vary by database.

**How to handle it:** if a transaction must see a stable value across several statements, use a snapshot-based isolation level (Repeatable Read / Snapshot) or lock the relevant rows. If you only need the current value once, Read Committed is fine. Know which reads must be repeatable, and set isolation accordingly — see [isolation levels](/t/isolation-level) and [phantom reads](/t/phantom-read).
