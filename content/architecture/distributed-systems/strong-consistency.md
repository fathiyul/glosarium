---
title: "Strong Consistency"
summary: "Every read sees the latest write."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["strong consistency", "strongly consistent", "linearizable reads"]
prereqs: ["cap-theorem", "quorum"]
related: ["linearizability", "eventual-consistency", "read-your-writes"]
---
**Strong consistency** promises reads see the latest completed write — no stale replicas, no convergence windows, every read current as of some recent instant. Implementations coordinate (leader reads, quorum reads, synchronous replication), paying latency and availability for the guarantee.

```text
write completes → every subsequent read (any replica) sees it
```

It's the right model where staleness causes harm: balances, inventory, permissions, configuration. Elsewhere it's overpayment — session or eventual consistency serves users identically at a fraction of the coordination cost.

The classic mistakes:

- Strong everywhere by default. Paying quorum latency on reads nobody needs fresh wastes the budget that matters. Scope strong reads to freshness-critical paths.
- Assuming it means instant everywhere. "Strong" still means "as of a recent coordinated point" — cross-region writes take hundreds of milliseconds. Physics bills coordination.
- Ignoring the availability cost. Strong systems refuse (or stall) when quorums fail; during partitions that's correct — and must be an accepted trade, not a surprise.
- Testing without partitions. Strong consistency's value appears under failure; untested failover paths weaken exactly when needed. Partition-test the guarantee.
- Mixing models unknowingly. Some reads strong, others stale, with no documented rule — users experience random freshness. Declare per-operation consistency explicitly.
- Confusing recency with causality. Strong reads see latest writes but don't order causally unrelated events; causal needs (see [logical clocks](/t/logical-clocks)) differ from fresh reads.
- Leader-read overload. Routing all strong reads to the leader bottlenecks it; quorum reads distribute at coordination cost. Balance by load, not habit.

**When to demand it:** money, inventory, authz, config — where stale reads cause real harm. Everywhere else, session or eventual consistency buys back latency and availability honestly.
