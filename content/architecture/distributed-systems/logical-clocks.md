---
title: "Logical Clocks"
summary: "Lamport and vector clocks for ordering events without real time."
levels: { backend: principal, data-engineer: principal }
aliases: ["logical clocks", "lamport clocks", "vector clocks"]
prereqs: ["clock-skew", "cap-theorem"]
related: ["clock-skew", "message-ordering", "last-write-wins"]
---
**Logical clocks** order distributed events without trusting wall clocks: Lamport timestamps (counter incremented per event, max-plus-one on receive — giving happened-before order), vector clocks (per-node counters revealing causality *and* concurrency), and hybrids. They answer "did A cause B, or were they concurrent?" — the question wall clocks answer wrongly under skew.

```text
Lamport:  A(1) → B receives, sets max+1 (causal order, no concurrency info)
vector:   A[1,0] vs B[0,1] → concurrent (neither dominates); [2,1] dominates [1,1]
```

Vector clocks detect conflicts (concurrent writes to the same key need merging) and power version tracking in Dynamo-style stores; Lamport clocks give cheap causal order for logs and debugging. Both trade clock-sync dependence for metadata carried with data.

The classic mistakes:

- Wall-clock ordering across nodes. Skew makes "later timestamp" meaningless for causality; use logical clocks where cause matters.
- Vector growth unbounded. Per-node entries for departed nodes accumulate forever; prune with roster management and dotted versions.
- Confusing concurrency with conflict. Concurrent vector clocks mean "unordered," not "conflicting" — resolution policy (merge, LWW, repair) is a separate decision.
- Lamport for conflict detection. Lamport orders totally but hides concurrency; two causally-unrelated events still get an order. Use vectors where concurrency must be visible.
- Metadata bloat. Vectors on hot keys inflate every value; weigh causality needs against bytes (version vectors, bounded rosters help).
- Assuming delivery order. Logical clocks stamp causality; they don't guarantee arrival order. Receivers still buffer and reconcile out-of-order delivery.
- Debugging with timestamps. Correlating cross-node logs by wall clock misorders under skew; log logical clocks (and trace ids) for true sequence.

**How to use them:** vectors for conflict detection and versioning, Lamport for cheap causal order, hybrids where both matter. Causality is a graph, not a timestamp — track it as one.
