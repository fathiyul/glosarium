---
title: "Batching"
summary: "Grouping work to reduce per-item overhead."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["batching", "batch processing requests", "request batching"]
prereqs: ["throughput", "cache-hit-miss"]
related: ["request-coalescing", "write-behind-cache", "pipelining"]
---
**Batching** groups many small operations into fewer large ones: 1000 individual writes become one bulk insert, 50 API calls become one multi-get, per-message overhead amortises across the batch. Throughput rises (less per-unit fixed cost) at the price of latency (waiting to fill the batch) and complexity (partial failure handling).

```text
1000× (round trip + parse + commit) → 1× bulk (one trip, one parse, one commit)
```

Batching appears at every layer: network (Nagle, pipelining, multi-get), databases (bulk inserts, `IN` queries), queues (batch consumers), GPUs (batched inference), and UIs (debounced saves). The batch size tunes the throughput/latency trade continuously.

The classic mistakes:

- Batching latency-sensitive paths. Waiting to fill batches delays interactive responses past their SLO. Batch background work; serve interactive work immediately (or micro-batch tiny).
- Unbounded batches. Megabyte payloads and million-row inserts blow memory, timeouts and lock scopes. Cap sizes; split oversized work.
- All-or-nothing failure. One bad record failing the whole batch wastes the other 999 and invites poison loops. Per-item results with dead-lettering for failures.
- Ignoring ordering. Batched operations may execute in any order (or parallel); order-dependent work needs sequencing preserved explicitly.
- Over-batching tiny gains. Batching infrastructure (accumulators, flush timers, partial-failure paths) for 2× improvements rarely pays. Batch where overhead dominates (10×+ wins).
- Flush timers forgotten. Batches that fill by size but never by time stall low-traffic periods indefinitely. Size *and* time triggers, always.
- Assuming atomicity. Batched writes aren't transactional unless the store makes them so; partial application needs reconciliation. Know the store's guarantees.

**How to apply it:** batch where per-unit overhead dominates (I/O, round trips, commits), cap sizes, flush by time, handle partial failure per item. Throughput's cheapest lever — spent where latency budgets allow.
