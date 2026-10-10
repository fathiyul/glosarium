---
title: "Designing a Rate Limiter"
summary: "Counting requests across many servers under high load."
levels: { backend: senior }
aliases: ["rate limiter design", "distributed rate limiting", "design rate limiter"]
prereqs: ["rate-limiting", "redis"]
related: ["rate-limiting", "rate-limit-algorithms", "api-gateway"]
---
**Designing a rate limiter** enforces "at most N requests per window" across distributed servers: counter per key (user, IP, API key) in a shared store, checked on every request, rejecting over-limit with `429` plus retry guidance. The exercise is distributed counting at request speed — correct enough, fast enough, and kind to clients.

```text
request → identify key → shared counter (sliding window) → allow / 429+Retry-After
```

Key decisions: algorithm (token bucket for burst-plus-average, sliding window for strict smoothing — see [rate-limiting algorithms](/t/rate-limit-algorithms)), store (in-memory per node is cheap but N× lenient; shared Redis/Cassandra is exact but adds a hop), key granularity (per-user beats per-IP for fairness), and failure mode (fail open on limiter outage? or closed?).

The classic mistakes:

- Per-node counting. Ten servers × 100/min each = 1000/min real limit. Either share the counter or accept and document the multiplier.
- Counter hot keys. One viral user hammering a single counter serialises on it; shard counters or accept approximate counting at extremes.
- No headers. Clients can't back off gracefully without limit/remaining/reset feedback. Standard headers plus `429` plus `Retry-After`.
- Limiter latency on the hot path. A cross-region counter read per request adds real milliseconds; co-locate counters, batch, or use local-with-sync approximations.
- Fail-closed by default. A limiter outage 500-ing all traffic turns protection into the outage. Decide fail-open vs closed per endpoint criticality.
- One limit for all. Login attempts, API reads and bulk imports need different keys, windows and consequences. Tier limits by abuse potential and cost.
- Punishing shared IPs. Per-IP limits behind carrier NAT throttle thousands innocently. Key on identity where possible; layer IP limits loosely.

**Why it teaches:** distributed counters, approximation trade-offs, failure-mode design and client cooperation — rate limiting is coordination theory meeting production reality. Count shared, communicate clearly, fail thoughtfully.
