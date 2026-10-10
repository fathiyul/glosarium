---
title: "DORA Metrics"
summary: "Four delivery metrics: deploy frequency, lead time, change failure rate and recovery time."
levels: { backend: staff, frontend: staff, data-engineer: staff }
aliases: ["DORA metrics", "four keys", "DevOps metrics"]
prereqs: ["deployment-frequency", "ci-pipeline"]
related: ["mttr", "continuous-delivery", "rollback", "incident-response", "trunk-based-development"]
---

**DORA metrics** are four measures of software delivery, from the research programme of the same name: how fast a team ships and how reliably. They come as a set because speed and stability are not opposites — the best teams move fast *and* break less.

The four keys:

- Deployment frequency — how often you deploy to production (see [deployment frequency](/t/deployment-frequency)).
- Lead time for changes — how long from code committed to running in production.
- Change failure rate — the share of deploys that cause a problem needing a fix or rollback.
- Time to restore — how long to recover when a deploy or incident does cause harm (related to [MTTR](/t/mttr)).

```text
throughput:  deployment frequency, lead time
stability:   change failure rate, time to restore
```

Read together, they reveal trade-offs. A team with high frequency but a high failure rate is moving fast and dangerously; a team with a low failure rate but months-long lead time is safe but slow. Improving one at the cost of another usually means the underlying process, not the metric, needs work.

The classic mistakes:

- Quoting performance bands. "Elite teams deploy X times a day" is a research framing, not a target; don't chase a number. Use your own trend as the signal.
- Gaming the metric. Renaming a "deploy" to look more frequent, or closing incidents early to shrink restore time, corrupts the signal. Measure honestly or not at all.
- Ranking people or teams. These are system metrics. Used for individual performance review, they get gamed and destroy trust.
- Chasing all four blindly. Context matters — a safety-critical system may deliberately accept a lower frequency. Use the metrics to find bottlenecks, not to prescribe a pace.

**How to use them:** track your own trend over time, and when a number stalls, investigate why — usually lead time points at review or testing, failure rate at testing or rollout safety (see [progressive delivery](/t/progressive-delivery)), and restore time at [rollback](/t/rollback) or [incident response](/t/incident-response). They're a diagnostic, not a scorecard.
