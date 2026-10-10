---
title: "Quorum"
summary: "Requiring a majority of nodes to agree on reads or writes."
levels: { backend: senior, data-engineer: senior }
aliases: ["quorum", "majority quorum", "quorum consensus"]
prereqs: ["cap-theorem", "consensus"]
related: ["leaderless-replication", "split-brain", "pacelc"]
---
A **quorum** is the minimum overlapping majority that makes distributed decisions safe: with N replicas, requiring W acknowledgements on write and R on read where W + R > N guarantees readers see the latest write — the sets must intersect. Quorums turn "most nodes agree" into correctness, tolerating minorities failing or partitioning.

```text
N=5, W=3, R=3 → every read overlaps every write's majority → fresh reads
W=1, R=1 → fast, overlapping nothing → possibly stale (tunable)
```

Tuning W and R trades latency against freshness per operation: strict quorums (W+R>N) for money and metadata, sloppy ones (W+R≤N) for high-throughput telemetry — same system, different guarantees per request. Leader election, consensus commits and replicated writes all reduce to quorum mechanics.

The classic mistakes:

- Even N. Four nodes need 3 for majority — same fault tolerance as three, higher quorum cost. Odd numbers for voter sets, always.
- Quorum across failure domains ignored. Five voters in one rack survive nothing rack-level; spread voters so majorities survive the failures actually feared.
- Confusing quorum with consensus. Quorums intersect reads and writes; consensus sequences decisions. Related machinery, different guarantees — use both where each fits.
- Strict quorums on hot paths. Majority round trips per request cap throughput and raise tail latency; scope strictness to operations needing it.
- Witnesses forgotten. A cheap voteless-or-diskless witness in a third site breaks two-site ties — majority without full replica cost.
- Reconfiguration unsafely. Changing membership (adding/removing voters) needs joint-consensus transitions; naive swaps create dual majorities and split-brain.
- Monitoring votes, not overlap. Alerting on node health while missing that no majority remains anywhere confuses symptoms with the actual outage.

**How to use them:** odd voters across domains, W+R tuned per operation, witnesses for ties, joint transitions for membership changes. Quorums are democracy with math — majorities that provably intersect.
