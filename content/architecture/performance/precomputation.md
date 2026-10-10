---
title: "Precomputation"
summary: "Computing results ahead of time."
levels: { backend: senior, data-engineer: senior }
aliases: ["precomputation", "precompute", "materialized results"]
prereqs: ["cache-hit-miss", "performance"]
related: ["refresh-ahead-cache", "denormalization", "read-heavy-vs-write-heavy"]
---
**Precomputation** pays compute cost upfront (or in the background) so reads stay instant: materialised views, prebuilt feeds, pre-rendered reports, indexed aggregates — work shifted from request time (where users wait) to write time or idle time (where nobody does).

```text
on demand:  request → join 10 tables → aggregate → respond (2s)
precomputed: write → update summary → request → read summary (20ms)
```

It trades freshness and write amplification for read speed: results go stale between recomputes (bounded by schedule or triggers), and every write fans into derivative updates. Read-heavy, slowly-changing data is the sweet spot; volatile data makes precompute churn expensively.

The classic mistakes:

- Precomputing volatile data. Recomputing on every write of high-churn data costs more than serving fresh reads. Precompute stable aggregates; serve volatile live.
- Stale without bounds. Precomputed results with no refresh story serve ancient answers silently. Schedule, trigger, or version every precompute with freshness guarantees.
- Write amplification blindness. One write fanning into dozens of derivative updates overloads ingestion. Budget the fan-out; batch and prioritise recomputes.
- Partial-update inconsistency. Some derivatives refreshed while others lag presents internally-contradictory reads. Version precompute sets; readers pin versions.
- Recomputation storms. Bulk invalidation (deploy, schema change) recomputing everything at once collapses workers. Stagger rebuilds; prioritise hot keys.
- Over-precomputing. Prebuilding every conceivable slice wastes storage and compute for queries never run. Precompute the measured hot paths; compute the tail on demand.
- No fallback to live. Precompute pipeline down with no live-computation fallback turns staleness into outage. Degrade to on-demand computation, slowly, rather than failing.

**When to use it:** expensive reads over stable data with clear freshness bounds. Shift work in time (writes/idle instead of reads), bound staleness explicitly, and keep a live fallback for pipeline failures.
