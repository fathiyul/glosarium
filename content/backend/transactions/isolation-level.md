---
title: "Isolation Levels"
summary: "Read uncommitted, read committed, repeatable read and serializable."
levels: { backend: senior, data-engineer: senior }
aliases: ["transaction isolation levels", "read committed", "repeatable read", "serializable", "read uncommitted", "isolation levels"]
prereqs: ["acid", "transaction"]
related: ["dirty-read", "non-repeatable-read", "phantom-read", "lost-update", "write-skew", "mvcc", "optimistic-locking"]
core: [backend]
---

**Isolation** is the "I" in [ACID](/t/acid): how much concurrent transactions are protected from seeing each other's in-progress work. Perfect isolation (as if transactions ran one at a time) is the most expensive, so databases offer **levels** that trade safety for throughput. Choosing and understanding the level is a core senior skill, because the weaker levels allow real bugs.

## The anomalies they differ on

| Anomaly | What happens |
|---|---|
| **[Dirty read](/t/dirty-read)** | You read data another transaction hasn't committed (and may roll back) |
| **[Non-repeatable read](/t/non-repeatable-read)** | You read a row twice in one transaction and get different values, because someone committed a change in between |
| **[Phantom read](/t/phantom-read)** | You run the same query twice and get different **sets of rows**, because someone inserted or deleted matching rows |
| **[Lost update](/t/lost-update)** | Two transactions read, then both write based on the old value, and one overwrites the other |
| **[Write skew](/t/write-skew)** | Two transactions each read overlapping data and write *different* rows, producing a state neither alone would allow (two doctors both going off-call) |

## The standard levels

| Level | Dirty read | Non-repeatable read | Phantom |
|---|---|---|---|
| Read uncommitted | possible | possible | possible |
| **Read committed** | prevented | possible | possible |
| **Repeatable read** | prevented | prevented | possible (by the standard) |
| **Serializable** | prevented | prevented | prevented |

The standard's table is a simplification. **Actual behavior varies by database.**

- **PostgreSQL**: the default is **read committed**. Its "repeatable read" is snapshot isolation (it also prevents phantoms, but allows write skew), and **serializable** uses serializable snapshot isolation, which detects dangerous patterns and aborts one transaction. "Read uncommitted" behaves like read committed.
- **MySQL (InnoDB)**: the default is **repeatable read**, implemented with snapshots and locking, with its own details around phantoms and locking reads.
- Others differ again (SQL Server, Oracle, and distributed databases with their own models).

Most use **MVCC** (multi-version concurrency control): readers see a consistent snapshot without blocking writers ([MVCC](/t/mvcc)).

## How to choose

- **Read committed** is the usual default: good performance, and fine for many operations, but you must handle read-modify-write races yourself.
- **Repeatable read / snapshot** gives a consistent view for reports and multi-step reads.
- **Serializable** is the safest, and costs throughput and **serialization failures** that your code must **retry**.

```sql
BEGIN ISOLATION LEVEL SERIALIZABLE;
-- ... read, decide, write ...
COMMIT;   -- may fail with a serialization error: catch it and retry the whole transaction
```

## Practical advice

- **Know your database's default and its actual guarantees.** Read the documentation, not the generic table.
- **Higher isolation isn't the only fix.** Targeted tools solve many races more cheaply: atomic statements, `SELECT ... FOR UPDATE` ([pessimistic locking](/t/pessimistic-locking)), optimistic version checks ([optimistic locking](/t/optimistic-locking)), unique constraints ([constraint guards](/t/unique-constraint-guard)).
- **Keep transactions short**, since long ones increase conflicts and bloat.
- **Always be ready to retry** on deadlocks and serialization failures.
- **Test concurrency** explicitly. These bugs don't show up in single-threaded tests.
