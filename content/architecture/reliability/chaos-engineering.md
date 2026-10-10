---
title: "Chaos Engineering"
summary: "Injecting failures on purpose to find weaknesses."
levels: { backend: staff, data-engineer: staff }
aliases: ["chaos engineering", "chaos testing", "fault injection"]
prereqs: ["fault-tolerance", "observability"]
related: ["fault-tolerance", "game-day", "reliability"]
---
**Chaos engineering** validates resilience by injecting failure deliberately: kill instances, partition networks, exhaust resources, slow dependencies — in controlled blasts with hypotheses ("checkout survives one AZ loss with <1% error uplift") and automatic halt conditions. It finds the missing timeouts, unfenced failovers and untested fallbacks before users do.

```text
hypothesise → blast (scoped, monitored) → observe → fix gaps → automate steadily
```

Maturity climbs gradually: dev-environment fault tests, staging game days, production experiments starting tiny (one instance, off-peak) with abort buttons — never "chaos monkey in prod on day one." The steady state is continuous, automated resilience verification, not occasional drama.

The classic mistakes:

- Production chaos first. Unbounded production fault injection without mature observability and halt conditions causes the outage it pretends to prevent. Climb the maturity ladder in order.
- No hypothesis. Randomly breaking things teaches little; hypothesis-driven experiments (with expected vs actual) produce fixes. "What should survive this?" asked upfront.
- Missing abort conditions. Blasts without automatic halt on customer impact convert experiments into incidents. Define stop conditions; enforce automatically.
- Testing components, not paths. Killing one pod proves orchestration restarts pods — known already. Partition networks, poison DNS, expire certs: test the surprising failures.
- Findings without fixes. Chaos reports filed and ignored normalise known fragility. Track chaos findings like production bugs, with owners and deadlines.
- Blame culture. Engineers hiding fragility when experiments feel punitive defeats the purpose. Blameless, fix-the-system framing — always.
- One-off theatre. Annual game days impress while daily deploys erode the validated state. Automate steady-state verification into the pipeline.

**How to adopt:** hypothesis-driven, scoped small, halt conditions automatic, findings tracked, maturity climbed gradually. Chaos doesn't create resilience — it reveals its absence, on your schedule instead of the incident's.
