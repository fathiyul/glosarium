---
title: "Site Reliability Engineering"
summary: "Applying software engineering to operations."
levels: { backend: senior, data-engineer: senior }
aliases: ["SRE", "site reliability engineering", "reliability engineering"]
prereqs: ["monitoring", "incident-response"]
related: ["slo", "sli", "error-budget", "toil", "blameless-postmortem", "runbook-automation"]
---

**Site Reliability Engineering (SRE)** is the practice of running systems by applying software engineering to operations. Instead of treating operations as manual work, an SRE team builds automation, measurement and tooling, and is accountable for reliability in concrete terms. The term comes from Google's practice, but the ideas are general and widely adopted.

Its defining ideas:

- SLOs and error budgets. You define measurable targets for reliability (see [SLO](/t/slo), [SLI](/t/sli)) and an **error budget** — how much unreliability is acceptable. That budget balances shipping features against stability: if you're within budget, ship; if you're burning it too fast, slow down and fix.
- Reduce toil. Manual, repetitive operational work ([toil](/t/toil)) is capped and automated away over time, so engineers can build instead of babysit.
- Blameless culture. Failures are treated as system problems, not people problems (see [blameless postmortems](/t/blameless-postmortem)).
- Automate operations. [Runbook automation](/t/runbook-automation), self-healing and infrastructure as code replace manual steps.

The classic mistakes:

- Copying the label without the practice. Renaming an ops team "SRE" and changing nothing else. The substance is the error budget, the toil budget and the engineering approach, not the name.
- An error budget with no teeth. If the budget is never allowed to change behaviour — freezing risky launches when it's exhausted — it's decoration. The point is to make the reliability/speed trade-off explicit.
- Hero culture. Rewarding the person who fixes every outage at 3am incentivises manual heroics over the automation that prevents them.
- Reliability as an absolute. Chasing 100% is ruinously expensive. SRE deliberately targets "reliable enough", defined by users' needs.

**When it applies:** any team that runs production systems, not only those with an "SRE" title. The mindset — measure reliability, bound toil, learn from incidents — improves operations whether you adopt the full model or just the parts that fit. It pairs tightly with [incident response](/t/incident-response) and [observability](/t/observability).
