---
title: "Request Coalescing"
summary: "Collapsing identical concurrent requests into one."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["request coalescing", "request collapsing", "singleflight"]
prereqs: ["cache-hit-miss", "thundering-herd"]
related: ["thundering-herd", "cache-hit-miss", "read-heavy-vs-write-heavy"]
---
**Request coalescing** (collapsing, singleflight) merges simultaneous duplicate in-flight requests into one: ten callers asking for the same uncached key trigger a single backend fetch, sharing the result. The thundering herd's civilised answer — stampedes become one orderly queue behind a single worker.

```text
10× GET /hot-key (miss) → 1 backend fetch → all 10 served from it
```

It applies anywhere identical concurrent work duplicates: cache fills, fan-out aggregations, config reloads, DNS bursts. Implementations key by request identity, hold waiters on the in-flight future, and release together — with timeouts and error propagation shared honestly.

The classic mistakes:

- No key normalisation. Semantically-identical requests with different key forms (param order, casing) bypass coalescing. Normalise before keying.
- Coalescing non-idempotent work. Merging POSTs or stateful calls collapses distinct intentions into one execution. Coalesce reads; queue writes separately.
- Unbounded waiter lists. A million waiters on one slow fetch exhaust memory and deliver a million stale-at-arrival responses. Cap waiters; shed with errors beyond.
- Error sharing without thought. One backend failure failing all ten waiters converts a miss into an outage amplifier. Consider stale-serving or limited retry before broadcast failure.
- Ignoring the slow-backend case. Coalescing hides duplicate work but not slow work — one 5s fetch still blocks all waiters 5s. Fix backend latency; coalescing fixes duplication.
- Cache-layer confusion. Coalescing at the app while the CDN also stampedes (or vice versa) leaves one layer unprotected. Place it where duplication actually concentrates.
- Assuming order or fairness. Waiters release together; priority callers gain nothing. If some callers matter more, prioritise explicitly.

**How to use it:** key-normalised singleflight on hot read paths, bounded waiters, honest error sharing, stale fallback where freshness allows. Duplication eliminated at the source — the herd becomes a line.
