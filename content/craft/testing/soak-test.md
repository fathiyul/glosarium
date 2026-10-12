---
title: "Soak Test"
summary: "Running under load for hours to find leaks and slow degradation."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["soak test", "endurance test", "long-running load test"]
prereqs: ["load-testing", "memory-leak"]
related: ["stress-testing", "performance-testing", "observability", "monitoring"]
---

A **soak test** (or endurance test) runs a system under a realistic load for a long time — hours or days — to find problems that only appear with sustained use. Short tests catch throughput and obvious errors; soak tests catch the slow stuff: memory that creeps up, connections that leak, logs that fill the disk, latency that drifts, sessions or caches that grow without bound.

```text
load test:   run for 5 minutes → "is it fast enough?"
soak test:   run for 24 hours  → "does it stay healthy?"
```

The typical finds are **leaks and resources that never get released**: a [memory leak](/t/memory-leak) that OOM-kills the process overnight, file descriptors or database connections exhausted after thousands of cycles, an ever-growing in-memory cache or session store, temp files left behind, disk filling with logs.

The classic mistakes:

- Testing with unrealistic duration. A leak of a few kilobytes per request is invisible in a ten-minute test and fatal after a day. Only a long run reveals the slope.
- Not measuring the trend. The point isn't a single number but the *shape over time*: is memory flat, or climbing? Watch the slope, not the snapshot (see [observability](/t/observability), [monitoring](/t/monitoring)).
- One load level only. A steady load can miss degradation that appears when the load oscillates or ramps. Combine with a [stress test](/t/stress-testing) that probes the limit.
- Running it in production. A soak test on a live system can degrade real users. Run it on staging or an isolated environment with production-like data volumes.
- Ignoring the recovery check. After the soak, does the system return to a clean baseline, or is it left degraded? That's often the real finding.

Soak tests are the tool for "it works fine for a while, then gets sick". If you run long-lived services, they're how you earn confidence that the system won't slowly rot under constant load — and the fix for what they find is usually to bound and release every resource you open.
