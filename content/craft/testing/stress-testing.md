---
title: "Stress Testing"
summary: "Pushing beyond capacity to find the breaking point."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["stress testing", "stress test", "load to failure"]
prereqs: ["load-testing", "capacity-planning"]
related: ["soak-test", "performance-testing", "backpressure", "circuit-breaker"]
---

A **stress test** pushes a system **past its expected capacity**, to find where it breaks and how. A normal [load test](/t/load-testing) asks "does it meet the target under expected load?"; a stress test asks "what happens at 2×, 5×, 10× — and does it fail safely?" Finding the breaking point is the goal, not avoiding it.

What you learn:

- Where the limit is — the throughput or concurrency at which latency spikes or errors begin.
- How it fails — does it degrade gracefully, rejecting excess work ([backpressure](/t/backpressure), load shedding), or collapse entirely? A good system sheds load; a bad one falls over and stays down.
- Whether it recovers — when the load subsides, does it return to normal, or is it left wedged (threads stuck, a queue still full, a [circuit breaker](/t/circuit-breaker) not resetting)?

```text
ramp: 1× → 2× → 4× → 8× expected load
watch: latency, error rate, queue depth, CPU/memory, recovery after
```

The classic mistakes:

- Stopping at "it broke". The interesting information is *how* it broke and whether it recovered. A system that rejects excess load cleanly is very different from one that takes itself down.
- No recovery check. Let the load fall away and watch. Many systems fail once and never come back without a restart — a worse outcome than the original overload.
- Confusing it with a load test. Testing at expected load is a load test; testing beyond is a stress test. Both matter, for different questions.
- Running it against production. Deliberately overloading a live system is almost always wrong. Use an isolated environment sized like production.
- Only testing the happy path. Stress the parts that fail first: the database connection pool, a shared queue, the one synchronous dependency.

Stress testing is how you learn the shape of failure before you meet it at 3am. Knowing that your system sheds load at 3× and recovers in 30 seconds is far better than discovering it can't recover at all. Pair it with [capacity planning](/t/capacity-planning) (where you want the limit to be) and [soak testing](/t/soak-test) (whether it stays healthy over time).
