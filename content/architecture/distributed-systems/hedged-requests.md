---
title: "Hedged Requests"
summary: "Sending a duplicate request when the first is slow, to cut tail latency."
levels: { backend: principal, data-engineer: principal }
aliases: ["hedged requests", "hedging", "backup requests"]
prereqs: ["tail-latency", "timeouts"]
related: ["load-shedding", "retry-storm", "deadline-propagation"]
---
**Hedged requests** race duplicates: after a request exceeds a latency percentile (p95-ish), send a second identical request elsewhere and take whichever finishes first, cancelling the loser. Tail latency — the slow stragglers dominating user-visible p99 — drops dramatically because only *both* copies straggling delays the user.

```text
request → slow past 100ms? → duplicate to another server → first wins, cancel loser
```

Hedging trades a little extra load (a few percent more requests, only for slow ones) for large tail improvements. It works best for idempotent reads with high latency variance (imbalanced servers, GC pauses, noisy neighbours); it backfires for expensive or non-idempotent operations.

The classic mistakes:

- Hedging writes. Duplicated mutations double-apply unless idempotent — and cancellation races completion. Hedge reads; make anything hedged idempotent first.
- Thresholds too eager. Hedging at p50 doubles load for median gains; hedge past p90/p95 where stragglers live and duplicates stay few percent.
- Uncancelled losers. Firing duplicates without cancelling consumes double resources permanently. Cancel aggressively (deadlines, context propagation).
- Hedging under overload. Duplicates during systemic slowness amplify the overload into collapse. Gate hedging on health — disable when backends saturate.
- Correlated stragglers. Hedging to the same rack/zone/AZ shares the fate causing slowness. Hedge across failure domains.
- Ignoring cost accounting. Extra requests bill (serverless, metered APIs) and load shared dependencies. Budget the duplicate percentage explicitly.
- Masking the underlying variance. Hedging hides stragglers instead of fixing them; track unhedged latency too, and fix chronic slow servers.

**When to use it:** idempotent reads with high variance where tails matter. Small duplicate spend, large p99 win — gated on health, cancelled promptly, never on writes.
