---
title: "Linearizability"
summary: "Operations appear to happen instantly, in real-time order."
levels: { backend: principal, data-engineer: principal }
aliases: ["linearizability", "linearizable", "atomic consistency"]
prereqs: ["strong-consistency", "consensus"]
related: ["strong-consistency", "eventual-consistency", "quorum"]
---
**Linearizability** is the gold standard of single-object consistency: every operation appears to take effect instantaneously at some point between invocation and response — as if a single copy served all requests. Reads return the latest completed write, always; clients can reason as if no replication exists.

```text
write X=1 completes → any later-starting read sees X=1 (or a later value)
```

It's stronger than sequential consistency (which preserves per-client order but allows stale reads) and composable (linearizable objects combine into linearizable systems) — the properties that make it the correctness criterion for consensus, registers and coordination primitives.

The classic mistakes:

- Demanding it everywhere. Linearizable reads cost coordination per read; most application reads tolerate staleness. Reserve it for coordination primitives and freshness-critical paths.
- Confusing with serializability. Linearizability orders operations in real time (single object); serializability orders transactions equivalently to some serial execution (multi-object). Related, distinct, and needed in different places.
- Assuming it from "strong." Vendors' "strong consistency" sometimes means sequential or causal — verify linearizability specifically where reasoning depends on recency.
- Ignoring the latency bill. Cross-region linearizability pays hundreds of milliseconds per operation; designs must place coordination close or accept the cost knowingly.
- Testing without concurrency. Linearizability violations need overlapping operations to manifest; Jepsen-style concurrent workloads with history checkers (Elle, Knossos) find what unit tests can't.
- Forgetting composition limits. Linearizability composes across objects but not across systems with different clocks and protocols — end-to-end arguments need care at boundaries.

**When to require it:** coordination (locks, leaders, config), money-adjacent reads, and anywhere "latest completed write visible" is load-bearing. Elsewhere, weaker models buy back the latency.
