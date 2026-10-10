---
title: "Handling Dependency Failures"
summary: "Deciding what happens when something you call is down."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["handling dependency failures", "dependency failure", "downstream failure"]
prereqs: ["circuit-breaker", "timeouts"]
related: ["circuit-breaker", "bulkhead", "graceful-degradation"]
---
Every service depends on things that fail — databases, APIs, queues, DNS — so **handling dependency failures** is core design, not edge handling: bound the wait (timeouts), stop hammering the dead (circuit breakers), isolate the blast radius (bulkheads), and degrade deliberately (cached, default or reduced responses).

```text
call → timeout? → breaker open? → fallback (cache/default/degraded) → record
```

The goal is containment: a slow recommendation engine must not stall checkout; a dead personalization service must not blank the page. Each dependency gets a failure posture decided in advance — fail fast, fallback, or fail the request — because improvising during incidents produces outages.

The classic mistakes:

- No timeouts. Waiting indefinitely on a hung dependency exhausts workers and cascades the failure upward. Every call gets a timeout shorter than its caller's patience.
- Retry without bounds. Retrying a failing dependency multiplies its load geometrically (see [retry storms](/t/retry-storm)). Budgets, backoff, jitter — and stop conditions.
- Missing bulkheads. One slow dependency consuming all threads starves healthy paths. Isolate pools per dependency so failures stay local.
- No fallback designed. Failure handling invented mid-incident means errors or hangs. Define per-dependency fallbacks (stale cache, defaults, feature-off) in calm times.
- Health checks that lie. "Dependency up" while it errors 50% routes traffic into failure. Check success rates, not just socket opens.
- Cascading synchrony. Deep synchronous chains (A→B→C→D) multiply every dependency's failure probability. Async boundaries and parallelism contain the math.
- Untested failure. Chaos and fault-injection for dependencies reveal missing timeouts and fallbacks before users do. Test the dead-dependency path deliberately.

**The posture:** every dependency will fail; each gets timeouts, breakers, bulkheads and a fallback — decided calmly, tested regularly. Resilience is a dependency matrix, not a hope.
