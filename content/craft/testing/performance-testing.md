---
title: "Performance Testing"
summary: "Measuring speed and resource use; load, stress, soak and spike tests."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["performance test", "perf testing"]
prereqs: ["latency"]
related: ["load-testing", "latency", "throughput", "profiler", "memory-leak"]
also: [performance]
---

Performance testing measures how fast a system is and how much it uses, under defined conditions. It's the umbrella term for several kinds of test, each asking a different question about the system.

- **Load tests** check behaviour at expected traffic. See [load testing](/t/load-testing).
- **Stress tests** push beyond expected traffic to find the point where the system breaks, and how it recovers.
- **Soak tests** run at normal load for a long time, to reveal slow problems such as a [memory leak](/t/memory-leak) or a connection pool that runs dry.
- **Spike tests** apply a sudden burst of traffic, to see whether the system copes with a sharp change.

```
Load:   200 req/s for 15 min         -> latency at normal use
Stress: ramp from 200 to 2000 req/s  -> where errors start
Soak:   200 req/s for 12 hours       -> does memory keep growing?
Spike:  200 -> 2000 -> 200 req/s     -> recovery after a burst
```

The trade-off is cost against coverage. Each kind of test takes time to design, run and interpret, and results depend heavily on the environment. A test on an environment that doesn't match production can rank changes in the wrong order.

The classic mistake is running one kind of test and calling the system tested. A system can pass a short load test and fail after a day of soak. Decide which question matters for your service, run that test on a realistic setup, and compare results against a baseline so regressions are visible. Use a [profiler](/t/profiler) to find where the time goes once a test shows a problem.
