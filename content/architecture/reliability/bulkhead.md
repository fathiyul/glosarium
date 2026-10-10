---
title: "Bulkhead"
summary: "Isolating resources so one failure doesn't sink everything."
levels: { backend: senior, data-engineer: senior }
aliases: ["bulkhead", "bulkhead pattern", "failure isolation"]
prereqs: ["dependency-failure", "thread-pool-exhaustion"]
related: ["dependency-failure", "load-shedding", "circuit-breaker"]
---
The **bulkhead** pattern isolates failures the way ship compartments isolate flooding: separate thread pools, connection pools and queues per dependency, so one slow downstream exhausts only its own compartment while the rest sail on. Without bulkheads, one bad dependency consumes every shared worker and sinks the ship.

```text
shared pool:   slow DB eats all 100 threads → everything queues → outage
bulkheads:     DB pool (20) saturates → DB calls fail fast; rest unaffected
```

Bulkheads pair with timeouts (bound each call), circuit breakers (stop calling the dead), and load shedding (drop excess deliberately) — compartmentalise, then fail fast, then shed.

The classic mistakes:

- One pool for everything. The default configuration and the default outage: shared executors let any dependency starve all others. Partition by dependency from the start.
- Bulkheads without timeouts. Isolated pools with unbounded waits still exhaust — just separately. Bound every call; isolation plus timeouts, never alone.
- Static sizing forever. Fixed pool sizes that fit launch traffic strangle growth or waste capacity. Size from measured concurrency; revisit with load changes.
- Ignoring queueing inside compartments. A saturated bulkhead queueing indefinitely just moves the pile-up inside. Bound queues; reject fast past the bound.
- No bulkhead metrics. Per-compartment saturation invisible means failures surprise. Monitor each pool's utilisation and rejections independently.
- Over-partitioning. Dozens of tiny pools fragment capacity (each underutilised, all inflexible). Partition by failure domain and criticality, not per endpoint.
- Bulkheads as the only defence. Isolation contains; breakers and shedding respond. Compartments without fast-failure still fill and stall — layer all three.

**How to apply it:** pool per dependency (threads, connections, queues), timeouts on everything, saturation visible per compartment. Failures stay in their compartment — by construction, not luck.
