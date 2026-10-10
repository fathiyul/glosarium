---
title: "Distributed ID Generation"
summary: "Generating unique IDs across machines, e.g. UUIDv7 or Snowflake IDs."
levels: { backend: senior, data-engineer: senior }
aliases: ["distributed id generation", "unique ids distributed", "snowflake ids"]
prereqs: ["uuid-vs-autoincrement", "sharding"]
related: ["uuid-vs-autoincrement", "sharding", "hot-partition"]
---
**Distributed ID generation** mints unique identifiers across many machines without coordination: no single sequence to bottleneck on, no collisions, ideally roughly ordered and compact. Approaches span random UUIDs (trivially distributed, unordered, wide), Twitter-Snowflake-style (timestamp + node + sequence — ordered, compact, needs node assignment and clock care), and database ranges (simple, coordination-light, bounded).

```text
UUIDv4:   random 128-bit (unique, unordered, 36 chars)
Snowflake: 41b time | 10b node | 12b seq (ordered, ~64-bit, k-sorted)
```

Desiderata collide: uniqueness is mandatory; order helps indexing (see [index locality](/t/index-selectivity)); compactness helps storage; unguessability helps security; independence helps availability. No scheme maximises all — Snowflake-likes trade clock/node dependence for order and size; UUIDs trade size and locality for zero coordination.

The classic mistakes:

- Auto-increment across shards. A single sequence is a single point of contention and failure; sharded ranges or decentralised schemes replace it.
- Clock dependence unguarded. Snowflake-likes break on clock regression (NTP steps, VM pauses); monotonic clocks, sequence-space waiting, or UUID fallback contain the damage.
- Node-id collisions. Two generators sharing a node id mint duplicates silently. Assign node ids centrally (coordination service) and monitor for overlap.
- Leaking business intelligence. Sequential ids reveal creation rates and totals to competitors and attackers; expose opaque external ids where enumeration matters.
- String-storage waste. UUIDs-as-text bloat indexes; store binary where the database supports it.
- Assuming order equals time. K-sorted is approximately chronological, not exactly — cross-node clock skew reorders neighbours. Don't infer causality from adjacency.
- Coordination disguised as decentralised. "Distributed" schemes phoning home per id (central range allocator per block is fine; per id is not) reintroduce the bottleneck.

**How to choose:** need order + compactness → Snowflake-style with clock/node discipline; need zero coordination → UUIDv7 (time-ordered) or v4; need database simplicity → pooled ranges. Match the scheme to the index, the threat model and the failure modes.
