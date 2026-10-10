---
title: "Two-Phase Locking"
summary: "Acquire all locks, then release them: the classic way to get serializability."
levels: { backend: principal, data-engineer: principal }
aliases: ["two-phase locking", "2PL", "strict two-phase locking"]
prereqs: ["pessimistic-locking", "transaction"]
related: ["isolation-level", "mvcc", "row-vs-table-lock", "db-deadlock"]
---

**Two-phase locking (2PL)** is a concurrency-control method that guarantees **serializable** transactions using locks. The rule: a transaction has a **growing phase** (it may acquire locks but not release any) and a **shrinking phase** (it may release locks but not acquire any). Once it releases its first lock, it can't take another. Following this rule produces only serializable schedules — equivalent to running transactions one after another.

```text
growing:  lock A, lock B, lock C ...   (no releases yet)
shrinking: unlock ...                  (no new locks)
```

The common variant is strict 2PL: a transaction holds all its locks until it commits or aborts (it releases only at the end). Strictness prevents cascading aborts and gives recoverability, and it's what most databases implement. Locks are typically row-level (see [row vs table locks](/t/row-vs-table-lock)).

The trade-offs: 2PL gives strong serializable guarantees, but locks block — readers can block writers and vice versa — and it's prone to [deadlocks](/t/db-deadlock) (two transactions each waiting for a lock the other holds). The database detects and aborts one. This blocking is why many modern databases prefer [MVCC](/t/mvcc) for reads.

The classic mistakes:

- Confusing 2PL with two-phase commit. Similar names, unrelated: 2PL is concurrency control *within one database*; [two-phase commit](/t/two-phase-commit) is atomic commit *across systems*. Easy and costly mix-up.
- Assuming MVCC replaces locking entirely. MVCC-based engines still use locking (or equivalent conflict checks) for writes and for serializable isolation; 2PL remains relevant.
- Ignoring deadlocks. Strict 2PL makes deadlocks possible; applications must catch the abort and retry (see [database deadlock](/t/db-deadlock)).
- Holding locks too long. Long transactions serialize access and hurt throughput; keep transactions short.
- Locking more than needed. Coarse locks (whole tables) or unnecessary locks block far more than required; lock at the finest practical granularity.
- Expecting high concurrency under 2PL. Its blocking nature limits concurrency under contention, which is exactly why snapshot/MVCC approaches gained popularity.

How to think about it: 2PL is the classic, correct-but-blocking approach to serializability — strong guarantees bought with locks, blocking and deadlocks. Understanding it explains why databases moved to MVCC for reads while keeping locking for writes, and why "serializable" has real cost. See [isolation levels](/t/isolation-level) and [MVCC](/t/mvcc).
