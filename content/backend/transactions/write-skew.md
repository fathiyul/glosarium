---
title: "Write Skew"
summary: "Two transactions reading the same data and making conflicting writes."
levels: { backend: senior, data-engineer: senior }
aliases: ["write skew", "write skew anomaly", "write-skew"]
prereqs: ["isolation-level", "mvcc"]
related: ["phantom-read", "snapshot-isolation", "lost-update"]
---

**Write skew** is a subtle anomaly where two transactions each read a set of rows, decide their action is safe, and write to *different* rows — so each maintains the invariant on its own, but together they break it. It's not a lost update (they write different rows) and it's not a phantom (no new rows). It's a read-based decision that's invalid once the other write is considered.

The classic example: an on-call rule says at least one doctor must remain on shift. Two doctors, both on shift, each go off duty:

```text
T1: reads "2 on shift" → decides it's safe to go off → sets self off
T2: reads "2 on shift" → decides it's safe to go off → sets self off
result: 0 on shift — invariant broken, neither transaction was "wrong"
```

Neither transaction wrote the row the other read, so MVCC/snapshot isolation allows both. Preventing it needs **serializable** isolation (or explicit locking of the rows you read, e.g. `FOR UPDATE` / `SELECT ... FOR SHARE`).

The classic mistakes:

- Assuming snapshot isolation prevents it. Snapshot isolation prevents lost updates and non-repeatable reads but *not* write skew. It's the anomaly most often missed because both transactions look locally correct.
- Not locking what you read. If a decision depends on a set of rows, and you write based on it, you must lock those rows (or use serializable isolation) so the set can't change underneath.
- Testing single-threaded and never seeing it. Write skew only appears under concurrency and specific interleavings; it hides in development and surfaces in production.
- Confusing it with a constraint that would stop it. A database `CHECK`/unique constraint can sometimes enforce the invariant directly; if it can, use it — it's simpler than escalating isolation.
- Escalating isolation blindly. Serializable is correct but increases aborts; be ready to retry transactions. It's the price of the guarantee.

**How to handle it:** if a transaction reads rows to make a decision and then writes based on that decision, either lock the rows it read (`FOR UPDATE`/`FOR SHARE`), enforce the rule with a constraint, or run at Serializable isolation with retry. Recognising the pattern — "read a set, decide, write based on it" — is the key skill. See [isolation levels](/t/isolation-level) and [serializable](/t/isolation-level).
