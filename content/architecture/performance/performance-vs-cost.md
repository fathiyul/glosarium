---
title: "Performance vs Cost"
summary: "Deciding how much speed is worth paying for."
levels: { backend: staff, frontend: staff, data-engineer: staff }
aliases: ["performance vs cost", "cost of performance", "performance efficiency"]
prereqs: ["performance-budget", "finops"]
related: ["performance-budget", "autoscaling", "capacity-planning"]
---
**Performance vs cost** is the trade at the heart of capacity decisions: every millisecond and nine has a price — bigger instances, more replicas, premium tiers, edge presence, engineering time — and spending is justified only where latency and reliability convert to value (conversion, retention, SLA credits, user trust).

```text
p99 500ms → 100ms costs 4× infra; converts +2%? (measure, then decide)
```

The practice is economic: attribute cost to user-facing outcomes (cost per request, per active user, per conversion), optimise efficiency first (cheaper wins: caching, queries, payloads), spend on scale second, and let error budgets and performance budgets arbitrate the velocity/reliability/cost triangle.

The classic mistakes:

- Performance at any price. Gold-plating latencies users can't perceive (50ms → 20ms on background jobs) burns budget better spent on features or reliability.
- Cost-cutting latency blindly. Arbitrarily halving infra spend that doubles p99 on checkout loses more revenue than it saves. Model conversion impact before cutting.
- No unit economics. Infra bills nobody can attribute to products or features can't be optimised — only argued about. Tag, allocate, review per owner.
- Efficiency last. Scaling out wasteful systems multiplies waste; optimise first (the cheapest capacity is the request you don't serve), scale second.
- Ignoring engineering cost. A month of optimisation for $200/month savings loses money. Price engineering time in the trade explicitly.
- Static provisioning for dynamic load. Flat capacity for spiky traffic pays peak prices for average use. Autoscale, schedule, and shed — match spend to demand shape.
- Saving on observability. Cutting monitoring/profiling to save pennies blinds the optimisation that saves dollars. Observability is cost-control infrastructure.

**How to decide:** measure outcome value per millisecond, optimise efficiency before spending, attribute costs to owners, and let budgets (performance, error, financial) negotiate openly. Speed is a feature with a price — buy it where it pays.
