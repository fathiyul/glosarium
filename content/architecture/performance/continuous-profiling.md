---
title: "Continuous Profiling"
summary: "Profiling live services to find hot paths."
levels: { backend: senior, data-engineer: senior }
aliases: ["continuous profiling", "always-on profiling", "production profiling"]
prereqs: ["observability", "performance"]
related: ["flame-graph", "performance", "benchmarking"]
---
**Continuous profiling** samples production workloads always-on: CPU, memory, locks and I/O attributed to code paths continuously, not just during incidents. Where metrics show *what's* slow and traces show *where time goes across services*, profiles show *which lines burn* — the function-level truth that ends optimisation debates.

```text
metrics:  p99 up 200ms (what)
traces:   in checkout → pricing service (where)
profiles: pricing.calculate() 73% (which lines)
```

Low-overhead sampling (1-2%) makes always-on feasible; aggregation over time reveals regressions, waste and drift that spot-checks miss. Profiles attach to deploys (which release slowed us?), endpoints and even cost centres.

The classic mistakes:

- Profiling only in crisis. Incident-driven profiles capture atypical states under pressure; continuous baselines distinguish real regressions from noise.
- Sampling too hot. High-frequency profiling perturbs the measured system (observer effect with teeth). Low-rate always-on plus burst deep-dives on demand.
- Unsymbolised stacks. Raw addresses without debug symbols produce beautiful meaningless flames. Ship symbols (or map offline); verify attribution before trusting.
- Ignoring off-CPU. CPU profiles miss I/O waits, lock contention and sleeps — often the actual bottleneck. Profile wall-clock, lock and I/O dimensions too.
- PII in profiles. Stack frames capturing query strings, payloads and user data leak into profiling backends. Scrub arguments; sample frames, not data.
- No deploy correlation. Profiles drifting without release markers can't attribute change. Tag every sample with version, config and experiment flags.
- Data without action. Profile dashboards nobody reviews are observability theatre. Alert on regression, review top offenders on cadence, budget hot paths.

**How to adopt:** always-on low-overhead sampling, symbols shipped, profiles correlated with deploys, regressions alerted. Guessing ends where continuous profiles begin.
