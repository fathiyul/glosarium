---
title: "PACELC"
summary: "Extends CAP: even without partitions, you trade latency against consistency."
levels: { backend: senior, data-engineer: senior }
aliases: ["PACELC theorem", "PACELC", "beyond CAP"]
prereqs: ["cap-theorem", "eventual-consistency"]
related: ["cap-theorem", "quorum", "strong-consistency"]
---
**PACELC** extends CAP: *if Partitioned*, trade Availability against Consistency (else) trade Latency against Consistency. CAP covers partitions; PACELC adds the normal case — even without failures, strong consistency costs latency (quorum round trips), so systems choose per operation: consistent-and-slow or fast-and-convergent.

```text
partition? → A or C (CAP)
no partition → L or C (coordinator round trips vs local reads)
```

It reframes "eventual vs strong" from emergency posture to everyday latency budget: leader reads (consistent, slower), replica reads (fast, possibly stale), quorum writes (durable, multi-hop). Modern stores expose these knobs per request — and PACELC is the reasoning for setting them differently per path.

The classic mistakes:

- CAP-only thinking. Designing for partitions while ignoring the everyday latency cost of consistency leaves needless milliseconds on every request. Apply the ELSE branch routinely.
- One setting everywhere. Strong consistency for counters nobody reads fresh, eventual for balances that must agree — per-operation tuning beats global policy.
- Latency budgets without consistency mapping. "p99 50ms" alongside "always consistent" may be physically impossible across regions; PACELC exposes the contradiction early.
- Ignoring the partition branch in practice. Teams tune the happy path and discover their A/C choice during the first real partition. Decide partition behaviour explicitly, per workload.
- Confusing PACELC with permission for sloppiness. The theorem describes trade-offs; it doesn't bless unmeasured staleness. Bound the inconsistency (lag metrics, session guarantees) in both branches.
- Forgetting clients see both. A fast-stale read followed by a slow-consistent one confuses users more than consistent slowness. Keep per-session stories coherent.

**How to apply it:** per operation, choose the branch — partition behaviour by criticality, everyday latency-vs-consistency by freshness need. PACELC turns a slogan (CAP) into a configuration practice.
