---
title: "Bottleneck"
summary: "The component that limits overall throughput."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["bottleneck", "performance bottleneck", "constraint"]
prereqs: ["performance", "observability"]
related: ["performance", "amdahls-law", "continuous-profiling"]
---
A **bottleneck** is the single constraint limiting throughput: the slowest stage in a pipeline, the saturated resource, the serial section Amdahl warned about. Systems improve only by widening the bottleneck — optimising anything else changes nothing measurable (the theory of constraints applied to latency and throughput).

```text
frontend 10ms → API 20ms → DB 400ms → render 30ms  (the DB is the bottleneck)
halve anything but the DB → total unchanged
```

Finding it means measuring end-to-end, then drilling down (traces, profiles, queue depths, utilisation) until one resource or stage accounts for the gap. Fixing it moves the bottleneck elsewhere — performance work is serial bottleneck removal until good enough.

The classic mistakes:

- Optimising the familiar. Tuning application code while the database (or network, or lock) dominates wastes effort measurably. Profile first; the bottleneck is usually elsewhere.
- Average utilisation blindness. Averages hide saturation (a lock at 100% for milliseconds counts little in averages, everything in latency). Measure contention and queueing, not just utilisation.
- Ignoring serial sections. Amdahl's law caps parallel speedup by the serial fraction; parallelising around an inherently serial bottleneck disappoints mathematically.
- Moving bottlenecks unknowingly. Fixes shift constraints (DB fixed → network saturates); each round needs re-measurement. Performance is iterative, not one-shot.
- Hardware answers to software problems. Bigger machines on lock-contended or N+1 workloads waste money proportionally. Fix the shape; scale the fixed shape.
- Bottleneck theatre. Declaring bottlenecks from intuition ("it's always DNS/database") without data. Measure, then declare.
- Local optima. Each service tuned independently while cross-service chatter dominates end-to-end. Optimise the critical path across boundaries, not per component.

**The method:** measure end-to-end, find the constraint, widen it, re-measure. One bottleneck at a time, data first — everything else is procrastination with profilers.
