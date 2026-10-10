---
title: "Performance"
summary: "How fast and efficiently a system does its work."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["performance", "system performance", "performance engineering"]
prereqs: ["observability", "benchmarking"]
related: ["performance-budget", "continuous-profiling", "bottleneck"]
---
**Performance** is delivering results within time budgets under load: latency users feel, throughput systems sustain, efficiency resources allow. Engineering it means budgeting (targets per path), measuring (production telemetry, not just labs), finding constraints (bottlenecks, profiles), and spending optimisation where it moves user experience.

```text
budget (p99 checkout < 2s) → measure (RUM + traces) → constrain (DB 80%)
→ fix → verify → guard (budgets in CI)
```

Performance compounds across layers — network, protocol, application, data, rendering — so the practice is holistic: no layer gets a pass, and local optima (fast queries, slow pages) lose to end-to-end thinking.

The classic mistakes:

- No budgets. "Fast" without numbers can't guide trade-offs or block regressions. Budget per critical path (percentiles, devices, networks).
- Lab-only measurement. Staging numbers diverge from production reality (data volume, concurrency, geography). RUM and production traces decide; labs diagnose.
- Premature optimisation. Tuning before measuring wastes effort on non-bottlenecks. Profile production first; optimise the constraint.
- One-sided optimisation. Backend tuned while payloads balloon, or frontend polished over 2s TTFB. End-to-end budgets force whole-path thinking.
- Optimisation without guardrails. Gains erode within quarters without CI budgets and regression alerts. Guard every win automatically.
- Heroics over habits. Occasional performance sprints followed by neglect oscillate. Continuous profiling, budgets and reviews sustain.
- Throughput-latency confusion. Optimising requests-per-second while users wait seconds (or vice versa) misses the actual objective. Optimise what users feel, provision what systems need.

**How to practise it:** budget per path, measure in production, fix constraints iteratively, guard with automation. Performance is a feature with a maintenance cost — budget both.
