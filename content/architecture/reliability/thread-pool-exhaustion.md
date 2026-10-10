---
title: "Thread Pool Exhaustion"
summary: "All workers stuck waiting on something slow, so nothing else gets served."
levels: { backend: senior, data-engineer: senior }
aliases: ["thread pool exhaustion", "pool exhaustion", "worker starvation"]
prereqs: ["thread-pool", "bulkhead"]
related: ["thread-pool", "bulkhead", "backpressure"]
---
**Thread pool exhaustion** is the quiet killer: all workers busy (waiting on slow dependencies, deadlocked, or leaked), new work queues unboundedly, and the service stops responding while looking alive — CPU idle, threads all parked, latency infinite. Every fixed-size pool fails this way without bounds, timeouts and isolation.

```text
pool(50) + dependency stall → 50 threads waiting → queue grows → nothing serves
```

Prevention is structural: timeouts on every wait (threads never park forever), bulkheads per dependency (one stall can't take all threads), bounded queues with fast rejection (fail loudly, not silently), and async designs where waiting doesn't consume workers.

The classic mistakes:

- Unbounded queues. "Accept everything, process eventually" converts overload into memory exhaustion plus infinite latency. Bound queues; reject fast past the bound.
- No timeouts on pool work. Threads waiting indefinitely on hung calls never return. Every blocking call gets a timeout shorter than the caller's patience.
- Shared pools across dependencies. One slow downstream parks every thread; bulkheads contain the damage to its compartment.
- Leaked threads. Started-but-never-returned workers (missing finally blocks, forgotten futures) drain pools slowly until sudden collapse. Audit pool utilisation trends, not just current.
- Synchronous waits in async systems. Blocking event-loop threads on I/O stalls everything multiplexed onto them. Never block loops; offload blocking work to bounded worker pools.
- Pool sizing by hope. Defaults (or core-count rules of thumb) mismatched to workload (I/O-bound needs more threads than CPU-bound). Size from measured concurrency and latency targets.
- Missing saturation metrics. Queue depth, wait time and rejection rate predict exhaustion minutes early — unmonitored, the first symptom is the outage.

**The defence:** bounded everything (pools, queues, waits), timeouts everywhere, bulkheads per dependency, saturation metrics alarmed. Exhaustion is a design choice made by omission — choose explicitly instead.
