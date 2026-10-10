---
title: "Data Consistency Across Services"
summary: "Keeping data correct when each service owns its own database."
levels: { backend: senior, data-engineer: senior }
aliases: ["cross-service consistency", "data consistency across services", "distributed data consistency"]
prereqs: ["saga-pattern", "eventual-consistency"]
related: ["saga-pattern", "distributed-transaction", "idempotence"]
---
**Data consistency across services** is the problem of keeping related facts coherent when each lives in a different service's database: the order says paid while billing says pending, inventory reserved what shipping never heard of. No shared transaction spans the boundary, so consistency becomes a designed property — sagas, events and reconciliation — not a database feature.

```text
order(paid) + billing(pending) + inventory(reserved) → converge via events/sagas
```

Strategies layer: synchronous validation where cheap (check before acting), saga orchestration for multi-step flows (compensate on failure), events for propagation (converge eventually), and reconciliation jobs catching whatever slipped through. Each covers what the others miss.

The classic mistakes:

- Assuming immediate consistency. Services read each other's stale state constantly; designs pretending otherwise produce phantom validations and double-actions. Name the lag; design around it.
- Distributed transactions by default. 2PC across services couples availability to every participant. Sagas plus idempotence scale where 2PC stalls.
- No reconciliation. Events get lost, handlers bug out, compensations fail — without periodic cross-service reconciliation, drift accumulates silently until audit day.
- Over-sharing data. Copying whole aggregates between services multiplies inconsistency surface. Share ids and minimal read models; fetch details from owners.
- Synchronous chains. Order→billing→inventory→shipping called inline makes every service's availability everyone's problem. Async boundaries with explicit consistency contracts decouple.
- Inconsistent reads presented as truth. Showing "paid" from a stale cache while billing disagrees confuses users and support. Version, timestamp, or session-scope cross-service reads.

**How to manage it:** own data per service, propagate via events, coordinate via sagas, verify via reconciliation — and tell users the truth about freshness. Cross-service consistency is convergence engineered, not assumed.
