---
title: "ACID"
summary: "Atomicity, Consistency, Isolation, Durability."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["ACID properties", "ACID transactions", "ACID compliance", "atomicity consistency isolation durability"]
prereqs: ["transaction"]
related: ["atomicity", "isolation-level", "mvcc", "wal", "distributed-transaction", "sql-vs-nosql"]
core: [backend]
---

**ACID** names the four guarantees that a reliable database transaction provides. They're why you can trust a relational database with money.

| Letter | Property | Meaning |
|---|---|---|
| **A** | **Atomicity** | A transaction is **all or nothing**. If any step fails, everything is rolled back ([atomicity](/t/atomicity)) |
| **C** | **Consistency** | A transaction takes the database from one **valid state to another**: constraints (keys, uniqueness, checks) always hold |
| **I** | **Isolation** | **Concurrent** transactions don't see each other's half-finished work. It behaves *as if* they ran one at a time (to a degree you choose, see [isolation levels](/t/isolation-level)) |
| **D** | **Durability** | Once **committed**, the change survives crashes and power loss (the database writes to a log on disk before saying "done", see [WAL](/t/wal)) |

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;          -- both changes happen, or neither (A); the total stays valid (C); no one sees only half (I); it survives a crash (D)
```

## Nuances worth knowing

- **Consistency** in ACID is about the database's own rules. It isn't the same as "consistency" in distributed systems (all replicas agree), which is a different concept.
- **Isolation is a spectrum.** Full serializable isolation is the strongest and slowest. Most databases default to weaker levels (read committed, repeatable read), which allow some anomalies such as non-repeatable reads, phantom reads and lost updates ([dirty reads](/t/dirty-read), [lost updates](/t/lost-update), [write skew](/t/write-skew)). You need to know what yours guarantees.
- **Durability** depends on configuration. Settings that skip flushing to disk trade safety for speed.
- **ACID covers one database.** Across several services or databases, you need other approaches ([distributed transactions](/t/distributed-transaction), sagas).

## ACID and NoSQL

Traditional relational databases are ACID. Many NoSQL systems relax some guarantees for scale or availability. Some offer ACID within a single record or partition, and many modern ones also support multi-document transactions. Check the specific guarantees instead of assuming
by category ([SQL vs NoSQL](/t/sql-vs-nosql)).

If someone says "use a database with ACID", they mean: *don't lose or corrupt my data when things fail or run at the same time.*
