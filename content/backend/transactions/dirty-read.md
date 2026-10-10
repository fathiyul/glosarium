---
title: "Dirty Read"
summary: "Reading another transaction's uncommitted data."
levels: { backend: senior, data-engineer: senior }
aliases: ["dirty read", "dirty reads", "reading uncommitted data"]
prereqs: ["isolation-level", "transaction"]
related: ["mvcc", "non-repeatable-read", "phantom-read"]
---

A **dirty read** happens when one transaction reads data written by another transaction that hasn't committed. If the writer then rolls back, the reader has acted on a value that never officially existed.

```text
T1: UPDATE balance = 0        (not committed)
T2: SELECT balance → 0        ← dirty read
T1: ROLLBACK                  (balance is really 100)
T2 acted on 0
```

Most databases prevent this by default: the standard "Read Committed" level and above forbid dirty reads. They only occur at the lowest isolation level ("Read Uncommitted"), and some databases (including PostgreSQL) don't even offer a truly dirty read — treating Read Uncommitted as Read Committed.

```text
Read Uncommitted → dirty reads possible
Read Committed   → no dirty reads (most databases' default)
```

The classic mistakes:

- Assuming you have dirty reads enabled. In most systems you don't; the anomaly is largely historical. Confusing it with other anomalies wastes time.
- Confusing it with a [non-repeatable read](/t/non-repeatable-read). A dirty read is *uncommitted* data; a non-repeatable read is *committed* data that changes between two reads in the same transaction. Different problems.
- Lowering isolation for speed carelessly. If you opt into Read Uncommitted, you accept dirty reads knowingly. Rarely worth it; the performance gain is tiny and correctness risk real.
- Thinking it's about your own transaction. A dirty read is about *another* transaction's uncommitted changes. Within your own transaction, you always see your own writes.
- Building logic that depends on never seeing uncommitted state without checking the level. If correctness relies on never seeing other writers' partial work, confirm your isolation level guarantees it (see [isolation levels](/t/isolation-level)).

**Why it matters mostly as a reference point:** dirty reads are the weakest anomaly, and their absence is the first thing isolation provides. Understanding it clarifies the ladder from Read Uncommitted up to Serialisable, each preventing one more anomaly — see [non-repeatable reads](/t/non-repeatable-read), [phantom reads](/t/phantom-read) and [MVCC](/t/mvcc).
