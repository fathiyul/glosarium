---
title: "SLO"
summary: "A service level objective: the target for an SLI."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["service level objective", "service level objectives", "SLOs", "reliability target", "SLI SLO SLA"]
prereqs: ["metrics", "alerting"]
related: ["sli", "sla", "error-budget", "golden-signals", "alerting", "sre", "nines-of-availability"]
core: [backend, frontend]
also: [observability]
---

An **SLO (service level objective)** is a **target for how reliable or fast a service should be**, measured over a period. It's built from an **SLI** and **bounded by an error budget**.

Three related terms:

| Term | Meaning | Example |
|---|---|---|
| **SLI** (indicator) | A **measurement** of some aspect of service quality | The fraction of requests that succeed and finish in under 300 ms ([SLI](/t/sli)) |
| **SLO** (objective) | The **internal target** for the SLI | 99.9% of requests meet that, over a rolling 30 days |
| **SLA** (agreement) | A **contract** with customers, with consequences (credits, penalties) if missed ([SLA](/t/sla)) | If availability falls below 99.5%, customers get a refund |

SLOs are usually stricter than SLAs, so you notice and react before breaching a contract.

## Choosing good SLIs

Measure **what users experience**, ideally from their side:

- **Availability**: the proportion of requests that succeed (valid requests, not counting client errors).
- **Latency**: the proportion of requests faster than a threshold (use percentiles, not averages) ([percentiles](/t/percentile)).
- **Quality / correctness**: results that are complete or fresh enough (data pipelines: [data freshness](/t/data-freshness)).
- **Durability or throughput** for storage and batch systems.

Express it as a ratio: **good events / total events**. That makes budgets and burn rates simple ([error budget](/t/error-budget)).

```
SLI = (requests with status < 500 AND latency < 300 ms) / (all valid requests)
SLO = SLI ≥ 99.9% over 30 days
```

## Setting realistic objectives

- **Don't aim for 100%.** Each extra "nine" costs much more ([nines of availability](/t/nines-of-availability)), and users can't perceive past a point.
- **Base it on what users need and what the system does today.** Look at historical data. Start with an achievable target, and tighten it deliberately.
- **Fewer, meaningful SLOs** per service. A handful covering the critical user journeys beat dozens of metrics.
- **Account for dependencies**: your service can't be more reliable than the things it depends on (unless it degrades gracefully).
- **Agree it with product and business stakeholders**, not only engineers.

## What SLOs are for

- **Decisions**: when the budget is healthy, ship faster. When it's gone, invest in reliability ([error budget](/t/error-budget)).
- **Alerting**: page when you're burning through the budget quickly, not on every blip ([alerting](/t/alerting)).
- **Shared language** about "reliable enough" across teams and with customers.
- **Prioritization** of reliability work against features.
- **Postmortems and trend analysis.**

## Pitfalls

- **Measuring the wrong thing** (server CPU instead of user-visible success).
- **Targets nobody acts on.** An SLO with no consequence is decoration.
- **Too tight and never met**, or **so loose it never triggers**.
- **Gaming**, such as excluding failures from the denominator.
- **Forgetting that a slow response can be as bad as an error.**

See [golden signals](/t/golden-signals) for a good starting set of things to measure.
