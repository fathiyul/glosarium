---
title: "Progressive Delivery"
summary: "Gradual rollouts with automatic checks at each step."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["progressive delivery", "gradual rollout", "automated rollout"]
prereqs: ["deploy-vs-release", "canary-release"]
related: ["blue-green-deployment", "rolling-deployment", "feature-flags", "dark-launch", "rollback", "dora-metrics"]
---

**Progressive delivery** releases a change gradually and watches it at each step, expanding only while the signals stay healthy. Instead of flipping from old to new for everyone at once, you expose a small group, verify, then widen — and **automated checks** decide whether to continue or pull back. It's the umbrella over canaries, [blue-green](/t/blue-green-deployment), [rolling](/t/rolling-deployment) updates and [feature flags](/t/feature-flags).

```text
1% of traffic → check error rate, latency → 10% → check → 50% → check → 100%
       any check fails: automatically roll back or hold
```

The "automated" part is what separates it from a manual process. The system compares live metrics (errors, latency, business signals) against a threshold; if the new version misbehaves, it halts or rolls back without a human watching every step.

The classic mistakes:

- Manual gates that become rubber stamps. If a human clicks "continue" without looking, you've added a delay and no safety. Automate the decision or make the gate meaningful.
- No defined success metric. "Looks fine" isn't a check. Decide in advance which signals matter and what threshold fails.
- One metric, wrong metric. Watching only CPU while users see errors. Use user-facing signals — error rate and latency, ideally tied to an [SLO](/t/slo).
- Too many small steps, too slowly. Watching 1% for a week makes the rollout itself a bottleneck. Balance caution against time-to-value.
- Ignoring data and schema. A gradual code rollout still shares one database, so changes must be backward-compatible (see [schema and code deploys](/t/schema-and-code-deploys)).

**When not to use it:** for a low-risk change in a small system, a normal deploy is fine. Progressive delivery earns its complexity when a bad release is expensive — high traffic, money paths, or many users — where catching a problem at 1% is far cheaper than at 100%. It's a core practice behind fast, safe [deployment frequency](/t/deployment-frequency).
