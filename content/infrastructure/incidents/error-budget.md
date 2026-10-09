---
title: "Error Budget"
summary: "How much unreliability an SLO allows, used to balance speed and stability."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["error budgets", "reliability budget", "SLO error budget", "burn rate"]
prereqs: ["slo", "sli"]
related: ["slo", "sli", "sre", "nines-of-availability", "alerting", "deployment-freeze", "mttr"]
core: [backend]
---

An **error budget** is the **amount of unreliability your SLO allows**. If your [SLO](/t/slo) says the service should be available 99.9% of the time, then the remaining **0.1% is your budget for failure**: the downtime, errors or slowness you can "spend" without breaking your promise.

```
SLO: 99.9% of requests succeed over 30 days
Error budget: 0.1% of requests may fail

If the service is down fully:  30 days × 24 h × 60 min × 0.001 ≈ 43 minutes of downtime allowed per month
If you serve 100 million requests: up to 100,000 failures allowed
```

The key insight: **100% reliability is the wrong target**. It's unattainable and extremely expensive, and users usually can't distinguish 99.99% from 100% because their own connections, devices and other services are less reliable. Past a point, extra reliability costs more than it's worth, and **blocks innovation**.

## How it's used

The budget turns reliability into a **shared, quantitative resource** that product and engineering teams can negotiate, instead of arguing from opinion:

- **Budget remaining**: ship features, run experiments and take reasonable risks (deployments, migrations, launches). Failures are expected and affordable.
- **Budget exhausted (or burning fast)**: slow down risky changes and **prioritize reliability work** (fixing the causes of failures, improving rollback, adding tests) until the budget recovers. Many teams write an **error budget policy** that says what happens then, such as freezing non-essential releases ([deployment freeze](/t/deployment-freeze)).

This aligns incentives: developers want to ship, operators want stability, and the budget says how much risk is acceptable and who gets to spend it.

## Burn rate

**Burn rate** is how fast you're consuming the budget relative to the allowed rate. A burn rate of 1 means you'll use exactly your budget by the end of the window. A burn rate of 10 means you'd exhaust it in a tenth of the time. **Alerting on burn rate** (a fast burn pages immediately, a slow burn creates a ticket) catches real problems early and avoids noisy threshold alerts ([alerting](/t/alerting)).

## Practical points

- **Measure with good SLIs** that reflect user experience (successful requests, fast enough), not internal metrics ([SLO](/t/slo)).
- **Choose the window** (rolling 28 or 30 days is common).
- **Count planned maintenance honestly**: decide whether it consumes the budget.
- **Agree the policy in advance**, with product and leadership, so it's followed when it matters.
- **Spend it deliberately**: a budget that's never used means you're probably too conservative, and could move faster ([nines of availability](/t/nines-of-availability)).
- **Use it in planning** and postmortems: how much did that incident cost ([postmortems](/t/postmortem))?

Error budgets are a core practice of site reliability engineering ([SRE](/t/sre)).
