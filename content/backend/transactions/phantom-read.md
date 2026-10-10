---
title: "Phantom Read"
summary: "Rows appearing or vanishing between reads in one transaction."
levels: { backend: senior, data-engineer: senior }
aliases: ["phantom read", "phantom reads", "phantoms"]
prereqs: ["isolation-level", "transaction"]
related: ["non-repeatable-read", "mvcc", "write-skew", "isolation-level"]
---

A **phantom read** happens when a transaction runs a query, another transaction inserts (or deletes) rows that match the query's condition, and the first transaction runs the *same* query again and sees a different set of rows — new "phantoms".

```text
T1: SELECT COUNT(*) FROM orders WHERE total > 1000 → 5
T2: INSERT an order with total 2000; COMMIT
T1: SELECT COUNT(*) ... → 6    ← same query, new phantom row
```

It's like a [non-repeatable read](/t/non-repeatable-read), but for a *set* of rows rather than one row's value. It matters for rules like "at most 5 active bookings per user": between the check and the insert, another transaction can slip in a matching row.

Isolation levels that prevent it are the stronger ones: **Serializable** (and, depending on the database, Snapshot Isolation in some cases via range protection). At Repeatable Read, some databases prevent phantoms and some don't — behaviour varies.

The classic mistakes:

- Assuming Repeatable Read stops phantoms everywhere. Standard Repeatable Read allows phantoms; snapshot-isolation databases often prevent them, but not universally. Check your database's actual behaviour — it's a common source of confusion.
- Check-then-insert without protection. "Count matching rows, if under the limit insert" is vulnerable: the second transaction inserts a phantom between check and insert. Use a constraint, a lock, or Serializable.
- Confusing it with a non-repeatable read. Non-repeatable = one row's value changes; phantom = the *set* of matching rows changes. Different anomalies, and different levels prevent them.
- Over-relying on "no phantoms" without testing. Isolation guarantees differ by database and version; don't assume serialisable behaviour from a level's name alone.
- Ignoring the cost of preventing them. Serializable isolation prevents phantoms but increases aborts and retries. It's the strongest guarantee and the most expensive.

**How to handle it:** for set-based invariants (limits, uniqueness across a range), rely on the database: a unique/constraint, a `FOR UPDATE` lock that also blocks inserts (gap/next-key locking in some databases), or Serializable isolation with retry. Merely re-reading isn't enough. See [isolation levels](/t/isolation-level) and [write skew](/t/write-skew) for a related anomaly.
