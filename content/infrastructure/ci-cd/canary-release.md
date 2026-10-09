---
title: "Canary Release"
summary: "Releasing to a small share of users first."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["canary deployment", "canary rollout", "canary testing", "progressive rollout", "canary"]
prereqs: ["deployment", "rollback"]
related: ["blue-green-deployment", "rolling-deployment", "feature-flags", "progressive-delivery", "dark-launch", "rollback"]
core: [backend]
---

A **canary release** sends a **small share of real traffic** to the new version first, while most users stay on the old one. You watch how the new version behaves. If it's healthy, you gradually increase its share. If not, you roll back, and only a few users were affected. The name comes from the canary in a coal mine, the early warning.

```
Step 1:  95% ─► v1 (old)     5% ─► v2 (new)    watch error rate, latency, business metrics
Step 2:  75% ─► v1          25% ─► v2
Step 3:  0%  ─► v1         100% ─► v2          done; remove v1
        (any step: bad signs → send 100% back to v1)
```

## How the traffic split works

- A **load balancer or service mesh** routes a percentage of requests to the new instances.
- A **feature flag** enables new behavior for a percentage of users, or specific groups ([feature flags](/t/feature-flags)).
- Platform tools (such as progressive delivery controllers on Kubernetes) automate the steps and the decision.

## What to watch

Compare the canary against the baseline on:

- **Errors**: 5xx rate, exceptions, failed requests.
- **Latency**: p95 and p99 ([percentiles](/t/percentile)).
- **Saturation**: CPU, memory, database load.
- **Business metrics**: conversions, checkouts, sign-ups.
- Logs and alerts specific to the change.

Decide the **success criteria and the abort conditions beforehand**, and where possible automate the rollback ([rollback](/t/rollback)).

## Canary vs other strategies

| Strategy | Idea |
|---|---|
| **[Rolling](/t/rolling-deployment)** | Replace instances gradually. Not necessarily controlled by traffic share or metrics |
| **[Blue-green](/t/blue-green-deployment)** | Two full environments, and switch all traffic at once |
| **Canary** | Gradual, **metric-driven** exposure of real users to the new version |

## Things to get right

- **Sample size**: a 1% canary on low traffic may not produce enough data to see problems.
- **Sticky assignment**: a user shouldn't bounce between versions on every request.
- **Compatibility**: v1 and v2 run **at the same time**, so databases, caches and APIs must work with both ([schema and code deploys](/t/schema-and-code-deploys)).
- **Choose canary users carefully** (internal users first, then a small random slice), and consider the risk to critical customers.
- **Don't skip the observation time.** The point is to learn before expanding.

It's the foundation of [progressive delivery](/t/progressive-delivery), and works well with [dark launches](/t/dark-launch) that test new code paths without exposing the results.
