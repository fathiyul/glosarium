---
title: "Benchmarking"
summary: "Measuring performance under controlled conditions."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["benchmarking", "benchmarks", "performance testing"]
prereqs: ["performance", "observability"]
related: ["performance", "load-testing", "continuous-profiling"]
---
**Benchmarking** measures performance under controlled conditions: microbenchmarks (function-level timing), component benchmarks (query, endpoint, serialiser), and system benchmarks (standard workloads like TPC, SPEC, or production replays). Good benchmarks answer specific questions ("did this change help? which design is faster?") with reproducible numbers.

```text
hypothesis → isolated workload → warm up → measure (percentiles, not means)
→ compare against baseline → decide
```

Benchmark value comes from representativeness (production-shaped data and concurrency, not toy inputs) and rigour (warmups, repetitions, statistical comparison) — without both, benchmarks mislead more precisely than guessing.

The classic mistakes:

- Toy workloads. Benchmarking empty tables and single-threaded loops predicts nothing about production. Production-shaped data, concurrency and deployment topology — or don't bother.
- Mean-watching. Means hide tails; optimising means while p99 rots misses user experience. Percentiles (p50/p95/p99) always.
- No baseline. Numbers without before/after (or without a control) can't attribute change. Baseline every run; compare statistically, not anecdotally.
- Benchmarking the wrong layer. Micro-optimising serialisation while the database dominates wastes the optimisation budget. Profile production first; benchmark the bottleneck.
- Compiler-friendly dead code. Microbenchmarks whose results go unused get optimised away (or cached) — measuring nothing at full speed. Consume results (checksums, blackholes).
- One-shot numbers. Single runs capture noise; proper benchmarking repeats, warms up, and reports variance. A 5% "win" inside ±10% noise is nothing.
- Vendor benchmarks as decisions. Published numbers optimise for the vendor's strengths on their hardware with their tuning. Reproduce on your workload or treat as marketing.

**The discipline:** production-shaped workloads, percentile reporting, baselined comparisons, bottleneck-first focus. Benchmarks inform decisions — design them to decide, not to impress.
