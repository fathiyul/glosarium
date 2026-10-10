---
title: "Load Testing"
summary: "Measuring behavior under expected traffic."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level }
aliases: ["load test", "capacity testing"]
prereqs: ["performance-testing"]
related: ["performance-testing", "latency", "throughput", "profiler"]
also: [performance]
---

Load testing sends a system the amount of traffic you expect in normal use, and measures how it responds. The question it answers is whether the service stays within its latency and error targets at the load you plan for. The usual output is latency percentiles and error rates at a given request rate.

A load test needs a realistic scenario. It replays the mix of requests real users make, at the rate they make them, rather than hammering one endpoint as fast as possible. Tools such as k6, Locust and JMeter are common, and they all work from a script that describes the user journey.

```
Scenario: 200 requests per second, 70% reads, 30% writes, for 15 minutes
Check:    p95 latency under the target, error rate under the target
```

The trade-off is realism against cost. A load test on a production-like environment is more informative, but it needs matching hardware, realistic data and time to set up. Running against a small environment and scaling the numbers up is cheaper, but the results can mislead, because bottlenecks often sit in places that don't scale linearly.

The classic mistake is testing with empty tables and a warm cache, then being surprised in production. Use data of realistic size, and run long enough for caches and connection pools to reach steady state. Look at which part of the system saturates first, using a [profiler](/t/profiler) or your metrics, rather than only the overall number. For traffic beyond normal load, see [performance testing](/t/performance-testing).
