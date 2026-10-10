---
title: "Retry Storm"
summary: "Retries multiplying the load on an already failing system."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["retry storm", "retry amplification", "cascading retries"]
prereqs: ["backpressure", "circuit-breaker"]
related: ["circuit-breaker", "jitter", "load-shedding"]
---
A **retry storm** turns a partial failure into a total one: a dependency slows, clients retry, retries add load, the dependency slows further, more retries fire — exponential amplification until everything drowns. Each layer's reasonable local decision (retry once, twice) composes globally into a self-inflicted DDoS.

```text
slow dependency → timeouts → N clients × M retries = NM extra load
→ slower → more retries → collapse
```

Defences layer: bounded retries (budgets, not counts — "10% of traffic may retry"), exponential backoff with jitter (desynchronise), circuit breakers (stop calling the dead), hedged restraint (no hedging during overload), and server-side admission (shed retries first).

The classic mistakes:

- Unbounded retries. Fixed "retry 3 times" per client with no global budget multiplies infinitely with client count. Budget retries as a fraction of traffic.
- Synchronised retries. Fixed-interval retries align into waves (thundering herd redux). Backoff plus jitter, always.
- Retrying non-idempotent operations. Storms plus side effects equal duplicated charges and corrupted state. Retry only what's safe (or keyed idempotent).
- No circuit breaking. Continuing to call a clearly-dead dependency feeds the storm. Breakers open fast; half-open probes check recovery cheaply.
- Client timeouts longer than server patience. Mismatched timeouts guarantee retry-on-success (original completes after client gave up). Align timeouts end to end.
- Cascading layers. A→B→C each retrying triples the amplification per layer. Budgets must account for depth — retry at most once per layer, or centrally.
- Missing retry metrics. Indistinguishable retries hide the storm's onset. Tag and meter retries separately; alert on retry ratio, not just error rate.

**The discipline:** budget retries globally, back off with jitter, break circuits fast, shed under overload. Retries are load — spend them like capacity, because they are.
