---
title: "Last Write Wins"
summary: "Resolving conflicting writes by timestamp, and the data it silently loses."
levels: { backend: senior, data-engineer: senior }
aliases: ["last write wins", "LWW", "last-write-wins"]
prereqs: ["eventual-consistency", "race-condition"]
related: ["leaderless-replication", "eventual-consistency", "race-condition"]
---

**Last write wins (LWW)** is a conflict-resolution rule for replicated or eventually-consistent data: when two writes to the same item conflict, keep the one with the later timestamp. It's simple and deterministic — every replica converges on the same value — which is why it's a common default in distributed stores.

```text
replica A: set name = "alice"  @ t=100
replica B: set name = "bob"    @ t=101
converge → "bob"  (higher timestamp wins)
```

The appeal is that convergence is easy: pick the newer, drop the older, all replicas agree.

The classic mistakes:

- Silent data loss. "Last write wins" *discards* the losing write. If two users edited different fields, or one edit was meaningful, it's gone with no warning. LWW maximises convergence at the cost of losing updates.
- Clock skew. Timestamps come from different machines with unsynchronised clocks; a "later" write on a fast clock can win over a genuinely later one. LWW is only as good as the clocks (or the system's logical clock).
- Assuming it's correct for counters or sets. For a counter, "last write wins" loses increments; for a set, it loses concurrent additions. These need a merge (CRDT-style), not LWW.
- Using it for fields where conflict matters. LWW is fine for "last known value" data (a profile status). It's wrong where every update counts (money, inventory, collaborative editing).
- Forgetting which layer resolves it. LWW may be the store's default; if your data needs different semantics, you must handle conflicts yourself (or choose a store/type that merges).
- Confusing it with ordering. LWW gives convergence, not causality; it doesn't preserve the *order* or meaning of edits. It just picks one.

**How to use it:** acceptable when any single latest value is a fine outcome and losing an older write is harmless — simple settings, presence, caches. For anything where concurrent changes must be *combined* rather than one discarded, use a structure that merges (per-field updates, counters, CRDT sets) or centralise the writes to avoid the conflict. See [leaderless replication](/t/leaderless-replication) and [eventual consistency](/t/eventual-consistency).
