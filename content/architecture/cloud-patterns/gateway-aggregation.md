---
title: "Gateway Aggregation"
summary: "One gateway call that fans out to many services and combines the results."
levels: { backend: senior, frontend: senior }
aliases: ["gateway aggregation", "api composition", "backend aggregation"]
prereqs: ["api-gateway", "chatty-io"]
related: ["api-gateway", "gateway-offloading", "chatty-io"]
---
**Gateway aggregation** collapses multiple downstream calls into one client-facing request: the gateway fans out to services in parallel, assembles their responses, and returns the composed result. Mobile and web clients get one round trip instead of a chatty handful — latency falls, client logic simplifies.

```text
client → gateway → (orders ∥ users ∥ inventory, parallel) → one composed response
```

It's the BFF's workhorse mechanism, distinct from mere routing: aggregation owns composition logic (merging, defaults, partial-failure handling) that clients shouldn't duplicate. Timeouts per downstream, hedged slowness, and partial responses (data with gaps marked) keep one slow service from spoiling the composition.

The classic mistakes:

- Sequential fan-out. Awaiting downstream calls one-by-one sums their latencies; parallelise with per-call timeouts. Aggregation must be concurrent to matter.
- All-or-nothing composition. One failed downstream failing the whole response converts partial degradation into total failure. Degrade per section (cached/defaults/gaps marked).
- Business logic accretion. Composition growing into pricing, eligibility and workflow rules turns the gateway into an untested monolith. Aggregate and shape; decide in services.
- No per-route budgets. Slow downstream without a deadline holds the composition hostage. Budget per call; fail fast past it.
- Cache blindness. Composed responses cached whole (invalidation pain) or never (repeated fan-out cost). Cache fragments with precise keys; compose from cache where possible.
- Client-specific gateways multiplying. A gateway per screen fragments composition logic across near-identical aggregators. Aggregate per client *class*, version the compositions.
- Hiding failures. Swallowing downstream errors into 200-with-gaps confuses debugging and clients. Mark gaps explicitly; expose health honestly.

**How to use it:** parallel fan-out, per-call budgets, partial responses by design, composition without business rules. One round trip for clients, honest degradation inside.
