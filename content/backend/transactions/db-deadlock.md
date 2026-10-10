---
title: "Database Deadlock"
summary: "Transactions waiting on each other's locks."
levels: { backend: senior, data-engineer: senior }
aliases: ["database deadlock", "db deadlock", "deadlock in the database"]
prereqs: ["transaction", "pessimistic-locking"]
related: ["row-vs-table-lock", "mvcc", "deadlock"]
---

A **database deadlock** occurs when two transactions each hold a lock the other needs, so neither can proceed. The database detects the cycle and aborts one (the "victim"), rolling it back so the other can finish.

```text
T1: lock row A ... wants row B
T2: lock row B ... wants row A
→ deadlock; the database kills one transaction
```

Deadlocks are usually not a bug you fix but a condition you *handle*: the aborted transaction should be retried. The bigger goal is to make them rare.

The classic mistakes:

- Retrying without awareness. A deadlock aborts a transaction with a specific error; the application must catch it and retry the whole unit of work. Ignoring it means a user-visible failure that would have succeeded.
- Inconsistent lock ordering. If one transaction locks A then B and another locks B then A, a deadlock is possible. Ordering accesses the same way everywhere (e.g. always by primary key ascending) prevents most of them.
- Long transactions. The longer a transaction holds locks and does work, the wider the window for a cycle. Keep transactions short.
- Locking more than needed. Reading rows you don't write with `FOR UPDATE`, or locking a range, increases contention and deadlock probability. Lock only what you must.
- Holding locks across user or network time. A transaction that waits for a user action or a slow external call holds locks the whole time, inviting deadlocks and blocking others.
- Assuming deadlocks are rare enough to ignore. Under load they appear and, unhandled, cause intermittent failures that are hard to reproduce. Handle the retry path from day one.

**How to reduce and handle them:** access shared data in a consistent order, keep transactions short, lock narrowly, and retry aborted transactions (with backoff and a bounded number of attempts). The database will break the cycle and abort one; your job is to ensure that's a safe, retried outcome rather than an error — see [transactions](/t/transaction) and [row vs table locks](/t/row-vs-table-lock).
