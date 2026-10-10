---
title: "Distributed Lock"
summary: "Mutual exclusion across machines, and its pitfalls."
levels: { backend: senior, data-engineer: senior }
aliases: ["distributed lock", "distributed mutex", "redlock"]
prereqs: ["coordination-service", "consensus"]
related: ["coordination-service", "fencing-token", "lease"]
---
A **distributed lock** grants exclusive access across processes and machines: only the holder acts (runs the cron, migrates the shard, drains the queue). Unlike a local mutex, the lock service can fail, the network can partition, and a holder can pause past its lease — so correctness needs more than "SET if absent."

```text
acquire (with TTL + unique token) → act → release (only if still mine)
```

The failure modes define the design: crashed holders must expire (TTLs on locks), partitioned almost-holders must not act (fencing tokens ordered by a monotonic source), and clock skew bounds lease safety. Redis-style single-instance locks suit efficiency (best-effort mutual exclusion); consensus-backed locks suit correctness (safety under partitions).

The classic mistakes:

- No TTL. A crashed holder keeping a lock forever deadlocks the protected work. Every lock expires; holders renew (or do bounded work within the TTL).
- Release by anyone. A slow holder's expired lock acquired by another, then released by the first, unlocks someone else's protection. Release only with the unique token (compare-and-delete).
- Acting without fencing. A paused-then-resumed holder writing after its lock expired corrupts despite "holding" it. Guard the resource with fencing tokens, not just the lock.
- Locking the hot path. Contended distributed locks serialise throughput to the lock service's speed. Keep critical sections tiny or redesign (partitioning, queues) off the lock.
- Single Redis as truth. One instance failing (or failing over) breaks mutual exclusion silently. Match the implementation to the required safety (single-instance locks for efficiency, consensus-backed for correctness — see [fencing tokens](/t/fencing-token)).
- Locks for coordination. Leader election, queues and barriers have purpose-built primitives; a lock hammer makes every coordination problem a nail — use the coordination service's vocabulary.

**How to use them:** TTL + unique token + fencing at the resource, consensus-backed when safety matters, off hot paths always. Distributed locks are deceptively simple APIs over genuinely hard guarantees — respect the gap.
